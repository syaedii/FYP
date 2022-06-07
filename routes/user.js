const bcrypt = require("bcrypt");
const saltRounds = 10;
const currentYear = new Date().getFullYear();
const month30 = ["04", "06", "09", "11"]; // 30일까지의 월
const minYear = 1500;

const fn = require("../lib/other"); // 정의된 함수들 가져오기

/* ------------------------------ signup 처리 호출 ------------------------------ */
exports.signup = function(req, res) {
  var message = "";
  var pw = req.body.password;
  var pw_c = req.body.password_confirm;
  var inputYear = req.body.yy;
  var inputMonth = req.body.mm;
  var inputDate = req.body.dd;
  var regUserids = [];

  db.query('SELECT ?? FROM ??', ['user_id', 'user'], function(err, results, fields) {
    results.forEach(function(user) {
      regUserids.push(user.user_id);
    });

    if (req.method == "POST") { // 요청이 POST일 때만 처리
      // 최대 해당 월의 일 설정
      if (month30.includes(inputMonth))
        maxDate = 30;
      else if (inputMonth == 2 )
        maxDate = 29;
      else
        maxDate = 31;

      // 회원가입 처리
      if (regUserids.includes(req.body.userid)) { // 아이디 중복 체크
        message = "아이디가 이미 존재되어 있습니다!";
        res.render('signup.ejs', { message: message, statusCode: 400, sess: req.session, regUserids: regUserids });
      } else if (inputYear <= minYear || inputYear > currentYear || inputMonth == "" || inputDate <= 0 || inputDate > maxDate) { // 생년월일 체크
        message = "생년월일을 제대로 입력하세요!";
        res.render('signup.ejs', { message: message, statusCode: 400, sess: req.session, regUserids: regUserids });
      } else if (pw != pw_c) { // 비밀번호 확인
        message = "비밀번호가 일치하지 않습니다.";
        res.render('signup.ejs', { message: message, statusCode: 400, sess: req.session, regUserids: regUserids });
      } else { // DB에 회원정보 저장
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          var post = {
            name: req.body.name,
            user_id: req.body.user_id,
            password: hash,
            gender: req.body.gender,
            birth: req.body.yy + "-" + req.body.mm + "-" + req.body.dd,
            email: req.body.email,
            phone: req.body.phone,
            institution: req.body.institution,
            ref_id: req.body.ref_id,
            type: req.body.type
          }

          var query = db.query('INSERT INTO user SET ?', post, function(error, results, fields) {
            if (error) throw error;
            message = "회원가입이 완료되었습니다.";
            res.render('signup.ejs', { message: message, statusCode: 200, sess: req.session, regUserids: [] });
          });
        });
      }
    } else { // 요청이 POST가 아닐떄 회원가입 페이지 보내기
      res.render('signup.ejs', {
        message: message,
        statusCode: 100,
        sess: req.session,
        regUserids: regUserids
      });
    }

    /* Status Code:
     * 1xx informational response – the request was received, continuing process (정상 반응)
     * 2xx successful – the request was successfully received, understood, and accepted (성공적으로 됐을 때)
     * 3xx redirection – further action needs to be taken in order to complete the request (계속 해야 할 때)
     * 4xx client error – the request contains bad syntax or cannot be fulfilled (사용자가 잘못했을 때)
     * 5xx server error – the server failed to fulfill an apparently valid request (서버로부터 오류 띄웠을 때)
     */
  });
};

/* ------------------------------ login 처리 호출 ------------------------------ */
exports.login = function(req, res) {
  var message = "";
  const user_id = req.body.user_id;
  const password = req.body.password;

  if (req.method == "POST") {
    db.query('SELECT ?? FROM ?? WHERE user_id = ?;', [['user_id', 'password', 'type'], 'user', user_id], function(err, results, fields) {
      if (err) throw err;
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function(err, result) {
          if (result === true) {
            req.session.loggedin = true;
            req.session.user_id = results[0].user_id;
            req.session.user_type = results[0].type;
            let redirectUrl = req.session.redirectUrl || '/generate-code';
            res.redirect(redirectUrl);
          } else {
            message = "잘못된 아이디 또는 비밀번호!";
            res.render('login.ejs', { message: message, sess: req.session, statusCode: 400 });
          }
        });
      } else {
        message = "잘못된 아이디 또는 비밀번호!";
        res.render('login.ejs', { message: message, sess: req.session, statusCode: 400 });
      }
    });

  } else {
    res.render('login.ejs', {
      message: message,
      sess: req.session,
      statusCode: 100
    });
  }

};

/* ------------------------------ logout 처리 호출 ------------------------------ */
exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/login");
  })
};

/* ------------------------------ profile 처리 호출 ------------------------------ */
exports.profile = function(req,res) {
  const user_id = req.session.user_id;
  var message = req.session.message || "";

  if (user_id) {
    db.query('SELECT * FROM ?? WHERE user_id = ?', ['user', user_id], function(err, results, fields) {
      res.render('profile.ejs', {
        user_id: user_id,
        data: results,
        sess: req.session,
        message: message
      });
    });
  } else {
    res.redirect("/login")
  }
}

/* ------------------------------ profile 정보수정 처리 ------------------------------ */
exports.saveChanges = function(req, res) {
  var user_id = req.session.user_id;
  var pw = req.body.password;
  var new_pw = req.body.new_password;
  var new_pw_c = req.body.new_password_confirm;
  var inputYear = req.body.yy;
  var inputMonth = req.body.mm;
  var inputDate = req.body.dd;

  if (req.method == "POST") {
    // 최대 해당 월의 일 설정
    if (month30.includes(inputMonth))
      maxDate = 30;
    else if (inputMonth == 2 )
      maxDate = 29;
    else
      maxDate = 31;

    db.query('SELECT ?? FROM ?? WHERE user_id = ?', [['password'], 'user', user_id], function(err, results, fields) {
      if (err) throw err;
      bcrypt.compare(pw, results[0].password, function(err, result) {
        if (result !== true || new_pw !== new_pw_c) {
          req.session.statusCode = 400;
          req.session.message = "비밀번호가 일치하지 않습니다."
          res.redirect("/profile");
        } else

        if (inputYear <= minYear || inputYear > currentYear || inputMonth == "" || inputDate <= 0 || inputDate > maxDate) {
          req.session.statusCode = 400;
          req.session.message = "생년월일을 제대로 입력하세요!"
          res.redirect("/profile");
        } else {
          console.log(new_pw)
          if (new_pw) {
            bcrypt.hash(new_pw, saltRounds, function(err, hash) {
              console.log(hash)
              var post = {
                name: req.body.name,
                password: hash,
                gender: req.body.gender,
                birth: req.body.yy + "-" + req.body.mm + "-" + req.body.dd,
                email: req.body.email,
                phone: req.body.phone,
                institution: req.body.institution,
                ref_id: req.body.ref_id
              }

              db.query('UPDATE user SET name = ?, password = ?, gender = ?, birth = ?, email = ?, phone = ?, institution = ?, ref_id = ? WHERE user_id = ?',
                [post.name, post.password, post.gender, post.birth, post.email, post.phone, post.institution, post.ref_id, user_id], function (error, results, fields) {
                if (error) throw error;
                console.log(results)
                req.session.statusCode = 200;
                req.session.message = "변경이 저장되었습니다.";
                res.redirect("/profile");
              });
            });
          } else {
            var post = {
              name: req.body.name,
              gender: req.body.gender,
              birth: inputYear + "-" + inputMonth + "-" + inputDate,
              email: req.body.email,
              phone: req.body.phone,
              institution: req.body.institution,
              ref_id: req.body.ref_id
            }

            db.query('UPDATE user SET name = ?, gender = ?, birth = ?, email = ?, phone = ?, institution = ?, ref_id = ? WHERE user_id = ?', [post.name, post.gender, post.birth, post.email, post.phone, post.institution, post.ref_id, user_id], function (error, results, fields) {
              if (error) throw error;
              req.session.statusCode = 200;
              req.session.message = "변경이 저장되었습니다.";
              res.redirect("/profile");
            });
          }
        }
      });
    });
  }
};

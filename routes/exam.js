/* --------------------------- enter exam 처리 호출 --------------------------- */
exports.enterRoom = function(req, res) {
  req.session.pageName = "home";
  const entry_code = req.params.entryCode;
  const user_id = req.session.user_id
  if (user_id) {
    db.query('SELECT ?? FROM ?? WHERE entry_code = ?; SELECT ?? FROM ?? WHERE user_id = ?',
      [['entry_code'], 'session', entry_code, ['name', 'ref_id'], 'user', user_id], function(err, results, fields) {
        if (err) {
          console.log("An error at enterRoom.")
          throw err;
        }
        if (results[0].length == 1) {
          res.render("room.ejs", {
            entry_code: req.params.entry_code,
            sess: req.session,
            name: results[1][0].name,
            ref_id: results[1][0].ref_id
          });
        } else {
          req.session.message = "시험 세션이 존재하지 않습니다.";
          res.redirect("/home");
        }
    });
  } else {
    res.redirect("/login")
  }
};

exports.createSession = function(req, res) {
  req.session.pageName = "home";
  var message = "";

  db.query('SELECT ?? FROM ?? WHERE entry_code = ?;', ['entry_code', 'session', req.body.entry_code], function(err, results, fields) {
      if (err) throw err;
      if (results.length != 0) {
        req.session.message = "다시 시도해 보십시오."
        redirect("/home");
        req.session.message = ""
      } else {
        var post = {
          exam_date: req.body.date,
          start_time: req.body.start_time,
          end_time: req.body.end_time,
          duration: req.body.duration,
          subject: req.body.subject,
          entry_code: req.body.entry_code,
          host_id: req.session.user_id
        }

        var query = db.query('INSERT INTO session SET ?', post, function(error, results, fields) {
          if (error) throw error;
          res.redirect('/exam-room/' + post.entry_code);
        });
      }
  });
}



// -------------------------------------- //

exports.enter_instructor = function(req, res) {
  const user_id = req.session.user_id;

  res.render('enter-session-instructor.ejs', {
    user_id: user_id,
    sess: req.session
  });
};

exports.enter_student = function(req, res) {
  const user_id = req.session.user_id;

  res.render('enter-session-student.ejs', {
    user_id: user_id,
    sess: req.session
  });
};

exports.in_session_instructor = function(req, res) {
  const user_id = req.session.user_id;

  res.render('exam-instructor.ejs', {
    user_id: user_id,
    sess: req.session
  });
};

exports.in_session_student = function(req, res) {
  const user_id = req.session.user_id;

  res.render('exam-student.ejs', {
    user_id: user_id,
    sess: req.session
  });
};

exports.signup = function(req, res) {
  const user_id = req.session.user_id;

  res.render('signup-acc.ejs', {
    user_id: user_id,
    sess: req.session
  });
};

exports.login = function(req, res) {
  const user_id = req.session.user_id;

  res.render('login-acc.ejs', {
    user_id: user_id,
    sess: req.session
  });
};

exports.myacc = function(req, res) {
  const user_id = req.session.user_id;

  res.render('my-acc.ejs', {
    user_id: user_id,
    sess: req.session
  });
};

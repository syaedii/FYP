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

exports.main = function(req, res) {
  if (req.session.user_id) {
    res.render('home.ejs', {
      sess: req.session
    });
  } else {
    res.redirect("/login")
  }
};

exports.main = function(req, res) {
  if (req.session.pageName != "home")
    req.session.message = null;

  if (req.session.user_id) {
    res.render('home.ejs', {
      sess: req.session
    });
  } else {
    res.redirect("/login")
  }
};

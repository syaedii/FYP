exports.main = function(req, res) {
  res.render("room", {
    roomId: req.params.room
  });
};

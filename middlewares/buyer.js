module.exports = function(req, res, next) {
  if (req.user.role !== 'Buyer') return res.status(403).send('Access Denied');
  next();
};

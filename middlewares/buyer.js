module.exports = function(req, res, next) {
  if (req.user.role !== 'Buyer') return res.status(401).send('Access Denied');
  next();
};

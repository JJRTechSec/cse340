const requireRole = (roleName) => {
  return (req, res, next) => {
    if (!req.session.user) {
      req.flash('error', 'You must be logged in to access this page.');
      return res.redirect('/login');
    }

    if (req.session.user.role_name !== roleName) {
      req.flash('error', 'You do not have permission to access this page.');
      return res.redirect('/');
    }

    next();
  };
};

export { requireRole };
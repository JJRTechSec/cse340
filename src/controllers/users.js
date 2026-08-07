import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUsers } from '../models/users.js';
import { getVolunteerProjectsByUserId } from '../models/volunteers.js';

/**
 * Display the login form.
 */
const showLoginForm = (req, res) => {
  const title = 'Login';

  res.render('login', { title });
};

/**
 * Process the login form.
 */
const processLoginForm = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);
    if (user) {
      // Store user info in session
      req.session.user = user;
      req.flash('success', 'Login successful!');

      if (res.locals.NODE_ENV === 'development') {
        console.log('User logged in:', user);
      }

      res.redirect('/dashboard');
    } else {
      req.flash('error', 'Invalid email or password.');
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error during login:', error);
    req.flash('error', 'An error occurred during login. Please try again.');
    res.redirect('/login');
  }
};

/**
 * Process user logout.
 */
const processLogout = async (req, res) => {
  if (req.session.user) {
    delete req.session.user;
  }

  req.flash('success', 'Logout successful!');
  res.redirect('/login');
};

/**
 * Display the user registration form.
 */
const showUserRegistrationForm = (req, res) => {
  const title = 'Register';

  res.render('register', { title });
};

/**
 * Process the user registration form.
 */
const processUserRegistrationForm = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    await createUser(name, email, passwordHash);

    req.flash('success', 'Account created successfully.');
    res.redirect('/');
  } catch (error) {
    if (error.code === '23505') {
      req.flash('error', 'An account with that email already exists.');
      return res.redirect('/register');
    }

    next(error);
  }
};

const requireLogin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    req.flash('error', 'You must be logged in to access that page.');
    return res.redirect('/login');
  }
  next();
};

/**
 * Middleware factory to require specific role for route access
 * Returns middleware that checks if user has the required role
 * 
 * @param {string} role - The role name required (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 */
const requireRole = (role) => {
  return (req, res, next) => {
    // Check if user is logged in first
    if (!req.session || !req.session.user) {
      req.flash('error', 'You must be logged in to access this page.');
      return res.redirect('/login');
    }

    // Check if user's role matches the required role
    if (req.session.user.role_name !== role) {
      req.flash('error', 'You do not have permission to access this page.');
      return res.redirect('/dashboard');
    }

    // User has required role, continue
    next();
  };
};

const showDashboard = async (req, res) => {
  const user = req.session.user;

  const volunteerProjects = await getVolunteerProjectsByUserId(
    user.user_id
  );

  volunteerProjects.forEach(project => {
    project.formattedDate = new Date(project.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });

  res.render('dashboard', { title: 'Dashboard', name: user.name, email: user.email, volunteerProjects });
};

const showUsersPage = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    const title = 'Registered Users';

    res.render('users', {
      title,
      users
    });
  } catch (error) {
    next(error);
  }
};

export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, requireRole, showDashboard, showUsersPage };
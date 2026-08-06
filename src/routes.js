import express from 'express';
import { displayHome } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm} from './controllers/organizations.js';
import { displayProjects, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { displayCategories, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, requireRole, showDashboard } from './controllers/users.js';
//import { requireRole } from './middleware/auth.js';

const router = express.Router();

// Define the routes
router.get('/', displayHome); // Home page route
router.get('/organizations', organizationsPage); // Organizations page route  
router.get('/projects', displayProjects); // Projects page route
router.get('/categories', displayCategories); // Categories page route
router.get('/category/:id', showCategoryDetailsPage); // Route for category details page
router.get('/project/:id', showProjectDetailsPage); // Route for project details page
router.get('/organization/:id', showOrganizationDetailsPage); // Route for organization details page
router.get('/register', showUserRegistrationForm); // Route for user registration form
router.get('/login', showLoginForm); // Route for login form
router.get('/logout', processLogout); // Route for user logout
router.get('/dashboard', requireLogin, showDashboard); // Route for user dashboard (requires login)

// ADMIN ROUTES
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm); // Route for new organization form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm); // Route for edit organization form
router.get('/new-project', requireRole('admin'), showNewProjectForm); // Route for new project form
router.get('/assign-categories/:id', requireRole('admin'), showAssignCategoriesForm); // Route for assigning categories to a project
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm); // Route for edit project form
router.get('/new-category', requireRole('admin'), showNewCategoryForm); // Route for new category form
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm); // Route for edit category form

// ROUTER.POST
router.post('/register', processUserRegistrationForm); // Route to handle user registration form submission
router.post('/login', processLoginForm); // Route to handle login form submission

// ADMIN POST ROUTES
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm); // Route to handle new organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm); // Route to handle edit organization form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm); // Route to handle new project form submission
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategoriesForm); // Route to handle assigning categories to a project
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm); // Route to handle edit project form submission
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm); // Route to handle new category form submission
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm); // Route to handle edit category form submission

// error handling routes
router.get('/test-error', testErrorPage); // Route to test 500 error handling


export default router;
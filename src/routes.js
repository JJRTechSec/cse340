import express from 'express';
import { displayHome } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { displayProjects, showProjectDetailsPage } from './controllers/projects.js';
import { displayCategories, showCategoryDetailsPage, } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showNewOrganizationForm, processNewOrganizationForm } from './controllers/new-organization.js';

const router = express.Router();

// Define the routes
router.get('/', displayHome); // Home page route
router.get('/organizations', organizationsPage); // Organizations page route  
router.get('/projects', displayProjects); // Projects page route
router.get('/categories', displayCategories); // Categories page route
router.get('/category/:id', showCategoryDetailsPage); // Route for category details page
router.get('/project/:id', showProjectDetailsPage()); // Route for project details page
router.get('/organization/:id', showOrganizationDetailsPage, showProjectDetailsPage());// Route for organization details page
router.get('/new-organization', showNewOrganizationForm); // Route for new organization form
router.post('/new-organization', processNewOrganizationForm); // Route to handle new organization form submission

// error handling routes
router.get('/test-error', testErrorPage); // Route to test 500 error handling


export default router;
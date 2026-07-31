import express from 'express';
import { displayHome } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm} from './controllers/organizations.js';
import { displayProjects, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';
import { displayCategories, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

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
router.get('/edit-organization/:id', showEditOrganizationForm); // Route for edit organization form
router.get('/new-project', showNewProjectForm); // Route for new project form
router.get('/assign-categories/:id', showAssignCategoriesForm); // Route for assigning categories to a project


// ROUTER.POST
router.post('/new-organization', organizationValidation, processNewOrganizationForm); // Route to handle new organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm); // Route to handle edit organization form submission
router.post('/new-project', projectValidation, processNewProjectForm); // Route to handle new project form submission
router.post('/assign-categories/:id', processAssignCategoriesForm); // Route to handle assigning categories to a project

// error handling routes
router.get('/test-error', testErrorPage); // Route to test 500 error handling


export default router;
import express from 'express';

import { displayHome } from './controllers/index.js';
import { organizationsPage } from './controllers/organizations.js';
import { displayProjects } from './controllers/projects.js';
import { displayCategories } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';

const router = express.Router();

// Define the routes
router.get('/', displayHome);
router.get('/organizations', organizationsPage);
router.get('/projects', displayProjects);
router.get('/categories', displayCategories);
// error handling routes
router.get('/test-error', testErrorPage); // Route to test 500 error handling
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

export default router;
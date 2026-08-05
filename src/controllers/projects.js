import { getAllProjects, getUpcomingProjects, getProjectDetails, createProject, updateProject } from '../models/projects.js';
import { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

const projectValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description must be at most 500 characters'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ max: 100 })
    .withMessage('Location must be at most 100 characters'),

  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid date'),

  body('organization_id')
    .notEmpty()
    .withMessage('Organization is required')
    .isInt({ min: 1 })
    .withMessage('Invalid organization ID')
];

const number_of_upcoming_projects = 5;

const displayProjects = async (req, res) => {
  const projects = await getUpcomingProjects(number_of_upcoming_projects);
  const title = 'Upcoming Service Projects';

  projects.forEach(project => {
    project.formattedDate = new Date(project.date).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });

  res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails(projectId);
  const categories = await getCategoriesByProjectId(projectId);
  const title = 'Project Details';

  projectDetails.formattedDate = new Date(
    projectDetails.date
  ).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  res.render('project', { title, projectDetails, categories });
};

const showNewProjectForm = async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = 'Add New Service Project';
  res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
  const { title, description, location, date, organization_id } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });
    return res.redirect('/new-project');
  };

  try {
    const newProjectId = await createProject(title, description, location, date, organization_id);
    req.flash('success', 'New project created successfully!');
    res.redirect(`/project/${newProjectId}`);
  } catch (error) {
    console.error('Error creating project:', error);
    req.flash('error', 'An error occurred while creating the project. Please try again.');
    res.redirect('/new-project');
  }
};

const showEditProjectForm = async (req, res) => {
  const projectId = req.params.id;

  const projectDetails = await getProjectDetails(projectId);
  const organizations = await getAllOrganizations();

  const title = 'Edit Project';

  res.render('update-project', {title, projectDetails, organizations});
};

const processEditProjectForm = async (req, res) => {
  const projectId = req.params.id;

  const {
    organization_id,
    title,
    description,
    location,
    date
  } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    return res.redirect(`/edit-project/${projectId}`);
  }

  try {
    const updatedProjectId = await updateProject(
      projectId,
      organization_id,
      title,
      description,
      location,
      date
    );

    req.flash('success', 'Project updated successfully!');
    return res.redirect(`/project/${updatedProjectId}`);
  } catch (error) {
    console.error('Error updating project:', error);

    req.flash(
      'error',
      'An error occurred while updating the project. Please try again.'
    );

    return res.redirect(`/edit-project/${projectId}`);
  }
};


export { displayProjects, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm };
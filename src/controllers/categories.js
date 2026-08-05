import { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId, updateCategoryAssignments, createCategory, updateCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be between 3 and 100 characters')
];

const displayCategories = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Service Categories';
  res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const categoryDetails = await getCategoryById(categoryId);
  const projects = await getProjectsByCategoryId(categoryId);
  const title = 'Category Details';
  res.render('category', { title, categoryDetails, projects });
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.id;
  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);
  const title = 'Assign Categories to Project';
  res.render('assign-categories', { title, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.id;
  const selectedCategoryIds = req.body.categories || [];

  const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, selectedCategoryIds);
  req.flash('success', 'Categories assigned successfully.');
  res.redirect(`/project/${projectId}`);
}

const showNewCategoryForm = (req, res) => {
  const title = 'Create New Category';

  res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
  const { name } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    return res.redirect('/new-category');
  }

  try {
    const newCategoryId = await createCategory(name);

    req.flash('success', 'Category created successfully!');
    return res.redirect(`/category/${newCategoryId}`);
  } catch (error) {
    console.error('Error creating category:', error);

    req.flash(
      'error',
      'An error occurred while creating the category. Please try again.'
    );

    return res.redirect('/new-category');
  }
};

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const categoryDetails = await getCategoryById(categoryId);
  const title = 'Edit Category';

  res.render('edit-category', {
    title,
    categoryDetails
  });
};

const processEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    return res.redirect(`/edit-category/${categoryId}`);
  }

  try {
    const updatedCategoryId = await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');
    return res.redirect(`/category/${updatedCategoryId}`);
  } catch (error) {
    console.error('Error updating category:', error);

    req.flash(
      'error',
      'An error occurred while updating the category. Please try again.'
    );

    return res.redirect(`/edit-category/${categoryId}`);
  }
};


export { displayCategories, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation};
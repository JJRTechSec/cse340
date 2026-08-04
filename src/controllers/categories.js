import { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

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

  const categroyIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, selectedCategoryIds);
  req.flash('success', 'Categories assigned successfully.');
  res.redirect(`/project/${projectId}`);
}


export { displayCategories, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };
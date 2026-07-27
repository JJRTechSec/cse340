import { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId } from '../models/categories.js';

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
  console.log('Category Details:', categoryDetails); // Log the category details for debugging
  res.render('category', { title, categoryDetails, projects });
};

export { displayCategories, showCategoryDetailsPage };
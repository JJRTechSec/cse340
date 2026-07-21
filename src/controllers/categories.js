import { getAllCategories } from '../models/categories.js';

const displayCategories = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Service Categories';
  res.render('categories', { title, categories });
};

export { displayCategories };
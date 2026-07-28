import db from './db.js'

const getAllCategories = async () => {
  const query = `
        SELECT category_id, name, description
      FROM public.categories;
    `;

  const result = await db.query(query);

  return result.rows;
};

const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, name, description
    FROM public.categories
    WHERE category_id = $1;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name, c.description
    FROM categories c
    JOIN project_categories p ON c.category_id = p.category_id
    WHERE p.project_id = $1;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT p.project_id, title, p.description
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1;
  `;

  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);
  return result.rows;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId };
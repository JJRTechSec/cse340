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

const assignCategoriesToProject = async (projectId, categoryIds) => {
  const query = `
    INSERT INTO project_categories (project_id, category_id)
    VALUES ($1, $2)
  `;

  await db.query(query, [projectId, categoryIds]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, delete existing category assignments for the project
  const deleteQuery = `
    DELETE FROM project_categories
    WHERE project_id = $1
  `;
  await db.query(deleteQuery, [projectId]);

  // Add new category assignments for the project
  for (const categoryId of categoryIds) {
    await assignCategoriesToProject(projectId, categoryId);
  };
};

const createCategory = async (name) => {
  const query = `
    INSERT INTO categories (name, description)
    VALUES ($1, $2)
    RETURNING category_id;
  `;

  const description = 'No description provided.';
  const queryParams = [name, description];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create category');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new category with ID:', result.rows[0].category_id);
  }

  return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE categories
    SET name = $2
    WHERE category_id = $1
    RETURNING category_id;
  `;

  const queryParams = [categoryId, name];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to update category');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated category with ID:', result.rows[0].category_id);
  }

  return result.rows[0].category_id;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId, updateCategoryAssignments, createCategory, updateCategory };
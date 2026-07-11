import db from './db.js'

const getAllProjects = async () => {
  const query = `
         -- JOIN ORGANIZATION AND PROJECT TABLES TOGETHER
    SELECT p.title, p.date, o.name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.organization_id
    ORDER BY p.date ASC;
  `;
  const result = await db.query(query);
  return result.rows;
}

export { getAllProjects };
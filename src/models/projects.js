import db from './db.js';

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

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM projects
    WHERE organization_id = $1
    ORDER BY date;
  `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT
      project_id,
      o.organization_id,
      title,
      projects.description,
      location,
      date,
      name
    FROM projects
    JOIN organizations o
      ON projects.organization_id = o.organization_id
    WHERE date > CURRENT_DATE
    ORDER BY date
    LIMIT $1;
  `;

  const queryParams = [numberOfProjects];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (projectId) => {
  const query = `
    SELECT
      project_id,
      projects.organization_id,
      title,
      projects.description,
      location,
      date,
      name
    FROM projects
    JOIN organizations o
      ON projects.organization_id = o.organization_id
    WHERE project_id = $1;
  `;

  const queryParams = [projectId];
  const result = await db.query(query, queryParams);

  return result.rows[0]; // Return the first row, as project_id is unique
}

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };
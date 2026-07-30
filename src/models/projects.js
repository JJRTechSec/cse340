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

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
    INSERT INTO projects (title, description, location, date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
  `;
  const queryParams = [title, description, location, date, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }
  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }
  return result.rows[0].project_id;
};

const updateProject = async (projectId, organizationId, title, description, location, date) => { 
  const query = `
    UPDATE projects
    SET organization_id = $2,
        title = $3,
        description = $4,
        location = $5,
        date = $6
    WHERE project_id = $1
    RETURNING project_id;
  `;
  const queryParams = [projectId, organizationId, title, description, location, date];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to update project');
  }
  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', result.rows[0].project_id);
  }
  return result.rows[0].project_id;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject };
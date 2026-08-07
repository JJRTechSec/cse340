import db from './db.js';

/**
 * Add a user as a volunteer for a project.
 */
const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO project_volunteers (user_id, project_id)
    VALUES ($1, $2)
    RETURNING user_id, project_id;
  `;

  const queryParams = [userId, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to add volunteer');
  }

  return result.rows[0];
};

/**
 * Remove a user as a volunteer from a project.
 */
const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM project_volunteers
    WHERE user_id = $1
      AND project_id = $2
    RETURNING user_id, project_id;
  `;

  const queryParams = [userId, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to remove volunteer');
  }

  return result.rows[0];
};

/**
 * Get all projects a user has volunteered for.
 */
const getVolunteerProjectsByUserId = async (userId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.date,
      o.name AS organization_name
    FROM project_volunteers pv
    JOIN projects p
      ON pv.project_id = p.project_id
    JOIN organizations o
      ON p.organization_id = o.organization_id
    WHERE pv.user_id = $1
    ORDER BY p.date;
  `;

  const queryParams = [userId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const isUserVolunteer = async (userId, projectId) => {
  const query = `
    SELECT user_id
    FROM project_volunteers
    WHERE user_id = $1
      AND project_id = $2;
  `;

  const queryParams = [userId, projectId];
  const result = await db.query(query, queryParams);

  return result.rows.length > 0;
};

export { addVolunteer, removeVolunteer, getVolunteerProjectsByUserId, isUserVolunteer };
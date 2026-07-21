import { getAllProjects } from '../models/projects.js';

const displayProjects = async (req, res) => {
  const projects = await getAllProjects();
  const title = 'Service Projects';
  projects.forEach(project => {
    project.formattedDate = new Date(project.date).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).replace(',', ' -');
  });
  res.render('projects', { title, projects });
};

export { displayProjects };
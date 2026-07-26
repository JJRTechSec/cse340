import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const number_of_upcoming_projects = 5;

const displayProjects = async (req, res) => {
  const projects = await getUpcomingProjects(number_of_upcoming_projects);
  const title = 'Upcoming Service Projects';

  projects.forEach(project => {
    project.formattedDate = new Date(project.date).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  });

  res.render('projects', { title, projects });
};

 function showProjectDetailsPage() {
  return async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const title = 'Project Details';

    projectDetails.formattedDate = new Date(projectDetails.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    
    res.render('project', { title, projectDetails });
  };
};

export { displayProjects, showProjectDetailsPage };
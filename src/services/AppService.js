import axios from 'axios';

const getProjects = async () => {
  const result = await axios.get('/api/projects');
  return result.data;
};

const getProjectByName = async (name) => {
  const result = await axios.get(`/api/projects/${name}`);
  return result.data;
};

const postProject = project => axios.post('/api/projects', project);

export default {
  getProjects,
  postProject,
  getProjectByName,
};

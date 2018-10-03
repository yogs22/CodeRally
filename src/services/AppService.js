import axios from 'axios';
import { apiUrl } from '../config';

const getProjects = async () => {
  const result = await axios.get(`${apiUrl}/projects`);
  return result.data;
};

const getProjectByName = async (name) => {
  const result = await axios.get(`${apiUrl}/projects/${name}`);
  return result.data;
};

const postProject = project => axios.post(`${apiUrl}/projects`, project);

export default {
  getProjects,
  postProject,
  getProjectByName,
};

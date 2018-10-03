import React, { Component } from 'react';
import AppService from '../../services/AppService';

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { project: null };
  }

  componentDidMount() {
    this.getProjectData();
  }

  async getProjectData() {
    const { match } = this.props;
    const { name } = match.params;
    const project = await AppService.getProjectByName(name);
    this.setState({ project });
  }

  render() {
    const { project } = this.state;
    return (
      <div>
        <h1>{project ? project.name : ''}</h1>
        <b>Description</b>
        <p>{project ? project.description : ''}</p>
        <b>Tech Stack</b>
        <p>{project ? project.tech : ''}</p>
        <b>Website</b>
        <p>{project ? project.link : ''}</p>
        <b>Looking for partners</b>
        <p>{project ? project.partners : ''}</p>
      </div>
    );
  }
}

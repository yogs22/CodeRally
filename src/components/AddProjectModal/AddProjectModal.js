import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';
import AppService from '../../services/AppService';

import { validateUrl, validateRepoLink } from '../../utils';

const SNACKBAR_SUCCESS_MESSAGE = 'Submitted. After a quick review, your project will be listed!';
const SNACKBAR_FAILURE_MESSAGE = 'Project failed to be added!';
const SNACKBAR_LINK_ERROR = 'Error validating website link!';
const SNACKBAR_REPO_LINK_ERROR = 'Error validating repository link!';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const btnStyles = {
  margin: '10px',
};

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
  },
  button: {
    backgroundColor: deepPurple[700],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: deepPurple[900],
    },
  },
  btnCancel: {
    backgroundColor: grey[500],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
});

class AddProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      partners: '',
      tech: '',
      link: '',
      repoLink: '',
      loading: false,
      showLinkError: false,
      showRepoLinkError: false,
    };
    this.fetchProjects = props.fetchProjects;
    this.renderSnackbar = props.renderSnackbar;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePartnersChange = this.handlePartnersChange.bind(this);
    this.handleTechChange = this.handleTechChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleRepoLinkChange = this.handleRepoLinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handlePartnersChange(e) {
    this.setState({ partners: e.target.value });
  }

  handleTechChange(e) {
    this.setState({ tech: e.target.value });
  }

  handleLinkChange(e) {
    if (validateUrl(e.target.value)) {
      this.setState({ link: e.target.value, showLinkError: false });
    } else {
      this.setState({ link: e.target.value, showLinkError: true });
    }
  }

  handleRepoLinkChange(e) {
    if (validateRepoLink(e.target.value)) {
      this.setState({ repoLink: e.target.value, showRepoLinkError: false });
    } else {
      this.setState({ repoLink: e.target.value, showRepoLinkError: true });
    }
  }

  handleClose() {
    const { modalClosed } = this.props;
    modalClosed();
  }

  async handleSubmit() {
    const { renderSnackbar } = this.props;
    const {
      showLinkError, showRepoLinkError, name, description, partners, tech, link, repoLink,
    } = this.state;
    if (showLinkError) {
      const snackbarText = SNACKBAR_LINK_ERROR;
      renderSnackbar({ snackbarText });
      return;
    }
    if (showRepoLinkError) {
      const snackbarText = SNACKBAR_REPO_LINK_ERROR;
      renderSnackbar({ snackbarText });
      return;
    }
    this.setState({ loading: true });
    try {
      await AppService.postProject({
        name,
        description,
        partners,
        tech,
        link,
        repoLink,
      });
      this.setState({
        name: '',
        description: '',
        partners: '',
        tech: '',
        link: '',
        repoLink: '',
        loading: false,
      });
      const snackbarText = SNACKBAR_SUCCESS_MESSAGE;
      renderSnackbar({ snackbarText });
      this.handleClose();
    } catch (e) {
      console.log('Failed to validate', e);
      this.setState({ loading: false });
      const snackbarText = SNACKBAR_FAILURE_MESSAGE;
      renderSnackbar({ snackbarText });
    }
  }

  render() {
    const {
      name, description, partners, tech, link, repoLink, showLinkError, showRepoLinkError, loading
    } = this.state;
    const { open, classes } = this.props;
    return (
      <span>
        <Modal open={open} onClose={this.handleClose}>
          <div className={classes.paper} style={getModalStyle()}>
            <h2>List Project</h2>
            {loading && <LinearProgress />}
            <TextField fullWidth label="Project Name" value={name} onChange={this.handleNameChange} />
            <br />
            <br />
            <TextField fullWidth label="Description" value={description} onChange={this.handleDescriptionChange} />
            <br />
            <br />
            <TextField fullWidth label="Tech Stack" value={tech} onChange={this.handleTechChange} />
            <br />
            <br />
            <TextField fullWidth label="What partners are you looking for?" value={partners} onChange={this.handlePartnersChange} />
            <br />
            <br />
            <TextField error={showLinkError} helperText={showLinkError ? 'Please enter a valid https url' : ''} fullWidth label="Website" value={link} onChange={this.handleLinkChange} />
            <br />
            <br />
            <TextField error={showRepoLinkError} helperText={showRepoLinkError ? 'Please enter a valid github repo url' : ''} fullWidth label="Repo Link" value={repoLink} onChange={this.handleRepoLinkChange} />
            <br />
            <br />
            <div style={{ textAlign: 'center' }}>
              <Button style={btnStyles} disabled={loading} onClick={this.handleClose} className={classes.btnCancel}>
                Cancel
              </Button>
              <Button style={btnStyles} disabled={loading} onClick={this.handleSubmit} className={classes.button}>
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </span>
    );
  }
}

export default withStyles(styles)(AddProjectModal);

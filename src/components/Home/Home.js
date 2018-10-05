import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import deepPurple from '@material-ui/core/colors/deepPurple';
import lightBlue from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/grey';
import AddProjectModal from '../AddProjectModal/AddProjectModal';
import AppService from '../../services/AppService';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  icon: {
    margin: theme.spacing.unit * 2,
    backgroundColor: deepPurple[700],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: deepPurple[800],
    },
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    position: 'absolute',
  },
  table: {
    minWidth: 700,
  },
  button: {
    backgroundColor: grey[200],
    '&:hover': {
      backgroundColor: grey[300],
    },
    color: lightBlue[500],
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      snackbarOpen: false,
      initialProjects: [],
      projects: [],
      snackbarText: '',
    };
    this.addProject = this.addProject.bind(this);
    this.modalClosed = this.modalClosed.bind(this);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.renderSnackbar = this.renderSnackbar.bind(this);
  }

  async componentWillMount() {
    this.fetchProjects();
  }

  async fetchProjects() {
    const projects = await AppService.getProjects();
    this.setState({ projects });
    this.setState({ initialProjects: projects });
  }

  addProject() {
    console.log('button clicked');
    this.setState({ modalOpen: true });
  }

  modalClosed() {
    this.setState({ modalOpen: false });
    this.fetchProjects();
  }

  renderSnackbar({ snackbarText }) {
    this.setState({ snackbarOpen: true, snackbarText });
    setTimeout(() => {
      this.setState({ snackbarOpen: false });
    }, 5000);
  }

  filteredProject = (event) => {
    var updatedProject = this.state.initialProjects;
    updatedProject = updatedProject.filter(function(item) {
      const query = event.target.value.toLowerCase();
      const tableContent = `${item.name}${item.description}${item.tech}`;

      return tableContent.toLowerCase().indexOf(query) >= 0;
    });
    this.setState({projects: updatedProject});
  }

  renderProjects() {
    const { projects } = this.state;
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <TextField
          label="Search"
          className={classes.textField}
          margin="normal"
          style={{ marginLeft: '1em' }}
          onChange={this.filteredProject}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Tech</TableCell>
              <TableCell>Project Page</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              projects.map(({
                name, description, tech,
              }) => (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{tech}</TableCell>
                  <TableCell><Button className={classes.button} href={`/projects/${name}`}>View</Button></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  render() {
    const { classes } = this.props;
    const { modalOpen, snackbarOpen, snackbarText } = this.state;
    return (
      <div className="Home">
        <div className="container">{this.renderProjects()}</div>
        <Button variant="fab" aria-label="Add" className={classes.icon} onClick={this.addProject}>
          <AddIcon />
        </Button>
        <AddProjectModal open={modalOpen} modalClosed={this.modalClosed} renderSnackbar={this.renderSnackbar} />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={snackbarOpen}
          autoHideDuration={5000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={(
            <span id="message-id">
              {snackbarText}
            </span>
            )}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Home);

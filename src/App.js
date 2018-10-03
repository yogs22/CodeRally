import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Project from './components/Project/Project';
import Header from './components/Header/Header';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <div className="app" style={{ marginTop: '64px' }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects/:name" component={Project} />
          </div>
        </Router>
      </div>
    );
  }
}

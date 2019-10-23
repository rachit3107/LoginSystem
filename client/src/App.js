import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import Home from './Home';
import SignUp from './Signup';
import Mobile from './MobileLogin';


class App extends Component {
  constructor(props) {
    super(props);
    this.path = window.location.pathname;
    this.page = 'home';
    if (window.location.search && window.location.search.length > 0) {
      let q = queryString.parse(window.location.search);
      if (q.p) {
        this.page = q.p;
      }
      if (q.state) {
        this.state = q.state;
      }
    }
  }
  render() {
    if (this.page === 'home') {
      return (
        <React.Fragment><Home></Home></React.Fragment>
      );
    } else if (this.page === 'signup') {
      return (
        <React.Fragment><SignUp></SignUp></React.Fragment>
      );
    }
    else if (this.page === 'mobile') {
      return (
        <React.Fragment><Mobile></Mobile></React.Fragment>
      );
    }
  }
}
export default App;

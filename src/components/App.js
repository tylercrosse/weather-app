import React, { Component } from 'react';
import { connect } from 'react-redux';
import { geocode } from '../ducks/locations';
import Search from './Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search geocode={this.props.geocode} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations
})

export default connect(
  mapStateToProps,
  { geocode }
)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import './App.css';

class App extends Component {
  componentDidMount() {
    console.log('locations 🗺:', this.props.locations)
  }
  render() {
    return (
      <div className="App">
        <Search />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations
})

export default connect(
  mapStateToProps
)(App);

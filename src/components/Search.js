import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      draft: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      draft: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted! 📬:', this.state.draft)
    this.setState({
      draft: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.draft}
          placeholder="Enter location"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default Search;

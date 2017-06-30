import React from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
  }
  handleChange = (address) => {
    this.setState({
      address
    });
  }
  handleSelect = (address) => {
    this.props.geocode(address)
    this.setState({
      address: ''
    })
  }
  render() {
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: "Search Places",
    }

    return (
      <PlacesAutoComplete
        inputProps={inputProps}
        onSelect={this.handleSelect}
        onEnterKeyDown={this.handleSelect}
      />
    )
  }
}

export default Search;

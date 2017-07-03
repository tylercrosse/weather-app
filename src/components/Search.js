import React from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
  }
  handleChange = address => {
    this.setState({
      address
    });
  };
  handleSelect = address => {
    this.props.geocode(address);
    this.setState({
      address: ''
    });
  };
  render() {
    const AutocompleteItem = ({ formattedSuggestion }) =>
      <div className="search__item">
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">
          {formattedSuggestion.secondaryText}
        </small>
      </div>;
    const cssClasses = {
      root: 'search__bar',
      input: 'search__input',
      autocompleteContainer: 'search__autocomplete_container'
    };
    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: 'Search Places'
    };

    return (
      <div className="search">
        <PlacesAutoComplete
          inputProps={inputProps}
          onSelect={this.handleSelect}
          onEnterKeyDown={this.handleSelect}
          classNames={cssClasses}
          autocompleteItem={AutocompleteItem}
        />
      </div>
    );
  }
}

export default Search;

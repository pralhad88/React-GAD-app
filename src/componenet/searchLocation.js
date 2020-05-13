import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { TextField } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => this.props.address(results[0].formatted_address))
      .catch(error => console.error('Error', error));
  };
 
  render() {
      const { address} = this.props
    return (
        <div style={{marginTop: 50}}>
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              fullWidth
              label="Search location"
              {...getInputProps()}
            />
            <div >
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {

                return (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                  >
                    <ListItem button onChange={() => { 
                        address(suggestion.description)
                    }}>
                        <ListItemText>{suggestion.description}</ListItemText>
                    </ListItem>
                  </div>
        
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      </div>
    );
  }
}

export default (LocationSearchInput);
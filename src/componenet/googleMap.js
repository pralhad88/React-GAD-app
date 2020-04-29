import React, { Component } from 'react';
import { withSnackbar } from 'notistack'
import { connect } from 'react-redux';
import MapListButton from './mapListbutton'
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './currentLocation';
import Geocode from "react-geocode";

class MapContainer extends Component {
    constructor(props) {  
      super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      }

      Geocode.setApiKey('AIzaSyCvWHPdqMrAOsSa35aTDAr6ST1x4q2FJVE')
      Geocode.setLanguage("en");
      Geocode.setRegion("in");
    }
    
    onMarkerClick = (props, marker, e) => {
      const {lat, lng} = props.mapCenter;
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
      Geocode.fromLatLng(lat, lng).then(
        response => {
          const address = response.results[0].formatted_address;
          console.log(address);
        },
        error => {
          console.error(error);
        }
      );
    }
      
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

    render() {
        return(
            <div>
                <MapListButton />
                <CurrentLocation
                    centerAroundCurrentLocation
                    google={this.props.google}
                >
                  <Marker onClick={this.onMarkerClick} name={'current location'} />
                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                  >
                    <div>
                      <h3>{this.state.selectedPlace.name}</h3>
                    </div>
                  </InfoWindow>
                </CurrentLocation>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser
});

export default withSnackbar((connect(mapStateToProps, undefined)(GoogleApiWrapper({
    apiKey: 'AIzaSyCvWHPdqMrAOsSa35aTDAr6ST1x4q2FJVE'
  })(MapContainer))));
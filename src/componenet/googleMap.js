import React, { Component } from 'react';
import { withSnackbar } from 'notistack'
import { connect } from 'react-redux';
import MapListButton from './mapListbutton'
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './currentLocation';
import Geocode from "react-geocode";
import { currentAddress } from "../store/actions/auth";


class MapContainer extends Component {
    constructor(props) {  
      super(props);
      this.state = {
        showingInfoWindow: true,
        activeMarker: {},
        selectedPlace: {},
        location: ''
      }

      Geocode.setApiKey('AIzaSyBmiu7Ia3kJiOcNnPs_XF3HOt4RgUaO_c0')
      Geocode.setLanguage("en");
      Geocode.setRegion("in");
    }
    
    onMarkerClick = (props, marker, e) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
    
    async componentDidUpdate() {
      const { lat, lng } = await JSON.parse(localStorage.getItem('location'))
      if (lat) {
        Geocode.fromLatLng(lat, lng).then(
          response => {
            const address = response.results[0].formatted_address;
            this.setState({
              location: address
            })
            localStorage.setItem("address", address)
          },
          error => {
            console.error(error);
          }
        );
      }
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
                  <Marker onClick={this.onMarkerClick} />
                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                  >
                    <div>
                      <h3>{this.state.location}</h3>
                    </div>
                  </InfoWindow>
                </CurrentLocation>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser,
    currentAddress: state.auth.currentAddress,
});

const mapDispatchToProps = (dispatch) => ({
  currentAddress: () => dispatch(currentAddress()),
});

export default withSnackbar((connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyBmiu7Ia3kJiOcNnPs_XF3HOt4RgUaO_c0'
  })(MapContainer))));
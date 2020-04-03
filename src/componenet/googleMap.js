import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack'
import { connect } from 'react-redux';
import MapListButton from './mapListbutton'


const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(9),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(1.5, 0, 1),
        backgroundColor: "#eb7134",
        width: 100,
        marginLeft: -30
    },
});

class Map extends Component {
    render() {
      const { classes } = this.props;
      const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = { 13 }
      >
      </GoogleMap>
   ));
   
   return(
       <div>    
           <MapListButton />
           {/* <Container>
             <div className={classes.paper}>
               <GoogleMapExample
                 containerElement={ <div style={{ height: `800px`, width: '800px' }} /> }
                 mapElement={ <div style={{ height: `100%`}} /> }
              />
             </div>
           </Container> */}
       </div>
   );}
};

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser
});

export default withSnackbar(withStyles(useStyles)(connect(mapStateToProps, undefined)(Map)));
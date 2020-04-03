import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class MapListButton extends Component {
    render() {
      return (
        <div>
          <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
            <center>
              <Grid container style={{ width: '40%', marginTop: 5 }}>
                <Grid item xs={6}>
                  <a href={"/landing"}  >
                    <Typography component="h6" variant="h6">
                        Map
                    </Typography>
                  </a>
                </Grid>
                <Grid item xs={6}>
                  <a href={"/list"}>
                    <Typography component="h6" variant="h6">
                        List
                    </Typography>
                  </a>
                </Grid>
              </Grid>
            </center>
          </AppBar>
        </div>
        )
    }
}

export default MapListButton;
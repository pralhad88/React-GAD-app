import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import history from '../utils/history';

class MapListButton extends Component {
  handelChnageLanding = () => {
    history.push('/landing')
  }
  handelChnageList = () => {
    history.push('/listOfdeed')
  }
    render() {
      return (
        <div>
          <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
            <center>
              <Grid container style={{ width: '40%', marginTop: 5 }}>
                <Grid item xs={6}>
                  <Button style={{ color: 'white'}} onClick={this.handelChnageLanding}>
                    Map
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button style={{ color: 'white', marginBottom: 16 }} onClick={this.handelChnageList}>
                    List
                 </Button>
                </Grid>
              </Grid>
            </center>
          </AppBar>
        </div>
        )
    }
}

export default MapListButton;
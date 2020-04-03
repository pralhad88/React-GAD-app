import PhotoIcon from '@material-ui/icons/Photo';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';


const baseUrl = process.env.API_URL;
const payload = new FormData();

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 1),

    // backgroundColor: "#eb7134",
    // marginLeft: 60,
    width: 300
  },
  takePicture: {
    width: 160
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "white",
    // borderRedius:12,
    padding: 10,
    marginBottom: -12,
  },

});


class TagaDeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
          <center>
            <Typography variant="h6">
              Contact us
                            </Typography>
          </center>
        </AppBar>
        <Container>
          <div className={classes.paper}>
            <PhotoIcon style={{ height: 172, width: 186, color: "gray" }} />

            <Button
              variant="contained"
              // color="white"
              className={classes.button}
              startIcon={<CameraAltIcon />}
            >
              Take Picture
      </Button>

            <div style={{ width: 300 }}>
              <Autocomplete
                id="disable-portal"
                disablePortal
                renderInput={params => <TextField {...params} label="Select Category" margin="normal" />}
              />

              <Autocomplete style={{ marginTop: -23 }}
                id="disable-portal"
                disablePortal
                renderInput={params => <TextField {...params} label="Select Preferences" margin="normal" />}
              />
              <Grid item>
                <FormControlLabel control={<Checkbox checked={this.state.checked}
                  onChange={this.toggleChecked} />}
                  label="Container Available" />
              </Grid>
              <Grid item style={{ marginBottom: 15 }}>
                <span>By signing up, you agree to our , by signing up, you agree to our . y signing up, you agree to our.</span>
              </Grid>

              <Grid item>
                <TextField style={{ width: 300, marginBottom: 18 }} id="input-with-icon-grid" label="Select Location" defaultValue="sitaput UP" />
              </Grid>
              <Typography>
                <span>
                  Permanent location
            </span>
                <span>
                  <FormGroup style={{ marginTop: -30, marginLeft: 255 }}>
                    <FormControlLabel
                      control={<Switch aria-label="login switch" />}
                    />
                  </FormGroup>
                </span>
              </Typography>
              {/* <Grid item> */}

              <Autocomplete style={{ marginTop: -16, marginBottom: 24 }}
                id="disable-portal"
                disablePortal
                renderInput={params => <TextField {...params} label="Select audience" margin="normal" />}
              />
              {/* </Grid> */}

              <div style={{ width: 300, marginottom: 25 }}>

                <TextField style={{ marginBottom: 27, width: 300 }} id="Story-of-need" label="Story of need" defaultValue="A person is needy " />
              </div>
              <Button
                type="submit"
                halfWidth
                variant="contained"
                justifyContent='center'
                color="primary"
                className={classes.submit}>
                Post
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default withSnackbar(withStyles(useStyles)(TagaDeed)); 
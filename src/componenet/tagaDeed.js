import PhotoIcon from '@material-ui/icons/Photo';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import { InputAdornment, withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Camera from 'react-camera';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CameraIcon from '@material-ui/icons/Camera';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Geocode from "react-geocode";
import LocationSearchInput from "./searchLocation";
import Image from 'material-ui-image';
import Box from '@material-ui/core/Box';
import logo from "../assets/logo.png"
import { theme } from "../theme/theme"

const baseUrl = process.env.API_URL;
const payload = new FormData();

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  
  },
  
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(2, 1, 0),
    backgroundColor: "#eb7134",
    width: 120
  },
  
  takePicture: {
    width: 160
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "white",
    padding: 10,
    marginBottom: -12,
  },
  preview: {
    position: 'relative',
  },

  captureButton: {
    backgroundColor: 'gainsboro',
    borderRadius: '50%',
    height: 85,
    width: 85,
    cursor: 'pointer'
  },
  captureImage: {
    width: '50%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
},
formControl: {
  margin: theme.spacing(3, 1, 0),
},
dropDown: {
  cursor: 'pointer',
},
});


class TagaDeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraOpen: false,
      img:true,
      currentAddress: '',
      dailogOpen: false,
      modalOpen: false,
      audience: "All Groups, All individual users",
      story: "A person is needy",
      allGroup: true,
      individualUser: true,
    }
    Geocode.setApiKey('AIzaSyBmiu7Ia3kJiOcNnPs_XF3HOt4RgUaO_c0')
    Geocode.setLanguage("en");
    Geocode.setRegion("in");
    this.data = [
      { title: 'All', id: 1 },
      { title: 'Food', id: 2 },
      { title: 'Clothes', id: 3 },
      { title: 'Shelter', id: 4 },
      { title: 'Water', id: 5 },
      { title: 'Medical Emergency', id: 6 },
      { title: 'Books/Toys', id: 7 },
      { title: 'Live Update-Coronavirus', id: 8 },
      { title: 'Medical Supplies', id: 9 },
      { title: 'Live Update-Fire', id: 10 },
      { title: 'Live Update-Accident', id: 11 },
      { title: 'Groceries', id: 12 },
    ]
  }
  
  async componentDidMount() {
    const { lat, lng } = await JSON.parse(localStorage.getItem('location'))
    if (lat) {
      Geocode.fromLatLng(lat, lng).then(
        response => {
          const address = response.results[0].formatted_address;
          this.setState({
            currentAddress: address
          })
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  
  cameraApp = () => {
    this.setState({
      cameraOpen: true
    })
  }

  takePicture = () => {
    this.camera.capture()
      .then(blob => {
        this.img.src = URL.createObjectURL(blob);
        this.img.onload = () => { URL.revokeObjectURL(this.src); }
        this.setState({
          cameraOpen: false,
          img:false,
        })  
      })
  }
  
  searchLocation = () => {
    this.setState({
      dailogOpen: true
    })
  }
  
  address = (address) => {
    this.setState({
      currentAddress: address,
      dailogOpen: false
    })
  }
  
  handleClose = () => {
    this.setState({
      dailogOpen: false,
      modalOpen: false
    })
  }
  

  handleOpen = async () => {
    this.setState({
      modalOpen: true,
    })
  };

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name] : value
    })
  }

  handleChangebox = (event) => {
    const {name, checked} = event.target
    this.setState({
      [name] : checked
    })
  }
  handleSubmit = () => {
    const { allGroup, individualUser } = this.state
    if (allGroup && individualUser) {
      this.setState({
        audience: "All Groups + 1 more",
        modalOpen: false
      })
    }
    if (allGroup && !individualUser) {
      this.setState({
        audience: "All Groups",
        modalOpen: false
      })
    }
    if (!allGroup && individualUser) {
      this.setState({
        audience: "All individual users",
        modalOpen: false
      })
    }
    if (!allGroup && !individualUser) {
      this.setState({
        audience: "",
        modalOpen: false
      })
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div >
        <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
          <center>
            <Typography variant="h6">
              Tag a Deed
            </Typography>
          </center>
        </AppBar>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            {this.state.cameraOpen &&
              <Camera
                className={classes.preview}
                ref={(cam) => {
                  this.camera = cam;
                }}
              >
              </Camera>
            }
            {this.state.cameraOpen && <CameraIcon
                      className={classes.captureButton}
                      onClick={this.takePicture}
                    >
                    </CameraIcon> }
            { this.state.img && 
                <PhotoIcon style={{ height: 100, width: 100, color: "gray" }} />
            }
            <img
              className={classes.captureImage}
              ref={(img) => {
                this.img = img;
              }}
            />
            <Button
              onClick={this.cameraApp}
              variant="contained"
              className={classes.button}
              startIcon={<CameraAltIcon />}
            >
              Take Picture
            </Button>
            <Grid container spacing={1}>
              <Grid item xs={12}>
              <Autocomplete
                      id="disable-portal"
                      onChange={this.categoryHandleChange}
                      options={this.data}
                      getOptionLabel={option => option.title}
                      defaultValue={this.data[0]}
                      renderInput={params => <TextField {...params} label="Select Category" margin="normal" />}
                  />
              </Grid>
              <Grid item xs={12}>
              <Autocomplete
                      id="disable-portal"
                      onChange={this.categoryHandleChange}
                      options={this.data}
                      getOptionLabel={option => option.title}
                      defaultValue={this.data[0]}
                      renderInput={params => <TextField {...params} label="Select Preferences" margin="normal" />}
                  />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={ <Checkbox
                    checked={this.state.checked}
                    onChange={this.toggleChecked} 
                    />}
                  label="Container Available"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  * Whether that needy person has a food plate/water container to receive the donated food/water?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth 
                  id="input-with-icon-grid"
                  onClick={this.searchLocation}
                  label={<div style={{marginTop:-10}}><MyLocationIcon/>{" Select location"}</div>}
                  value={this.state.currentAddress}
                />
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={6}>
                    <Typography>
                        Permanent location
                    </Typography>
                </Grid>
                <Grid xs={6}>
                  <FormGroup style={{marginTop: -6,marginLeft:146}} >
                    <FormControlLabel
                      control={<Switch aria-label="login switch" />}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={this.state.audience}
                  name="audience"
                  label="Select audience"
                  type="Country"
                  id="country"
                  autoComplete="country"
                  onClick={this.handleOpen}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ArrowDropDownIcon
                          className={classes.dropDown}
                          onClick={this.handleOpen}
                          color='primary'
                          fontSize='large'
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={this.state.story}
                  name="story"
                  id="input-with-icon-grid"
                  label="Story of need"
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                halfWidth
                variant="contained"
                justifyContent='center'
                color="primary"
                className={classes.submit}>
                Post
              </Button>

              <Dialog open={this.state.dailogOpen} fullWidth >
                <DialogContent style={{height: 500}}>
                <AppBar position='absolute'>
                  <Toolbar>
                    <ArrowBackIcon
                      onClick={this.handleClose}
                      style={{ color: 'white', cursor: 'pointer' }}
                      className={classes.menuButton}
                    />
                    <Typography variant="h6" >
                      Change Location
                    </Typography>
                  </Toolbar>
                </AppBar>
                  <LocationSearchInput address={this.address}/>
                </DialogContent>
              </Dialog>
              <Dialog
                open={this.state.modalOpen}
              >
                <DialogContent className={classes.container} >
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <Toolbar style={{ backgroundColor: '#eb7134', height: 30, position: 'static', minHeight: 50 }}>
                        <Image
                          color="inherit"
                          src={logo}
                          style={{ height: -70, width: -120, paddingTop: 0 }}
                          imageStyle={{ height: 50, width: 80, left: 70 }}
                        />
                      </Toolbar>
                      <Box style={{ height: theme.spacing(1) }} />
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox checked={this.state.allGroup} onChange={this.handleChangebox} name="allGroup" />}
                            label="All Groups"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={this.state.individualUser} onChange={this.handleChangebox} name="individualUser" />}
                            label="All individual users"
                          />
                        </FormGroup>
                      </FormControl>
                      <Grid item container>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                          >
                            ok
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleClose}
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
            </Dialog>
            </div>
        </Container>
      </div>
    );
  }
}

export default withSnackbar(withStyles(useStyles)(TagaDeed)); 
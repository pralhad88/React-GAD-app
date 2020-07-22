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
import Slider from '@material-ui/core/Slider';
import LocationSearchInput from "./searchLocation";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Image from 'material-ui-image';
import Box from '@material-ui/core/Box';
import axios from 'axios';
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
      latLog: "",
      PAddress: "N",
      imagePath: "",
      validity: 3,
      dailogOpen: false,
      modalOpen: false,
      audience: "All Groups, All individual users",
      story: "A person is needy",
      allGroup: true,
      individualUser: true,
      container: 0,
      containerOpen: true,
      Title: "Food",
      noNeedPeople: 1
    }
    
    Geocode.setApiKey('AIzaSyBmiu7Ia3kJiOcNnPs_XF3HOt4RgUaO_c0')
    Geocode.setLanguage("en");
    Geocode.setRegion("in");
    this.data = [
      { title: 'Food', id: 1 },
      { title: 'Clothes', id: 2 },
      { title: 'Shelter', id: 3 },
      { title: 'Water', id: 4 },
      { title: 'Medical Emergency', id: 5 },
      { title: 'Books/Toys', id: 6 },
      { title: 'Live Update-Coronavirus', id: 7 },
      { title: 'Medical Supplies', id: 8 },
      { title: 'Live Update-Fire', id: 9 },
      { title: 'Live Update-Accident', id: 10 },
      { title: 'Groceries', id: 11 },
    ]
  }
  
  async componentDidMount() {
    const { lat, lng } = await JSON.parse(localStorage.getItem('location'))
    if (lat) {
      Geocode.fromLatLng(lat, lng).then(
        response => {
          const address = response.results[0].formatted_address;
          this.setState({
            currentAddress: address,
            latLog: `${lat},${lng}`
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
          imagePath: blob.type
        })  
      })
  }
  
  searchLocation = () => {
    this.setState({
      dailogOpen: true
    })
  }
  
  address = (address) => {
    const currentAddress = address.formatted_address
    const lat = address.geometry.location.lat()
    const log = address.geometry.location.lng()
    this.setState({
      currentAddress: currentAddress,
      latLog: `${lat},${log}`,
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

  toggleChecked = () => {
    const {container} = this.state;
    if(container === 0) {
      this.setState({
        container: 1
      })
    } else {
      this.setState({
        container: 0
      })
    }
  }
  
  categoryHandleChange = (event) => {
    const value = event.target.textContent;
    if (value == "Food" || value == "Water") {
      this.setState({
        containerOpen: true
      })
    }else {
      this.setState({
        containerOpen: false
      })
    }
    this.setState({
      Title: value
    })
  }

  PAddress = () => {
    const {PAddress} = this.state
    if (PAddress == "N") {
      this.setState({
        PAddress: "Y"
      })
    } else {
      this.setState({
        PAddress: "N"
      })
    }
  }
  sliderChange = (event, value) => {
    this.setState({
      validity: value
    })
  }
  
  decrement = () => {
    const {noNeedPeople} = this.state;
    if (noNeedPeople > 1) {
      this.setState({
        noNeedPeople: parseInt(noNeedPeople) - 1 
      })
    } else {
      this.props.enqueueSnackbar('At least one person should be benefited', {
        variant: 'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        }
      })
    }
  } 
  
  increment = () => {
    this.setState({
      noNeedPeople: parseInt(this.state.noNeedPeople) + 1
    })
  }
  
  postDeed = () => {
    const { latLog, currentAddress, container, imagePath, story, PAddress, Title, validity, noNeedPeople} = this.state
    const { User_ID } = JSON.parse(localStorage.getItem('user'))

    payload.append("User_ID", parseInt(User_ID))
    payload.append("Geopoint", latLog)
    payload.append("Tagged_Photo_Path", imagePath)
    payload.append("Tagged_Title", Title)
    payload.append("Description", story)
    payload.append("Address", currentAddress)
    payload.append("validity", validity)
    payload.append("container", container)
    payload.append("PAddress", PAddress)
    payload.append("NeedMapping_ID", 1)
    payload.append("sub_type_pref", 1)
    payload.append("all_groups", "Y")
    payload.append("all_individuals", "Y")
    payload.append("user_grp_ids", "")
    payload.append("from_group", "")
    
    try {
      if (parseInt(noNeedPeople) === 0) {
        this.props.enqueueSnackbar('At least one person should be benefited', {
          variant: 'error', anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          }
        })
      } else {
        axios.post(`${baseUrl}tag_need.php`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
          console.log(res)
        })
      }
    } catch (e) {
      console.log(e)
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

              <Grid item container xs={12}>
                  <Grid xs={6}>
                    <Typography>
                      Specify number of needy people
                    </Typography>
                  </Grid>
                  <Grid xs={6}>
                  <ButtonGroup size="small" aria-label="small outlined button group" style={{marginLeft:55}}>
                    <Button style={{ backgroundColor: "#eb7134", color: "white" }} onClick={this.decrement}><RemoveIcon /></Button>
                    <input onChange={this.handleChange} name="noNeedPeople" value= {this.state.noNeedPeople} style={{width: 0, padding:5, textAlign: "center"}}></input>
                    <Button style={{ backgroundColor: "#eb7134", color: "white" }} onClick={this.increment}><AddIcon /></Button>
                  </ButtonGroup>
                  </Grid>
              </Grid>
              {this.state.containerOpen && <div><Grid item xs={12}>
                <FormControlLabel
                  control={ <Checkbox
                    checked={this.state.checked}
                    onChange={this.toggleChecked}
                    color="primary"
                    />}
                  label="Container Available"
                />
              </Grid>
              <Grid item xs={12}>
              <Typography>
                * Whether that needy person has a food plate/water container to receive the donated food/water?
              </Typography>
            </Grid></div>}
              
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
                      control={<Switch onClick={this.PAddress} aria-label="login switch" color="primary"/>}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid item container xs = {12}>
                <Grid xs={6}> 
                  <Typography style={{fontSize: 15}}>
                  Deed Validity (1 to 48 Hours)
                  </Typography>
                </Grid>
                <Grid xs={6}>
                    <Typography style={{marginLeft:146, color: "#f05f40" }} >
                      {this.state.validity}hr(s)
                    </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
              <Slider 
                    min={1}
                    step={1}
                    max={48}
                    onChange={this.sliderChange}
                    valueLabelDisplay="auto"
                    defaultValue={3}
                    aria-labelledby="non-linear-slider"
                  />
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
                onClick={this.postDeed}
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
                            control={<Checkbox checked={this.state.allGroup} onChange={this.handleChangebox} name="allGroup" color="primary" />}
                            label="All Groups"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={this.state.individualUser} onChange={this.handleChangebox} name="individualUser" color="primary" />}
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
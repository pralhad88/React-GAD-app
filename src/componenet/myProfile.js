import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import logo from '../assets/pralhad.jpg'
import TextField from '@material-ui/core/TextField';
import Image from 'material-ui-image';
import Autocomplete from '@material-ui/lab/Autocomplete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { updateProfile } from '../store/actions/auth';
import { withSnackbar } from 'notistack';
import ChangePicture from '../componenet/changePicture';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Spinner from 'react-spinner-material';
import { InputAdornment, withStyles } from '@material-ui/core';
const baseUrl = process.env.API_URL;
const payload = new FormData();
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
    backgroundColor: "#eb7134",
    width: 150
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "white",
    padding: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: 250,
},
});



class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dailogOpen: false,
      Fname: '',
      Lname: '',
      Email: '',
      Country: '',
      State: '',
      City: '',
      ListOfState: [],
      ListOfCity: [],
      listOfCountry: [],
      CountryIndex: '',
      StateIndex: '',
      CityIndex: '',
      Country_ID: '',
      State_ID: '',
      City_ID: '',
      Password: '',
      Total_Points: '',
      passwordIsMasked: true,
      Privacy: '',
      imgUrl: '',
      buttonValue: 'Edit',
      pictures: [],
      selectedFile: null,
      loading: true,
    };
  }
  
  profileChange = (imgurl) => {
    this.setState({
      imgUrl: imgurl,
      dailogOpen: false
    })
  }
  
  componentDidMount() {
    this.fetchUserProfile()
  }
  
  async fetchUserProfile() {
    const { loggedInUser, history } = this.props;
    try {
      payload.append('User_ID', loggedInUser.User_ID)
      const response = await axios.post(`${baseUrl}fetch_userprofile.php`, payload);
      const [userProfile] = response.data.profiledata;
      this.setState({
        Fname: userProfile.Fname,
        Lname: userProfile.Lname,
        Email: userProfile.Email,
        Country_ID: userProfile.Country_ID,
        State_ID: userProfile.State_ID,
        City_ID: userProfile.City_ID,
        Password: userProfile.Password,
        Privacy: userProfile.Privacy,
        Total_Points: userProfile.Total_Points,
        
      })
      this.fetchCountry(userProfile.Country_ID)
    } catch (e) {
      this.props.enqueueSnackbar('Someting went wrong ! please try again', {
        variant: 'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        }
      });
      
      history.push('/landing')
     
    } 
  }

  async fetchCountry(Country_ID) {
    try {
      const response = await axios.post(`${baseUrl}country_list.php`, {});
      const allCountry = response.data.countrydata;
      allCountry.map((country, index) => {
        if (country.Cntry_ID == Country_ID) {
          this.setState({
            Country: country.Cntry_Name,
            CountryIndex: index,
            
          })
        }
      })
      this.setState({
        listOfCountry: allCountry,
      })
      this.fetchState(Country_ID)
    } catch (e) {
      console.log(e)
    }
  }

  async fetchState(Cntry_ID) {
    const { State_ID } = this.state
    try {
      payload.append('Cntry_ID', Cntry_ID)
      const response = await axios.post(`${baseUrl}state_list.php`, payload);
      const allState = response.data.statedata;
      allState.map((state, index) => {
        if (state.State_ID == State_ID) {
          this.setState({
            State: state.State_Name,
            StateIndex: index
          })
        }
      })
      this.setState({
        ListOfState: allState,
      })
      this.fetchCity(State_ID)
    } catch (e) {
      console.log(e)
    }
  }

  async fetchCity(State_ID) {
    const { City_ID } = this.state
    try {
      payload.append('State_ID', State_ID)
      const response = await axios.post(`${baseUrl}city_list.php`, payload);
      const allCity = response.data.citydata;
      allCity.map((city, index) => {
        if (city.City_ID == City_ID) {
          this.setState({
            City: city.City_Name,
            CityIndex: index,
          })
        }
      })
      this.setState({
        ListOfCity: allCity,
        loading: false,
      })
    } catch (e) {
      console.log(e)
    }
  }
  radioHandleChange = (event) => {
    this.setState({
      Privacy: event.target.value
    })
  };

  ChangePictureHandleClose = () => {
    this.setState({
      ChangePictureDailogOpen: false
    })
  };

  ChangePictureHandleOpen = () => {
    this.setState({
      dailogOpen: true
    })
  }

  countryHandleChange = (event, values) => {
    if (values) {
      const Country_ID = parseInt(values.Cntry_ID)
      this.setState({
        Country_ID: Country_ID
      })
      this.fetchState(Country_ID);
    }
  }



  stateHandleChange = (event, values) => {
    if (values) {
      const State_ID = parseInt(values.State_ID)
      this.setState({
        State_ID: State_ID
      })
      this.fetchCity(State_ID);
    }
  }

  cityHandleChange = (event, values) => {
    if (values) {
      const City_ID = parseInt(values.City_ID)
      this.setState({
        City_ID: City_ID
      })
    }
  }
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  onChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

  };

  onClick = async () => {
    const { buttonValue, Fname, Lname, Email, Country_ID, State_ID, City_ID, Privacy, Password, } = this.state;

    const { history, loggedInUser } = this.props;
    if (buttonValue == "Edit") {
      this.setState({
        buttonValue: "Save",
        passwordIsMasked: !this.state.passwordIsMasked
      })
    } else {
      console.log(Fname, Lname, Email, Country_ID, City_ID, State_ID, Privacy, Password)
      try {
        payload.append('Fname', Fname);
        payload.append('Lname', Lname);
        payload.append('Email', Email);
        payload.append('Country_ID', Country_ID)
        payload.append('State_ID', State_ID)
        payload.append('City_ID', City_ID)
        payload.append('User_ID', loggedInUser.User_ID)
        payload.append('Privacy', Privacy)
        payload.append('Password', Password)

        axios.post(`${baseUrl}update_userprofile.php`, payload)
          .then((res) => {
            loggedInUser.Fname = Fname;
            loggedInUser.Lname = Lname;
            loggedInUser.Country_ID = Country_ID;
            loggedInUser.Privacy = Privacy;

            localStorage.setItem('Email', Email);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            this.props.updateProfile()

            this.props.enqueueSnackbar('Successfully Updated your Profile!', {
              variant: 'success', anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              }
            });

            history.push('/landing')
          })
      } catch (e) {

      }
    }
  }

  render() {
    const { classes, loggedInUser } = this.props;
    const { Password, passwordIsMasked, Fname, Lname, Total_Points,
      Privacy, Email, Country, State, City, buttonValue } = this.state;

    return (
      <Fragment>
        <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
          <center>
            <Typography variant="h6">
              My Profile
            </Typography>
          </center>
        </AppBar>
        <Dialog
          open={this.state.loading}
        >
          <DialogContent className={classes.container}>
                    <Spinner size={35} spinnerColor={"green"} spinnerWidth={5} visible={this.state.loading} />
            </DialogContent>
        </Dialog>
        <Container component="main" maxWidth="xs" style={{ padding: -100 }}>
          <div className={classes.paper}>
            {this.state.imgUrl ? <img
              src={this.state.imgUrl}
              style={{ height: 120, width: 130}}
            />:
            <PersonPinIcon
              style={{width: 120, height: 120}}
            />
            }
            {this.state.buttonValue == "Save" && <Grid item xs={12}>
              <Button
                onClick={this.ChangePictureHandleOpen}
                // onClick={this.cameraApp}
                variant="contained"
                className={classes.button}
              >
                Change Picture
            </Button>
            </Grid>}

            <ChangePicture
              profileChange={this.profileChange}
              dailogOpen={this.state.dailogOpen}
            />


            <Typography component="h1" variant="h5">
              {loggedInUser.Fname} {loggedInUser.Lname}
            </Typography>

            <span>
              My Credits - {Total_Points ? Total_Points : null}
            </span>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="Fname"
                  value={Fname}
                  onChange={buttonValue == 'Save' ? this.onChange : null}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="Lname"
                  value={Lname}
                  onChange={buttonValue == 'Save' ? this.onChange : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="Email"
                  value={Email}
                  onChange={buttonValue == 'Save' ? this.onChange : null}
                />
              </Grid>
              <Grid item xs={12}>
                {buttonValue == 'Edit' ?
                  <TextField
                    fullWidth
                    label="Country"
                    name="Country"
                    value={this.state.listOfCountry ? Country : null}
                    onChange={buttonValue == 'Save' ? this.onChange : null}
                  />
                  :
                  <Autocomplete
                    id="disable-portal"
                    onChange={this.countryHandleChange}
                    options={this.state.listOfCountry}
                    getOptionLabel={option => option.Cntry_Name}
                    defaultValue={this.state.listOfCountry[this.state.CountryIndex]}
                    renderInput={params => <TextField
                      {...params}
                      label="Country"
                      margin="normal"
                    />
                    }
                  />
                }
              </Grid>
              <Grid item xs={12}>
                {buttonValue == 'Edit' ?
                  <TextField
                    fullWidth
                    label="State"
                    name="State"
                    value={this.state.ListOfState ? State : null}
                    onChange={buttonValue == 'Save' ? this.onChange : null}
                  /> :
                  <Autocomplete
                    id="disable-portal"
                    onChange={this.stateHandleChange}
                    openOnFocus={true}
                    options={this.state.ListOfState}
                    getOptionLabel={option => option.State_Name}
                    defaultValue={this.state.ListOfState[this.state.StateIndex]}
                    renderInput={params => <TextField {...params} label="State" margin="normal" />}
                  />
                }
              </Grid>
              <Grid item xs={12}>
                {buttonValue == 'Edit' ?
                  <TextField
                    fullWidth
                    label="City"
                    name="City"
                    value={this.state.ListOfCity ? City : null}
                    onChange={buttonValue == 'Save' ? this.onChange : null}
                  /> :
                  <Autocomplete
                    id="disable-portal"
                    onChange={this.cityHandleChange}
                    options={this.state.ListOfCity}
                    getOptionLabel={option => option.City_Name}
                    defaultValue={this.state.ListOfCity[this.state.CityIndex]}
                    renderInput={params => <TextField {...params} label="City" margin="normal" />}
                  />
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={passwordIsMasked ? 'password' : 'text'}
                  label="Password"
                  name="Password"
                  value={Password}
                  onChange={buttonValue == 'Save' ? this.onChange : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {passwordIsMasked ?
                          <VisibilityIcon
                            className={classes.eye}
                            onClick={this.togglePasswordMask}
                          /> :
                          <VisibilityOffIcon
                            className={classes.eye}
                            onClick={this.togglePasswordMask}
                          />
                        }
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container style={{ marginTop: 10 }}>
                  <Grid item xs={6}>
                    <Typography>Privacy:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <RadioGroup
                      aria-label="Privacy"
                      name="Privacy"
                      value={Privacy}
                      onChange={buttonValue == 'Save' ? this.radioHandleChange : null}
                    >
                      <Grid container style={{ marginTop: -10, marginLeft: -35, width: 300 }}>
                        <Grid item xs={6}>
                          <FormControlLabel
                            value="Anonymous"
                            control={<Radio style={{ color: "#f05f40" }} />}
                            label="Anonymous"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            value="Public"
                            control={<Radio style={{ color: "#f05f40" }} />}
                            label="Public"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onClick}
            >
              {this.state.buttonValue}
            </Button>

          </div>
            
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateProfile: () => dispatch(updateProfile()),
});

const mapStateToProps = (state) => ({
  loggedInUser: state.auth.loggedInUser
});

export default withSnackbar(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MyProfile)));
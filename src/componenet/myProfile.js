import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import logo from '../assets/pralhad.jpg'
import TextField from '@material-ui/core/TextField';
import Image from 'material-ui-image';
import Autocomplete from '@material-ui/lab/Autocomplete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';


const baseUrl = process.env.API_URL;
const payload = new FormData();
import { InputAdornment, withStyles } from '@material-ui/core';
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
        width: 100,
        color: 'white',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
            ListOfState: [],
            ListOfCity: [],
            listOfCountry: [],
            Country_ID: '',
            State_ID: '',
            City_ID: '',
            Password: '',
            passwordIsMasked: true,
            value:'Anonymous',
        };
    }

    radioHandleChange = (event) => {
        this.setState({
            value: event.target.value
        })
      };

    handleClose = () => {
        this.setState({
            dailogOpen: false
        })
    };

    handleOpen = () => {
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

    onClick = () => {
        try {

            const { Fname, Lname, Email, Country_ID, State_ID, City_ID } = this.state;
            payload.append('Fname', Fname);
            payload.append('Lname', Lname);
            payload.append('Email', Email);
            payload.append('Country_ID', Country_ID)
            payload.append('State_ID', State_ID)
            payload.append('City_ID', City_ID)
    
        } catch (e) {

        }
    }

    render() {
        const { classes } = this.props;
        const { Password, passwordIsMasked } = this.state;

        return (
            <Fragment>
                <Button style={{ color: 'white', marginBottom: 16 }} onClick={this.handleOpen}>
                    View Profile
          </Button>
                <Dialog
                    open={this.state.dailogOpen}
                >
                    <DialogContent >
                        <CssBaseline />
                        <AppBar position='absolute'>
                            <Toolbar>
                                <ArrowBackIcon
                                    onClick={this.handleClose}
                                    style={{ color: 'white', cursor: 'pointer' }}
                                    className={classes.menuButton}
                                />
                                <Typography variant="h6" >
                                    My Profile
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.paper}>
                            <Image
                                src={logo}
                                style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
                                imageStyle={{ height: 120, width: 140, left: 13, top: 15 }}
                            />
                            <Typography component="h1" variant="h5">
                                Pralhad Jadhav
                            </Typography>
                            
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="Fname"
                                        value={this.state.Fname}
                                        onChange={this.onChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="Lname"
                                        value={this.state.Lname}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="Email"
                                        value={this.state.Email}
                                        onChange={this.onChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="disable-portal"
                                        onChange={this.countryHandleChange}
                                        options={this.state.listOfCountry}
                                        getOptionLabel={option => option.Cntry_Name}
                                        disablePortal
                                        renderInput={params => <TextField {...params} label="Country" margin="normal" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="disable-portal"
                                        onChange={this.stateHandleChange}
                                        openOnFocus={true}
                                        options={this.state.ListOfState}
                                        getOptionLabel={option => option.State_Name}
                                        disablePortal
                                        renderInput={params => <TextField {...params} label="State" margin="normal" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="disable-portal"
                                        onChange={this.cityHandleChange}
                                        options={this.state.ListOfCity}
                                        getOptionLabel={option => option.City_Name}
                                        disablePortal
                                        renderInput={params => <TextField {...params} label="City" margin="normal" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type={passwordIsMasked ? 'password' : 'text'}
                                        label="Password"
                                        name="Password"
                                        value={Password}
                                        onChange={this.onChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {
                                                        passwordIsMasked ?
                                                            <VisibilityIcon
                                                                className={classes.eye}
                                                                onClick={this.togglePasswordMask}
                                                            /> : <VisibilityOffIcon
                                                                className={classes.eye}
                                                                onClick={this.togglePasswordMask}
                                                            />
                                                    }
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <div>
                                <span>Privacy:</span>
                                    <RadioGroup aria-label="Privacy" name="Privacy" value={this.state.value} onChange={this.radioHandleChange}>
                                    <FormControlLabel value="Anonymous" control={<Radio style={{color:"#f05f40"}} />} label="Anonymous" />
                                    <FormControlLabel value="Public" control={<Radio style={{color:"#f05f40"}} />} label="Public" />
                                    </RadioGroup>
                            </div>
                            
                        </div>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
  
    componentDidMount() {
        this.fetchCountry();
        this.setState({
          ListOfState: [{ State_Name: "Select Country first" }],
          ListOfCity: [{ City_Name: "Select Country and State first" }]
        })
      }
      async fetchCountry() {
        try {
          const response = await axios.post(`${baseUrl}country_list.php`, {});
          const allCountry = response.data.countrydata;
          this.setState({
            listOfCountry: allCountry,
          })
        } catch (e) {
          console.log(e)
        }
      }
    
      async fetchState(Cntry_ID) {
        try {
          payload.append('Cntry_ID', Cntry_ID)
          const response = await axios.post(`${baseUrl}state_list.php`, payload);
          const allState = response.data.statedata;
          this.setState({
            ListOfState: allState,
          })
        } catch (e) {
          console.log(e)
        }
      }
      async fetchCity(State_ID) {
        try {
          payload.append('State_ID', State_ID)
          const response = await axios.post(`${baseUrl}city_list.php`, payload);
          const allCity = response.data.citydata;
    
          this.setState({
            ListOfCity: allCity,
          })
        } catch (e) {
          console.log(e)
        }
      }
}




const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser
});

export default withStyles(styles)(connect(mapStateToProps, undefined)(MyProfile));


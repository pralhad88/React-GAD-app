import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
// import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import axios from 'axios';
import logo from '../../assets/logo.png'
import { connect } from 'react-redux';

// const animatedComponents = makeAnimated();
const baseUrl = process.env.API_URL;
const payload = new FormData();

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
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
        margin: theme.spacing(3, 0, 1),
        backgroundColor: "#eb7134",
        // marginLeft: 60,
        width: 150
    },

});




class FirstLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ListOfState: [],
            ListOfCity: [],
            listOfCountry: [],
            Country_ID: '',
            State_ID: '',
            City_ID: ''
        };
    }

    countryHandleChange = selectedValue => {
        const { value } = selectedValue;
        const Country_ID= parseInt(value)
        this.setState({
            Country_ID: Country_ID
        })
        this.fetchState(Country_ID);
    }
    
    stateHandleChange = selectedValue => {
        const { value } = selectedValue;
        const State_ID = parseInt(value)
        this.setState({
            State_ID: State_ID
        })
        this.fetchCity(State_ID);
    }

    cityHandleChange = selectedValue => {
        const { value } = selectedValue;
        const City_ID = parseInt(value)
        this.setState({
            City_ID: City_ID
        })
    }
    
    onClick = () => {
        const { Country_ID, State_ID, City_ID } = this.state;
        const { loggedInUser, Email } = this.props;
        try {
            payload.append('Country_ID', Country_ID)
            payload.append('State_ID', State_ID)
            payload.append('City_ID', City_ID)
            payload.append('Email', Email)
            payload.append('User_ID', parseInt(loggedInUser.User_ID))
            if (Country_ID && State_ID && City_ID) {
                axios.post(`${baseUrl}first_login.php`, payload)
                .then((res) => {
                    const [checkstatus] = res.data.checkstatus;
                    if(checkstatus.status == 1) {
                        // oepn landding page
                    } else {
                        this.props.enqueueSnackbar('Something is wrong pleasse try again!', {
                            variant: 'error', anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',}
                        });
                    }
                })
            } else {
                this.props.enqueueSnackbar('Please fill all mandatory filed!', {
                    variant: 'error', anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center',
                    }
                  });
            }
        } catch (e) {
          console.log(e)
        }
    }
    
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs" style={{ padding: -100 }}>
                <CssBaseline />
                <div className={classes.paper} style={{}}>
                    <Image
                        src={logo}
                        style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
                        imageStyle={{ height: 120, width: 140, left: 13, top: 15 }}
                    />
                    <Typography component="h1" variant="h5">
                        First Login
                        <hr></hr>
                    </Typography>
                    <InputLabel className={"firstloginLable"}>Country</InputLabel>
                    <Select
                        className={"filterSelectGlobal"}
                        onChange={this.countryHandleChange}
                        options={this.state.listOfCountry}
                        placeholder={"Select Country..."}
                        isClearable={false}
                        closeMenuOnSelect={true}
                    />
                    <InputLabel className={"firstloginLable"}>State</InputLabel>
                    <Select
                        className={"filterSelectGlobal"}
                        onChange={this.stateHandleChange}
                        options={this.state.ListOfState}
                        placeholder={"Select State..."}
                        isClearable={false}
                        closeMenuOnSelect={true}
                    />
                    <InputLabel className={"firstloginLable"}>City</InputLabel>
                    <Select
                        className={"filterSelectGlobal"}
                        onChange={this.cityHandleChange}
                        options={this.state.ListOfCity}
                        placeholder={"Select City..."}
                        isClearable={false}
                        closeMenuOnSelect={true}
                    />
                    <Button
                        type="submit"
                        halfWidth
                        variant="contained"
                        justifyContent='center'
                        color="primary"
                        onClick={this.onClick}
                        className={classes.submit}>
                        Submit
                    </Button>
                </div>
            </Container>
        );
    }
    
    componentDidMount() {
        this.fetchCountry();
    }
    async fetchCountry() {
        try {
          const response = await axios.post(`${baseUrl}country_list.php`, {});
          const allCountry = response.data.countrydata.map(x => {return { label: x.Cntry_Name, value: x.Cntry_ID }})
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
            const allState = response.data.statedata.map(x => {return {label: x.State_Name, value: x.State_ID }})
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
            const allCity = response.data.citydata.map(x => {return {label: x.City_Name, value: x.City_ID }})
            this.setState({
              ListOfCity: allCity,
            })
        } catch (e) {
          console.log(e)
        }
    }
}

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser,
    Email: state.auth.Email
});


export default withSnackbar(withStyles(useStyles)(connect(mapStateToProps, undefined)(FirstLogin)));
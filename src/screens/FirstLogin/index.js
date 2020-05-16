import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import axios from 'axios';
import logo from '../../assets/logo.png';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { login } from '../../store/actions/auth';

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
      City_ID: '',
      Email: ''
    };
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

  onChange = (event) => {
    const { name , value } = event.target
    this.setState({
      [name]: value
    })
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

  onClick = () => {
    let { Country_ID, State_ID, City_ID, Email } = this.state;
    const { User_ID } = JSON.parse(localStorage.getItem("user"))
    if (!Email) {
      Email = localStorage.getItem("Email");
    }
    try {
      payload.append('Country_ID', Country_ID)
      payload.append('State_ID', State_ID)
      payload.append('City_ID', City_ID)
      payload.append('Email', Email)
      payload.append('User_ID', parseInt(User_ID))
      const { history } = this.props;
      if (Country_ID && State_ID && City_ID) {
        axios.post(`${baseUrl}first_login.php`, payload)
          .then((res) => {
            const [checkstatus] = res.data.checkstatus;
            if (checkstatus.status == 1) {
              localStorage.setItem("Email", Email);
              this.props.login()
              history.push("/landing")
            } else {
              this.props.enqueueSnackbar('Something is wrong pleasse try again!', {
                variant: 'error', anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                }
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
    const isEmail = localStorage.getItem("Email");
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


          <div style={{ width: 300 }}>
            <Autocomplete
              id="disable-portal"
              onChange={this.countryHandleChange}
              options={this.state.listOfCountry}
              getOptionLabel={option => option.Cntry_Name}
              disablePortal
              renderInput={params => <TextField {...params} label="Country" margin="normal" />}
            />

            <Autocomplete
              id="disable-portal"
              onChange={this.stateHandleChange}
              openOnFocus={true}
              options={this.state.ListOfState}
              getOptionLabel={option => option.State_Name}
              disablePortal
              renderInput={params => <TextField {...params} label="State" margin="normal" />}
            />

            <Autocomplete
              id="disable-portal"
              onChange={this.cityHandleChange}
              options={this.state.ListOfCity}
              getOptionLabel={option => option.City_Name}
              disablePortal
              renderInput={params => <TextField {...params} label="City" margin="normal" />}
            />
            { isEmail == "noEmail" && <TextField
              margin="normal"
              // required
              fullWidth
              label="Email Address"
              name="Email"
              value={this.state.Email}
              autoComplete="email"
              onChange={this.onChange}
            />}
          </div>

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
  loggedInUser: state.auth.loggedInUser,
  Email: state.auth.Email
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
});

export default withSnackbar(withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(FirstLogin)));
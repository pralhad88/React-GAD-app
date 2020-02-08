import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
// import PropTypes from 'prop-types';
import { InputAdornment, withStyles } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withSnackbar } from 'notistack';
import axios from 'axios';
import { theme } from '../../theme/theme';
import logo from '../../assets/logo.png'
import ResendLink from '../ResendLink';

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
  eye: {
    cursor: 'pointer',
  },
});


const responseGoogle = (response) => {
  console.log(response);
}
const responseFacebook = (response) => {
  console.log(response);
}
const responseLinkedIn = (response) => {
  console.log(response);
}

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Email: '',
      Password: '',
      passwordIsMasked: true,
      dailogOpen: false,
    };
  }

  onChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onClick = () => {
    const {Password, Email } = this.state;
    try {
      payload.append('Email', Email)
      payload.append('Password', Password)
      payload.append('Device_ID', '12')
      if(Email && Password) {
        axios.post(`${baseUrl}login.php`, payload)
        .then((res) => {
          const [ checkstatus ] = res.data.checkstatus;
          if (checkstatus.status == 2){
            this.setState({
              dailogOpen: true
            })
          } else if (checkstatus.status == 4) {
            this.props.enqueueSnackbar('Wrong Password!', {
              variant: 'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              }
            });
          } else if (checkstatus.status == 0) {
            this.props.enqueueSnackbar('Email address not found!', {
              variant: 'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              }
            });
          } else if (checkstatus.status == 1) {

          }
        })
      } else [

      ]
    } catch (e) {

    }
  }
  
  handleSuccess = (data) => {
    console.log(data)
    // this.setState({
    //   code: data.code,
    //   errorMessage: '',
    // });
  }

  handleFailure = (error) => {
    console.log(error)
    // this.setState({
    //   code: '',
    //   errorMessage: error.errorMessage,
    // });
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };
  
  handleClose = () => {
    this.setState({
      dailogOpen: false
    })
  };

  render() {
    const { classes } = this.props;
    const { Email, Password, passwordIsMasked } = this.state;
    return (
      <Container component="main" maxWidth="xs" style={{ padding: -100 }}>
        <CssBaseline />
        <div className={classes.paper} style={{}}>
          <Image
            src={logo}
            style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
            imageStyle={{ height: 120, width: 140, left:13, top: 15 }}
          />
          <Typography component="h1" variant="h5">
            Login
          <hr></hr>
          </Typography>
          <TextField

            margin="normal"
            // required
            fullWidth
            label="Email Address"
            name="Email"
            value={Email}
            autoComplete="email"
            onChange={this.onChange}
            autoFocus
          />
          <Box style={{ height: theme.spacing(0.5) }} />
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onClick}
          >
            Login
          </Button>
          <Grid item>
            <p>
              <span >Not registered yet? </span>
              <span>
                <Link href="/register" variant="body2">
                  Sign Up
            </Link>
              </span>
              <p style={{ marginLeft: 20 }}>
                <Link href="/forgetPassword" variant="body2">
                  Forgot password?
              </Link>
              </p>
            </p>
          </Grid>
          <h4><span>OR LOGIN WITH</span></h4>
          <Box style={{ height: theme.spacing(2) }} />
          <Grid container style={{ marginLeft: 25, width: 270 }}>
            <Grid item xs={4}>
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText=""
                className="btnGoogle"
                theme='dark'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </Grid>
            <Grid item xs={4}>
              <FacebookLogin
                appId="1088597931155576"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="btnFacebook"
                icon={<i className="fa fa-facebook" style={{ marginLeft: '5px', fontSize:30 }}></i>}
                textButton="&nbsp;&nbsp;"
              />
            </Grid>
            <Grid item xs={4}>
              <LinkedIn
                clientId="81lx5we2omq9xh"
                onFailure={this.handleFailure}
                onSuccess={this.handleSuccess}
                redirectUri="http://localhost:8080"
                className="btnLinkedIn"
              >
                <i className="fa fa-linkedin" style={{ fontSize:30 }}></i>
              </LinkedIn>
            </Grid>
          </Grid>
          <Typography>
            <p style={{ alignItems: 'center', marginLeft: 27 }}>By logging in, you agree to our</p><span style={{ color: '#eb7134' }}>Term and conditions</span> <span >and</span> <span style={{ color: '#eb7134' }}>Privacy Policy</span>
          </Typography>
          <br></br>
        </div>
        <ResendLink
          email={this.state.Email}
          dailogOpen={this.state.dailogOpen}
          dailogClose={this.handleClose}
        />
      </Container>
    );
  }
}


export default withSnackbar(withStyles(useStyles)(Login));
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
import { InputAdornment, withStyles } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withSnackbar } from 'notistack';
import axios from 'axios';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { login } from '../../store/actions/auth';
import { theme } from '../../theme/theme';
import logo from '../../assets/logo.png'
import PrivacyAndPolicy from '../Register/PrivacyAndPolicy';
import TermsAndConditions from '../Register/TermAndConditions';
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
    backgroundColor: "#eb7134",
    width: 150
  },
  eye: {
    cursor: 'pointer',
  },
});


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Email: '',
      Password: '',
      Fname: '',
      Lname: '',
      email: '',
      userID: '',
      passwordIsMasked: true,
      dailogOpen: false,
      privacyDailogOpen: false,
      termsDailogOpen: false,
    };
  }

  responseGoogle = (response) => {
    const { email, familyName, givenName } = response.profileObj
    payload.append('Fname', familyName)
    payload.append('Lname', givenName)
    payload.append('Email', email)
    payload.append('Device_ID', '1')
    payload.append('Login_Type', 'gp')
    try {
      axios.post(`${baseUrl}social_signup.php`, payload)
        .then((res) => {
          const { checkstatus } = res.data;
          if (!checkstatus.f_name) {
            localStorage.setItem('Email', this.state.Email);
            localStorage.setItem('user', JSON.stringify(checkstatus));
            // redirect to first login page
          } else if (checkstatus.status == 1) {
            localStorage.setItem('Email', this.state.Email);
            localStorage.setItem('user', JSON.stringify(checkstatus));
            // direct goes to landing page
          }
        })
    } catch (e) {

    }
  }

  responseFacebook = (response) => {
    const { name, email, userID } = response;
    let fullName = name.split(' ');
    const Fname = fullName[0];
    const Lname = fullName[1]
    if (!email) {
      this.setState({
        Fname: fullName[0],
        Lname: fullName[1],
        userID: userID,
        modalOpen: true
      })
    } else {
      this.facebookLogin(Fname, Lname, email, userID)
    }
  }

  facebookLogin = (Fname, Lname, email, userID) => {
    payload.append('Fname', Fname)
    payload.append('Lname', Lname)
    payload.append('Email', email)
    payload.append('Device_ID', '1')
    payload.append('Social_Login_ID', userID)
    try {
      axios.post(`${baseUrl}facebook_signup.php`, payload)
        .then((res) => {
          const { checkstatus } = res.data;
          if (!checkstatus.f_name) {
            localStorage.setItem('Email', this.state.Email);
            localStorage.setItem('user', JSON.stringify(checkstatus));
            // redirect to first login page
          } else if (checkstatus.status == 1) {
            localStorage.setItem('Email', this.state.Email);
            localStorage.setItem('user', JSON.stringify(checkstatus));
            // direct goes to landing page
          }
        })
    } catch (e) {

    }
    
  }

  responseLinkedIn = (response) => {
    const params = new URLSearchParams(); // query parameter paased

    params.append('grant_type', 'authorization_code')
    params.append('code', response.code)
    params.append('redirect_uri', "http://localhost:8080/linkedin")
    params.append('client_id', '815fc7xzjkar13')
    params.append('client_secret', '7qDtDAOCRVrzPe9G')

    axios.post('https://www.linkedin.com/oauth/v2/accessToken', params)
      .then((res) => {
        const { access_token } = res.data;
        axios.get('https://api.linkedin.com/v2/me',
          {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          }).then((res) => {
            console.log(res.data)
          })
      })
  }

  errr = (error) => {
    console.log(error);
    alert("There was some issue with Social media Login. Contact the admin.");
  }

  onChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onClick = () => {
    const { Password, Email } = this.state;
    try {
      payload.append('Email', Email)
      payload.append('Password', Password)
      payload.append('Device_ID', '12')
      if (Email && Password) {
        axios.post(`${baseUrl}login.php`, payload)
          .then((res) => {
            const [checkstatus] = res.data.checkstatus;
            if (checkstatus.status == 2) {
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
              localStorage.setItem('Email', this.state.Email);
              localStorage.setItem('user', JSON.stringify(checkstatus));
              this.props.login(checkstatus, this.state.Email)
              const { history } = this.props;
              history.push("/firstLogin");
            }
          })
      } else {

      }
    } catch (e) {

    }
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  handleClose = () => {
    this.setState({
      dailogOpen: false,
      privacyDailogOpen: false,
      termsDailogOpen: false
    })
    const { Fname, Lname, email, userID } = this.state
    if (Fname) {
      this.facebookLogin(Fname, Lname, email, userID)
    }
  };

  handleOpen = () => {
    this.setState({
      dailogOpen: true,
    })
  }
  
  privacyAndPolicyOpen = () => {
    this.setState({
      privacyDailogOpen: true
    })
  }
  
  termsAndConditionsOpen = () => {
    this.setState({
      termsDailogOpen: true
    })
  }
  
  render() {
    const { classes } = this.props;
    const { Email, Password, passwordIsMasked, email } = this.state;
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
          <Grid container style={{ marginLeft: 18, width: 150 }}>
            <Grid item xs={6}>
              <GoogleLogin
                clientId="34917283366-b806koktimo2pod1cjas8kn2lcpn7bse.apps.googleusercontent.com"
                buttonText=""
                className="btnGoogle"
                theme='dark'
                scope="profile email"
                onSuccess={this.responseGoogle}
                onFailure={this.errr}
              />
            </Grid>
            <Grid item xs={6}>
              <FacebookLogin
                appId="602690913907946"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook}
                cssClass="btnFacebook"
                icon={<i className="fa fa-facebook" style={{ marginLeft: '5px', fontSize: 30 }}></i>}
                textButton="&nbsp;&nbsp;"
              />
            </Grid>
            {/* <Grid item xs={4}>
              <LinkedIn
                clientId="815fc7xzjkar13"
                scope="r_liteprofile,r_emailaddress"
                onFailure={this.errr}
                onSuccess={this.responseLinkedIn}
                redirectUri= "http://localhost:8080/linkedin"
                className="btnLinkedIn"
              >
                <i className="fa fa-linkedin" style={{ fontSize:30 }}></i>
              </LinkedIn>
            </Grid> */}
          </Grid>
          <Typography>
            <p style={{ alignItems: 'center', marginLeft: 27 }}>
              By logging in, you agree to our
            </p>
            <span onClick={this.termsAndConditionsOpen} style={{ color: '#eb7134', cursor: 'pointer' }}>
              Term and conditions
            </span>
            <span> and </span>
            <span onClick={this.privacyAndPolicyOpen} style={{ color: '#eb7134', cursor: 'pointer' }}>
              Privacy Policy
            </span>
          </Typography>
          <br></br>
        </div>
        <ResendLink
          email={this.state.Email}
          dailogOpen={this.state.dailogOpen}
          dailogClose={this.handleClose}
        />
        <PrivacyAndPolicy
          dailogOpen={this.state.privacyDailogOpen}
          dailogClose={this.handleClose}
        />
        <TermsAndConditions
          dailogOpen={this.state.termsDailogOpen}
          dailogClose={this.handleClose} 
        />
        <Dialog
          open={this.state.modalOpen}
        >
          <DialogContent className={classes.container}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">Enter Email Address</Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={this.onChange}
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="contained"
                  justifyContent='center'
                  color="primary"
                  onClick={this.handleClose}
                  className={classes.submit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default withSnackbar(withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Login)));
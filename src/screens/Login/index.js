import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import LinkedIn from "linkedin-login-for-react";
import { theme } from '../../theme/theme';


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
    margin: theme.spacing(3, 0, 2),
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
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper} style={{}}>
          <Grid item xs={0.15}>
            <LockOutlinedIcon />
          </Grid>
          <Typography component="h1" variant="h5">
            Login
          <hr></hr>
          </Typography>
          <TextField

            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField

            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            halfWidth
            variant="contained"
            justifyContent='center'
            color="primary"
            className={classes.submit}>
            Login
          </Button>
          <p>
            <span>Not registered yet?</span>
            <span>
            <Link href="#" variant="body2">
              Sign Up
            </Link>
            </span> 
          </p>
          <Grid item xs>
            <Link href="/forgetPassword" variant="body2">
              Forgot password?
              </Link>
          </Grid>

          <FormControlLabel
            control={<box value="remember" color="primary" />}
            label={"OR LOGIN WITH"} />
          <Box style={{ height: theme.spacing(2) }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText=""
                className="btnGoogle"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                // style= {{ 
                //   width: 100,
                //   height:100,
                //   borderRadius: '25px',
                //   border: '0px transparent'
                // }}
              ></GoogleLogin>
            </Grid>
            <Grid item xs={4}>
            <FacebookLogin
              appId="1088597931155576"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass= "btnFacebook"
              icon={<i className="fa fa-facebook" style={{marginLeft:'5px'}}></i>}
              textButton = "&nbsp;&nbsp;"
            />
            </Grid>
            <Grid item xs={4}>
            <LinkedIn
              clientId="xxx"
              callback={responseLinkedIn}
              className="btnLinkedIn"
              text="LI"
              icon={<i class="fab fa-linkedin-in"></i> } />
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}


export default withStyles(useStyles)(Login);
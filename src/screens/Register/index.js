import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { theme } from '../../theme/theme';
import logo from '../../assets/logo.png'
import ListOfCountry from './ListOfCountry';
const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 150
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1.5, 0, 1),
    backgroundColor: "#eb7134",
    width: 150,
    marginLeft: -45
  },
});


class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Fname: '',
      Lname: '',
      Email: '',
      country: '',
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Image
            src={logo}
            style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
            imageStyle={{ height: 120, width: 165 }}
          />
          <Typography component="h1" variant="h5">
            Sign up
          <hr></hr>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                // required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <ListOfCountry />
            <Grid style={{ marginLeft: 40 }}>
              <Grid item>
                <p style={{ alignItems: 'center', marginLeft: 28,color:'#cfd9df' }}>By signing up, you agree to our</p>
                <p style={{ alignItems: 'center', marginLeft: 2 }}><span style={{ color: '#eb7134' }}>Term and conditions</span> <span style={{color: '#cfd9df'}}>and </span><span style={{ color: '#eb7134' }}>Privacy Policy</span></p>
                {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
          </Button>
          </Grid>
          <Grid item >
            <Link href="/" style={{ color: 'black' }}>
              <span style={{color:'#cfd9df', marginLeft: -45}}>Already have an account? Login</span>
            </Link>
          </Grid>
          <br></br>
        </div>
        {/* <Box mt={5}>
        <Copyright />
      </Box> */}
      </Container>
    );
  }
};

export default withStyles(styles)(Register);
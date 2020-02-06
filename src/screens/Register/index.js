import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import logo from '../../assets/logo.png'
import ListOfCountry from './ListOfCountry';
import { withSnackbar } from 'notistack';
const baseUrl = process.env.API_URL;

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
      Country_ID: ''
    };
  }
  
  
  handleChange = selectedValue => {
    this.setState({
      Country_ID: selectedValue
    });
  }

  onChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if ( name === 'Email' && value.length > 10) {
      axios.post(`${baseUrl}email_check.php`, {
        Email: value
      })
      .then((res) => {
        const [checkstatus] = res.data.checkstatus;
        if (checkstatus.status == 1) {
          this.props.enqueueSnackbar('Email address already exists!', {
            variant: 'success', anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            }
          });
        }
      })
    }
  };

  onClick = () => {
    try {
      const data = this.state;
      axios.post(`${baseUrl}app_signup.php`, data)
        .then((res) => {
          if (typeof res.data !== 'object') {
            this.props.enqueueSnackbar('Email address already exists!', {
              variant: 'success', anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              }
            });
          }
        });
    } catch (e) {

    }
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
            imageStyle={{ height: 120, width: 140, left: 13, top: 15 }}
          />
          <Typography component="h1" variant="h5">
            Sign up
          <hr></hr>
          </Typography>
          <Grid container spacing={2}>
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
            <ListOfCountry country_Id={this.handleChange} />
            <Grid style={{ marginLeft: 40 }}>
              <Grid item style={{ marginLeft: 15 }}>
                <p style={{ alignItems: 'center', marginLeft: 28 }}>By signing up, you agree to our</p>
                <p style={{ alignItems: 'center', marginLeft: 2 }}><span style={{ color: '#eb7134' }}>Term and conditions</span><span>and </span><span style={{ color: '#eb7134' }}>Privacy Policy</span></p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onClick}
            >
              Sign Up
          </Button>
          </Grid>
          <Grid item >
            <Link href="/" style={{ color: 'black' }}>
              <span style={{ marginLeft: -45 }}>Already have an account? Login</span>
            </Link>
          </Grid>
          <br></br>
        </div>
      </Container>
    );
  }
};

export default withSnackbar(withStyles(styles)(Register));
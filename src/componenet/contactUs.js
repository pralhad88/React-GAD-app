import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import { withSnackbar } from 'notistack'
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import axios from 'axios';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(11),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
      },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(1.5, 0, 1),
        backgroundColor: "#eb7134",
        width: 100,
        marginLeft: -30
    },
});


class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    handleChange = (event) => { this.setState({ message: event.target.value }); }

    onClick = () => {
        const { message } = this.state;
        const { loggedInUser } = this.props;


        try {
            payload.append('message', message)
            payload.append('userId', parseInt(loggedInUser.User_ID))
            if (message) {
                axios.post(`${baseUrl}contact_us.php`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then((res) => {

                        if (res.data.status == 1) {
                            this.props.enqueueSnackbar('Messages have been sent!', {
                                variant: 'success', anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                }
                            })

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
                this.props.enqueueSnackbar('Please first write a message!', {
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
            <div>
                <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
                    <center>
                        <Typography variant="h6">
                            Contact us
                            </Typography>
                    </center>
                </AppBar>
                <Container>
                    <div className={classes.paper}>
                        <p style={{ color: '#eb7134', marginLeft: 15 }}>
                            you can contact us on -
                        </p>
                        <Grid container style={{ width: 60, marginRight: 115 }}>
                            <Grid item xs={6}>
                                <EmailIcon />
                            </Grid>
                            <Grid item xs={6}>
                                <a className="mailto" href="mailto:admin@navisionltd.com">
                                    <span style={{}}>    admin@navisionltd.com</span>
                                </a>
                            </Grid>
                        </Grid>
                        <h4 style={{ marginBottom: 20, marginTop: 29 }}><span className='orlogin'>OR</span></h4>

                            <Typography component="h6" variant="h6" style={{ color: '#eb7134', cursor: 'pointer', marginTop: 20, marginBottom: 20 }}>
                                Contact us directly
                            </Typography>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message Us"
                                multiline
                                rows="10"
                                variant="outlined"
                                style={{ marginBottom: 20 }}
                                onChange={this.handleChange}
                                value={this.state.Message}
                                className={classes.textField}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.onClick}
                            >
                                Send
                    </Button>
                    </div>
                </Container>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    loggedInUser: state.auth.loggedInUser
});
export default withSnackbar(withStyles(useStyles)(connect(mapStateToProps, undefined)(ContactUs)));

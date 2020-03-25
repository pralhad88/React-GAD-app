
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import { withSnackbar } from 'notistack'
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';

const baseUrl = process.env.API_URL;
const payload = new FormData();

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
        width: 100,
        marginLeft: -30
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        maxWidth: 250,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
});


class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Email: '',
        };
    }



    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography style={{ marginLeft:63 }} variant="h6" color="inherit">
                            Contact Us
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid item>
                        <p style={{ color: '#eb7134', marginLeft: 20, marginBottom: 20,marginTop:30 }}>
                            you can contact us on -
                    </p>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container item>
                            <Grid item xs={3}>
                                <span style={{ marginBottom: 40, marginRight: -78 }}><EmailIcon /></span>
                            </Grid>
                            <Grid item xs={3}>
                                <span>admin@navisionltd.com</span>
                            </Grid>
                        </Grid>
                    </Grid>


                    <h4 style={{ marginBottom: 40}}><span className='orlogin'>OR</span></h4>

                    <Grid item>
                        <Typography component="h6" variant="h6" style={{ color: '#eb7134', cursor: 'pointer' , marginTop:20,marginBottom:20 }}>
                            Contact us directly
                            </Typography>
                    </Grid>

                    <Grid item>
                        <Typography  style={{ color: 'red',marginBottom:210}}>
                            Message Us ...
                            </Typography>

                    </Grid>

                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.onClick}
                        >
                            Send
                                </Button>
                    </Grid>


                </div>

            </Container >
        );
    }
};

export default withSnackbar(withStyles(styles)(ContactUs));
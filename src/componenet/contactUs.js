import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import { withSnackbar } from 'notistack'
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

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
<<<<<<< HEAD

=======
   
>>>>>>> 2a209780af63dfdaca62de2319d6b86ef5d1f759
});


class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.paper}>
                <AppBar position="static" style={{ height: 40 }}>
                    <Toolbar>
                        <center>
                            <Typography variant="h6" style={{ marginTop: -27 }}>
                                Contact us
                            </Typography>
                        </center>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

export default withSnackbar(withStyles(styles)(ContactUs));
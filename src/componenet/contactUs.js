
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
                <AppBar position="fixed" style={{ marginTop:56,height: 40, backgroundColor: "rgb(235, 113, 52) "}}>
                        <center>
                            <Typography variant="h6">
                                Contact us
                            </Typography>
                        </center>
                </AppBar>
                <Container>
                <div className={classes.paper}>


                <Grid item>
                    <p style={{ color: '#eb7134', marginLeft: 20, marginBottom: 20, marginTop: 30 }}>
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

                <h4 style={{ marginBottom: 20, marginTop: 29 }}><span className='orlogin'>OR</span></h4>

                <Grid item>
                    <Typography component="h6" variant="h6" style={{ color: '#eb7134', cursor: 'pointer', marginTop: 20, marginBottom: 20 }}>
                        Contact us directly
                            </Typography>
                </Grid>

                <Grid item>
                    <TextField id="outlined-basic" label="Message Us" variant="outlined" style={{ marginBottom: 20 }} />

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
                </Container>
            </div>
        );
    }
};

export default withSnackbar(withStyles(styles)(ContactUs));
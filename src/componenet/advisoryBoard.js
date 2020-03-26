import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Profile from '../assets/logo.png';
import Avatar from '@material-ui/core/Avatar';
import Image from 'material-ui-image';

const styles = theme => ({

    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
    },

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    hw: {
        width: 80,
        height: 80,
    }
});

class AdvisoryBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
        };
    }
    render() {
        const { classes } = this.props;

        return (


            <div className={classes.paper}>
                <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
                    <center>
                        <Typography variant="h6">
                            Advisory Board
                            </Typography>
                    </center>
                </AppBar>
                

                <Container>
                    <div className={classes.paper}>

                <Image
                    src={Profile}
                    style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
                    imageStyle={{
                        width: 99,
                        height: 93,
                        top: 37,
                        left: 36,
                    }}
                />
                {/* <Avatar alt="profile" src={Profile} /> */}

                <Grid item>
                    <Typography component="h6" variant="h6" style={{ cursor: 'pointer', marginTop: 3, }}>
                        Board Person Name
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography style={{ color: '#eb7134' }}>
                        About Me
                            </Typography>

                </Grid>
                <Box my={2} style={{ marginTop: -11 }}>
                    <p>Last updated: February 07, 2019
                    Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the gift-a-deed mobile app (the "Service") operated by Navision Limited ("us", "we", or "our").
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                    By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. This Terms & Conditions agreement is licensed by TermsFeed to gift-a-deed.
                        Donors/Fulfiller offer and distribute food at their own risk and responsibility. Gift-a-Deed and none of its employees or management is responsible for food offering and distribution.</p>
                </Box>

                <hr style={{ width: 400, marginTop: -9 }}></hr>
                </div>
                </Container>
            </div>

        );
    }
}
export default withStyles(styles)(AdvisoryBoard);
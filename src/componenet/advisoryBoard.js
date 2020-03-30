import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Profile from '../assets/logo.png';
import Image from 'material-ui-image';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    submit: {
        width: 100,
        color: 'white',
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
    
    handleClose = () => {
        const { dailogClose } = this.props;
        dailogClose()   
    }
    
    render() {
        const { classes, dailogOpen } = this.props;
        return (
            <Fragment>
                <Dialog open={dailogOpen} >
                    <DialogContent>
                        <CssBaseline />
                        <AppBar position='absolute'>
                            <Toolbar>
                                <ArrowBackIcon
                                    onClick={this.handleClose}
                                    style={{ color: 'white', cursor: 'pointer' }}
                                    className={classes.menuButton}
                                />
                                <Typography variant="h6" className={classes.title}>
                                    Advisory Board
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Box my={7}>
                            <Typography style={{ textAlign: 'center' }} component="h1" variant="h6">
                                Advisory Board
                            </Typography>
                            <hr></hr>
                        </Box>
                        <Box my={2} style={{margin: '-45px 0px 10px 170px'}}>
                        <Image
                            src={Profile}
                            style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
                            imageStyle={{
                                width: 150,
                                height: 150,
                                left:10
                            }}
                        />
                        {/* <Avatar alt="profile" src={Profile} /> */}
                        <Typography component="h6" variant="h6" style={{ cursor: 'pointer'}}>
                            Board Person Name
                        </Typography>
                        </Box>
                        <Box my={2} >
                        <Typography variant="h6" > About Me </Typography>
                            <p>Last updated: February 07, 2019
                            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the gift-a-deed mobile app (the "Service") operated by Navision Limited ("us", "we", or "our").
                            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. This Terms & Conditions agreement is licensed by TermsFeed to gift-a-deed.
                            Donors/Fulfiller offer and distribute food at their own risk and responsibility. Gift-a-Deed and none of its employees or management is responsible for food offering and distribution.</p>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Fragment >
        );
    }
}
export default withStyles(styles)(AdvisoryBoard);
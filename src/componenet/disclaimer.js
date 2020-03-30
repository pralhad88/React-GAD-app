import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';

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
});

class Disclaimer extends Component {
    handleClose = () => {
        const { dailogClose } = this.props;
        dailogClose()
    };
    render() {
        const { classes, dailogOpen } = this.props;

        return (
            <Fragment>
                <Dialog open={dailogOpen}>
                    <DialogContent className={classes.root}>
                        <CssBaseline />
                        <AppBar position='absolute'>
                            <Toolbar>
                                <ArrowBackIcon
                                    onClick={this.handleClose}
                                    style={{ color: 'white', cursor: 'pointer' }}
                                    className={classes.menuButton}
                                />
                                <Typography variant="h6" className={classes.title}>
                                    Disclaimer
              </Typography>
                            </Toolbar>
                        </AppBar>
                        <Box my={7}>
                            <Typography style={{ textAlign: 'center' }} component="h1" variant="h6">
                                Disclaimer
              </Typography>
                            <hr></hr>
                        </Box>
                        <Box my={2}>
                            <p>Last updated: August 06, 2017</p>
                            <p>The information contained on gift-a-deed mobile app (the "Service") is for general information purposes only.</p>
                            <p>assumes no responsibility for errors or omissions in the contents on the Service.</p>
                            <p>In no event shall be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.</p>
                            <p>does not warrant that the website is free of viruses or other harmful components.</p>
                            <p>This Disclaimer is licensed by TermsFeed Generator.</p>
                        </Box>
                        <Box my={2}>
                            <Typography variant="h6">External links disclaimer</Typography>
                            <p>gift-a-deed mobile app may contain links to external websites that are not provided or maintained by or in any way affiliated with</p>
                            <p>Please note that the does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
                        </Box>

                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}
export default withStyles(styles)(Disclaimer);
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

class CookiesPolicy extends Component {
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
                Cookies Policy
              </Typography>
              </Toolbar>
            </AppBar>
            <Box my={7}>
              <Typography style={{ textAlign: 'center' }} component="h1" variant="h6">
              Cookies Policy
              </Typography>
              <hr></hr>
            </Box>
            <Box my={2}>
              <p>Last updated: August 06, 2017</p>
              <p>gift-a-deed ("us", "we", or "our") uses cookies on the gift-a-deed mobile app (the "Service"). By using the Service, you consent to the use of cookies.</p>
              <p>Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies. This Cookies Policy is licensed by TermsFeed Generator to gift-a-deed.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">What are cookies</Typography>
              <p>Cookies are small pieces of text sent by your device by a mobile app you visit. A cookie file is stored in your phone and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
              <p>Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">How gift-a-deed uses cookies</Typography>
              <p>When you use and access the Service, we may place a number of cookies files in your web browser.</p>
              <p>We use cookies for the following purposes:</p>
              <p>To enable certain functions of the Service
                We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:
                Essential cookies. We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">What are your choices regarding cookies</Typography>
              <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.</p>
              <p>Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.</p>
              <p>For the Chrome web browser, please visit this page from Google: https://support.google.com/accounts/answer/32050</p>
              <p>For the Internet Explorer web browser, please visit this page from Microsoft: http://support.microsoft.com/kb/278835</p>
              <p>For the Firefox web browser, please visit this page from Mozilla: https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</p>
              <p>For the Safari web browser, please visit this page from Apple: https://support.apple.com/kb/PH21411?locale=en_US</p>
              <p>For any other web browser, please visit your web browser's official web pages.</p>
            </Box>
            
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
export default withStyles(styles)(CookiesPolicy);
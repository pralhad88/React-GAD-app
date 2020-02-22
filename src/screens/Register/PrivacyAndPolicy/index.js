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

class PrivacyAndPolicy extends Component {
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
                  style={{ color: 'white',cursor:'pointer' }}
                  className={classes.menuButton}
                />
                <Typography variant="h6" className={classes.title}>
                  Privacy Policy
              </Typography>
              </Toolbar>
            </AppBar>
            <Box my={7}>
              <Typography style={{ textAlign: 'center' }} component="h1" variant="h6">
                Privacy Policy
            </Typography>
              <hr></hr>
            </Box>
            <Box my={2}>
              <p> Last updated: February 07, 2019</p>
              <p> Navision Limited ("us", "we", or "our") operates the giftadeed mobile app (the "Service"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.</p>
              <p> We will not use or share your information with anyone except as described in this Privacy Policy. This Privacy Policy is licensed by TermsFeed Generator to Gift-a-Deed.</p>
              <p> We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at Gift-a-Deed mobile app.</p>
            </Box>
            <Box my={2}>
              <Typography variant='h6'>Information Collection And Use</Typography>
              <p> While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, phone number, postal address, other information ("Personal Information").</p>
              <p> Considering the fact that the primary purpose of this app is to address <span style={{backgroundColor: 'yellow'}}>humanitarian needs,</span> users can also make use of this app for <span style={{backgroundColor: 'yellow'}}>Emergency situations</span> that endanger life and property. This app uses device features like <span style={{backgroundColor: 'yellow'}}>Messaging, Contacts and Call in emergency situations.</span></p>
            </Box>
            <Box my={2}>
              <Typography variant='h6'>Log Data</Typography>
              <p> We collect information that your mobile sends whenever you visit our service ("Log Data"). This Log Data may include information such as your device’s Internet Protocol ("IP") address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
            </Box>
            <Box my={2}>
              <Typography variant='h6'>Cookies</Typography>
              <p> Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.</p>
              <p> We use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
            </Box>
            <Box my={2}>
              <Typography variant='h6'>Service Providers</Typography>
              <p> We may employ third party companies and individuals to facilitate our Service, to provide the service on our behalf, to perform Service-related services or to assist us in analyzing how our service is used.</p>
              <p> These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. </p>
            </Box>
            <Box my={2}>
              <Typography variant='h6'>Security</Typography>
              <p> The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
            </Box>
            <Box my={2}>
              <Typography variant='h6'>Links To Other Sites</Typography>
              <p> Our service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
              <p> We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
            </Box>
            <Box my={2}>
              <Typography variant='h6'>Children's Privacy</Typography>
              <p> Our service does not address anyone under the age of 13 ("Children").</p>
              <p> We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your Children has provided us with Personal Information, please contact us. If we discover that a Children under 13 has provided us with Personal Information, we will delete such information from our servers immediately.</p>
            </Box>
            <Box my={2}>
              <Typography variant='h6'>Changes To This Privacy Policy</Typography>
              <p> We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
              <p> You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </Box>
            <Box my={2}> 
              <Typography variant='h6'>Contact Us</Typography>
              <p>If you have any questions about this Privacy Policy, please contact us.</p>
            </Box>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
export default withStyles(styles)(PrivacyAndPolicy);
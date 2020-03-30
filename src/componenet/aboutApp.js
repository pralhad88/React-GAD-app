import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
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
  }
});

class AboutApp extends Component {
    handleClose = () => {
      const { dailogClose } = this.props;
      dailogClose()   
    }
    
    render() {
      const { classes, dailogOpen } = this.props;
      return (
        <Fragment>
          <Dialog open={dailogOpen}>
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
                        About App
                </Typography>
                  <ShareIcon />
                </Toolbar>
            </AppBar>
            <Box my={7}>
              <Typography style={{ textAlign: 'center' }} component="h1" variant="h6">
                About App
              </Typography>
              <hr></hr>
            </Box>
            <Box my={2}>
              <p>Last updated: February 07, 2019</p>
              <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the gift-a-deed mobile app (the "Service") operated by Navision Limited ("us", "we", or "our").</p>
              <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
              <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. This Terms & Conditions agreement is licensed by TermsFeed to gift-a-deed.</p>
              <p>Donors/Fulfiller offer and distribute food at their own risk and responsibility. Gift-a-Deed and none of its employees or management is responsible for food offering and distribution.</p>
              <p>Also, Gift-a-Deed and none of its employees or management is responsible for any misuse of SOS feature.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">Accounts</Typography>
              <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
              <p> You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
              <p> You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">Links To Other Apps</Typography>
              <p>Our Service may contain links to third-party mobile apps or services that are not owned or controlled by gift-a-deed.</p>
              <p>gift-a-deed has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party mobile apps or services. You further acknowledge and agree that gift-a-deed shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such mobile apps or services.</p>
              <p> We strongly advise you to read the terms and conditions and privacy policies of any third-party mobile apps or services that you visit.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">Termination</Typography>
              <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              <p> All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
              <p> We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              <p> Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>
              <p> All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">Governing Law</Typography>
              <p>These Terms shall be governed and construed in accordance with the laws of Hong Kong, India, U.K., U.S.A., Singapore without regard to its conflict of law provisions.</p>
              <p> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">Changes</Typography>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 15 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              <p> By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
            </Box>
            <Box my={2}>
              <Typography variant="h6">Contact Us</Typography>
              <p>If you have any questions about these Terms, please contact us.</p>
            </Box>
            </DialogContent>
          </Dialog>
      </Fragment>
    );
  }
}
export default withStyles(styles)(AboutApp);  
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { theme } from '../../theme/theme';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: 250,
    padding: 16
},
});


class ResendLink extends Component {

  handleClose = () => {
      const { dailogClose } = this.props;
      dailogClose();
  };

  resendLink = () => {
    const { email } = this.props;
    payload.append('email', email)
    axios.post(`${baseUrl}resend_link.php`, payload)
    .then((res) => {
      if (res.data.status == 1) {
        this.props.enqueueSnackbar('successfully sent password set and account verification link on your Email address!', {
          variant: 'success', anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          }
        });
      }
    })
  } 

  render() {
    const { classes, dailogOpen, email } = this.props;
    return (
        <Dialog
          open={ dailogOpen }
        >
          <DialogContent className={classes.container}>
            <DialogContentText id="alert-dialog-description">
              A Registration Completion Link has been sent to {email}. Please set your password using that link
            </DialogContentText>
            <Box style={{ height: theme.spacing(1) }} />
            <Grid container item>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.resendLink}
                  >
                    Resend
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.handleClose}
                  >
                    OK
                  </Button>
                </Grid>
              </Grid>
              <Box style={{ height: theme.spacing(2) }} />
          </DialogContent>
        </Dialog>
    );
  }
};

export default withSnackbar(withStyles(styles)(ResendLink));
import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
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
  }
});

class TermsAndConditions extends Component {
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
          <AppBar>
            <Toolbar>
              <ArrowBackIcon 
                onClick={this.handleClose}
                style={{ color: 'white' }}
                className={classes.menuButton}  
              />
              <Typography variant="h6" className={classes.title}>
              Terms and Conditions
              </Typography>
            </Toolbar>
          </AppBar>
          <Box my={2}>
            <Typography style={{ textAlign: 'center' }} component="h1" variant="h6">
              Terms and Conditions
            </Typography>
            <hr></hr>
          </Box>

          <Container>
            <Box my={2}>
              {[...new Array(22)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
                      Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                      Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')}
            </Box>
          </Container>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
export default withStyles(styles)(TermsAndConditions);
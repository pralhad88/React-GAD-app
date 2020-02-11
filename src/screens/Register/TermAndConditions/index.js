import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
    };
  }

  handleClose = () => {
    const { history } = this.props;
    this.setState({
      modalOpen: false
    })
    history.push("/");
  };
  render() {
    const { classes } = this.props;
    
return (
    <Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
        <ArrowBackIcon onClick={this.handleClose} style={{ color: 'white' }} />
        <Typography variant="h6">Terms and Conditions</Typography>
        </Toolbar>
      </AppBar>
      
      <Toolbar id="back-to-top-anchor" />

      <Box my={2}>
        <Typography className="underline_terms" style={{ textAlign: 'center' }} component="h1" variant="h6">Terms and Conditions("Terms")</Typography>
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
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top" style={{backgroundColor: '#fc3903' }}>
          <KeyboardArrowUpIcon style={{color: 'white'}}/>
        </Fab>
      </ScrollTop>
      
      </Fragment>
  );
}
}

export default TermsAndConditions;
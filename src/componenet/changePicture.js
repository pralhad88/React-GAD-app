import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Camera from 'react-camera';
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
    width: 250,
  },
  preview: {
    position: 'relative',
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
  },
  captureButton: {
    backgroundColor: 'red',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    marginBottom: 141,
    marginLeft: 290,
  },
  captureImage: {
    width: '14%',
  }
});

class ChangePicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraOpen: false,
      img: true,
    }
  }
  cameraApp = () => {
    this.setState({
      cameraOpen: true
    })
  }

  imageUrl = (evebt, imageUrl) => {
    const { profileChange } = this.props;
    profileChange(imageUrl)
  }

  takePicture = () => {
    this.camera.capture()
      .then(blob => {
        this.img.src = URL.createObjectURL(blob);
        this.img.onload = () => { URL.revokeObjectURL(this.src); }
        this.setState({
          cameraOpen: false,
          img: false,

        })
      })
  }
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
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            // onClick={this.cameraApp}
            >
              Take phote
                  </Button>
            <hr></hr>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            // onClick={this.handleClose}

            >
              Select from Gallery
                  </Button>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
export default withStyles(styles)(ChangePicture);
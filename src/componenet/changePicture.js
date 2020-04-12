import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Camera from 'react-camera';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  submit: {
    maxWidth: 600,
    color: "black",
    backgroundColor: "white",
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
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000'
  },
  captureImage: {
    width: '14%',
  }
});

function buildFileSelector() {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

class ChangePicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraOpen: false,
      loading: false,
    }
  }

  cameraApp = () => {
    this.setState({
      cameraOpen: true
    })
  }

  takePicture = () => {
    const { profileChange } = this.props;
    this.camera.capture()
      .then(blob => {
        const imgURL = URL.createObjectURL(blob);
        this.setState({
          cameraOpen: false
        })
        profileChange(imgURL)
      })
  }

  handleClose = () => {
    const { profileChange } = this.props;
    this.setState({
      cameraOpen: false
    })
    profileChange('')
  };
  uploadImage = async e => {
    const files = e.target.files;
    data.append("Image", files[0]);
    data.append("name", "swati18");
    this.setState({
      loading: true
    });
    const res = axios.post(`${baseUrl}saveimg.php`, data)
    const file = await res.json();
    this.setState({
      image: file.secure_url
    });
    console.log(file.secure_url, "swwati");
    this.setState({
      loading: false
    });
  };

  componentDidMount() {
    this.fileSelector = buildFileSelector();
  }

  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();

  }

  render() {
    const { classes, dailogOpen } = this.props;
    return (
      <Fragment>
        <Dialog open={dailogOpen}>
          <DialogContent className={classes.root}>
            <CssBaseline />
            {this.state.cameraOpen &&
              <Camera
                className={classes.preview}
                ref={(cam) => {
                  this.camera = cam;
                }}
              >
              </Camera>}
            {this.state.cameraOpen && <div><Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.takePicture}
            >
              Click Picture
              </Button>
              <hr></hr>
            </div>
            }
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.cameraApp}
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
              onClick={this.handleFileSelect}
            >
              Select from Gallery
            </Button>
            <hr></hr>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.handleClose}
              className={classes.submit}
            >
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
export default withStyles(styles)(ChangePicture);
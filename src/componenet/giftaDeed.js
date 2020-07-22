import PhotoIcon from '@material-ui/icons/Photo';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Camera from 'react-camera';
import CameraIcon from '@material-ui/icons/Camera';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import logo from '../assets/logo.png';
import Image from 'material-ui-image';

import Toolbar from '@material-ui/core/Toolbar';
import { Box } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { theme } from '../theme/theme';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        marginTop: theme.spacing(13),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(3, 1, 1),
        backgroundColor: "#eb7134",
        width: 145
    },

    takePicture: {
        width: 160
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: "white",
        padding: 10,
        marginBottom: -12,
    },
    preview: {
        position: 'relative',
    },

    captureButton: {
        backgroundColor: 'gainsboro',
        borderRadius: '50%',
        height: 85,
        width: 85,
        cursor: 'pointer'
    },
    captureImage: {
        width: '50%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        minWidth: 200,
        padding: 16
    },
});


class GiftaDeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cameraOpen: false,
            img: true,
            count: 1,
            textMessage: '',
            deedFulComletely: true,
            modalOpen: false,
            isFullFilled: true,
        }

        this.data = [
            { title: 'All', id: 1 },
            { title: 'Food', id: 2 },
            { title: 'Clothes', id: 3 },
            { title: 'Shelter', id: 4 },
            { title: 'Water', id: 5 },
            { title: 'Medical Emergency', id: 6 },
            { title: 'Books/Toys', id: 7 },
            { title: 'Live Update-Coronavirus', id: 8 },
            { title: 'Medical Supplies', id: 9 },
            { title: 'Live Update-Fire', id: 10 },
            { title: 'Live Update-Accident', id: 11 },
            { title: 'Groceries', id: 12 },
        ]
    }

    cameraApp = () => {
        this.setState({
            cameraOpen: true
        })
    }

    handelchange = ( event ) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
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

    searchLocation = () => {
        console.log("access google services here")
    }

    giftNow = () => {
        // Call API to gift page.
    }
    
    decrement = () => {
        if(this.state.count > 1) {
            this.setState({
                count: this.state.count - 1
            })
        }
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    handelOpen = () => {
        this.setState({
            modalOpen: true
        });
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div >
                <AppBar position="fixed" style={{ marginTop: 56, height: 40, backgroundColor: "rgb(235, 113, 52) " }}>
                    <center>
                        <Typography variant="h6">
                            Gift a Deed
            </Typography>
                    </center>
                </AppBar>
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        {this.state.cameraOpen &&
                            <Camera
                                className={classes.preview}
                                ref={(cam) => {
                                    this.camera = cam;
                                }}
                            >
                            </Camera>
                        }
                        {this.state.cameraOpen && <CameraIcon
                            className={classes.captureButton}
                            onClick={this.takePicture}
                        >
                        </CameraIcon>}
                        {this.state.img &&
                            <PhotoIcon style={{ height: 100, width: 100, color: "gray" }} />
                        }
                        <img
                            className={classes.captureImage}
                            ref={(img) => {
                                this.img = img;
                            }}
                        />
                        <Button
                            onClick={this.cameraApp}
                            variant="contained"
                            className={classes.button}
                            startIcon={<CameraAltIcon />}
                        >
                            Take Picture
            </Button>
                        <Grid container spacing={1} style={{ marginTop: 35 }}>
                            <Grid item container xs={12}>
                                <Grid item xs={6}>
                                    <Typography>
                                        Is this deed fulfilled completely?
                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormGroup style={{ marginTop: -6, marginLeft: 100 }} >
                                        <Typography>
                                        <FormControlLabel
                                            control={<Switch checked={this.state.isFullFilled} color="primary" aria-label="login switch" onClick={() => {
                                                this.setState({
                                                    isFullFilled: !this.state.isFullFilled
                                                })
                                            }} />}
                                        />
                                         { this.state.isFullFilled ? "Yes" : "No"}
                                        </Typography>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={4}>
                                    <Typography style={{ marginTop: 10 }}>
                                        People benefited?  
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} style={{ marginTop: 10 }}>
                                    <InfoIcon />
                                </Grid>
                                <Grid item xs={4} className={classes.root}>
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        <Button style={{ backgroundColor: "#eb7134", color: "white" }} onClick={this.decrement}><RemoveIcon /></Button>
                                        <Button>{this.state.count}</Button>
                                        <Button style={{ backgroundColor: "#eb7134", color: "white" }} onClick={this.increment}><AddIcon /></Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={2} style={{ marginTop: 20, marginRight: -31 }}>
                                    <VolumeUpIcon />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        fullWidth
                                        name="textMessage"
                                        defaultValue={this.state.textMessage}
                                        id="input-with-icon-grid"
                                        label="Tell people about your gift"
                                        onChange={this.handelchange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handelOpen}
                            >
                            submit
                        </Button>
                    </div>
                    <Dialog
          onClose={this.handleClose}
          open={this.state.modalOpen}
        >
          <DialogContent className={classes.container}>
            <Grid container item spacing={2}>
              <Grid item xs={12}>
                <Toolbar style={{ backgroundColor: '#eb7134', height: 30, position: 'static', minHeight: 50 }}>
                  <Image
                    color="inherit"
                    src={logo}
                    style={{ height: -70, width: -120, paddingTop: 0 }}
                    imageStyle={{ height: 50, width: 80, left: 90 }}
                  />
                </Toolbar>
                <Box style={{ height: theme.spacing(4) }} />
                <center>
                <Typography component="h1" variant="h5">Do you really want to post?</Typography>
                </center>
                <Box style={{ height: theme.spacing(1) }} />
                <Grid container item >
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={this.giftNow}
                      className={classes.submit}
                    >
                      Yes
                      </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={this.handleClose}
                      className={classes.submit}
                    >
                      No
                      </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
                </Container>
            </div>
        );
    }
}

export default withSnackbar(withStyles(useStyles)(GiftaDeed)); 
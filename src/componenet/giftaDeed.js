import PhotoIcon from '@material-ui/icons/Photo';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Camera from 'react-camera';
import CameraIcon from '@material-ui/icons/Camera';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
        marginTop: theme.spacing(10),
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
        margin: theme.spacing(3, 0, 1),
        backgroundColor: "#eb7134",
        width: 150
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
    }
});


class GiftaDeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cameraOpen: false,
            img: true,
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
                                <Grid xs={6}>
                                    <FormGroup style={{ marginTop: -6, marginLeft: 100 }} >
                                        <Typography>
                                            <FormControlLabel
                                                control={<Switch style={{ color: "#eb7134" }} aria-label="login switch" />}
                                            />
                                        yes
                                        </Typography>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={4}>
                                    <Typography style={{ marginTop: 10 }}>
                                        People benefited
                            </Typography>
                                </Grid>
                                <Grid item xs={4} style={{ marginTop: 10 }}>
                                    <InfoIcon />
                                </Grid>
                                <Grid item xs={4} className={classes.root}>
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        <Button style={{ backgroundColor: "#eb7134", color: "white" }}><RemoveIcon /></Button>
                                        <Button>1</Button>
                                        <Button style={{ backgroundColor: "#eb7134", color: "white" }}><AddIcon /></Button>
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
                                        id="input-with-icon-grid"
                                        label="Tell people about your gift"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            halfWidth
                            variant="contained"
                            justifyContent='center'
                            color="primary"
                            className={classes.submit}>
                            submit
              </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default withSnackbar(withStyles(useStyles)(GiftaDeed)); 
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import logo from '../assets/logo.png';
import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ImageIcon from '@material-ui/icons/Image';


// import { theme } from '../../theme/theme';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';

const baseUrl = process.env.API_URL;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
const payload = new FormData();

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 1),
        backgroundColor: "#eb7134",
        // marginLeft: 60,
        width: 150
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },

    },
    mr:{
        margin: theme.spacing(1),
    }

});

class EditDeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
        };
        // toggleChecked = () => {
        //     this.setState({
        //       checked: !this.state.checked,
        //     })
        //   }
    }
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper} style={{logo}}>
                    <div className={classes.root}>
                        <Avatar alt="profile" src={logo} />
                        {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
                    </div>
                    {/* <Image
                        src={logo}
                        style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
                        imageStyle={{ height: 120, width: 140, left: 13, top: 15 }}
                    /> */}
                    <Typography component="h1" variant="h5">
                        Uplaod Picture
                <hr></hr>
                    </Typography>
<Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* <Box style={{ height: theme.spacing(1) }} /> */}
                            <Grid container item>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit" 
                                        halfWidth
                                        variant="contained"
                                        justifyContent='center'
                                        color="primary"
                                        onClick={this.onClick}
                                        className={classes.submit}>
                                            <CameraAltIcon/>
                                        Snap
                                </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        type="submit"
                                        halfWidth
                                        variant="contained"
                                        justifyContent='center'
                                        color="primary"
                                        onClick={this.handleClose}
                                        className={classes.submit}>
                                            <ImageIcon/>
                                        Browse
                                </Button>
                                </Grid>
                            </Grid>
                            {/* <Box style={{ height: theme.spacing(2) }} /> */}
                        </Grid>
                    </Grid>
                    <Typography>
                        <p>
                            Select C...
                        </p>
                    </Typography>
                    <Autocomplete
                        id="disable-portal"
                        onChange={this.countryHandleChange}
                        options={this.state.listOfCountry}
                        getOptionLabel={option => option.Cntry_Name}
                        disablePortal
                        renderInput={params => <TextField {...params} label="food" margin="normal" />}
                    />
<FormControlLabel control={<Checkbox checked={this.state.checked}
                    />}
                        //    onChange={this.toggleChecked}
                        label="If you are agree then check here." />
                    <Typography>
                        <p>
                           By logging in, you agree to our ....................
                        </p>
                    </Typography>
                    <Typography>
                        <p>
                            Select Lo......
                        </p>
                    </Typography>
                    <Typography>
                        <p>
                           By locghjkl ...................................
                        </p>
                    </Typography>

                    <Typography>
                        <h2>
                           Description ...
                        </h2>
                    </Typography>
                    <Typography>
                        <p>
                           By locghjkl...drtyuiuopiiuufdcvhjo7tgyukjb.................frfthgyjhkjkkljhgfde5678iuhj............trdyu8i9opplkjhgfd...
                        </p>
                    </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.onClick}
                    style={{ alignItems:"center",justify:"center"}}>
                Post
                </Button>
                </div>

            </Container>

        );
    }
}
export default withSnackbar(withStyles(useStyles)(EditDeed));
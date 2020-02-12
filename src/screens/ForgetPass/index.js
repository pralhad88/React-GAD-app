import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { Grid } from '@material-ui/core';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';
import { theme } from '../../theme/theme';
import logo from '../../assets/logo.png';
import ResendLink from '../ResendLink';

const baseUrl = process.env.API_URL;
const payload = new FormData();

const useStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        maxWidth: 500,
    },
    submit: {
        margin: theme.spacing(1.5, 0, 1),
        backgroundColor: "#eb7134",
    }
});

class ForgetPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: true,
            Email: '',
            resendLinkOpen: false
        };
    }

    handleClose = () => {
        const { history } = this.props;
        this.setState({
            dialogOpen: false,
            resendLinkOpen: false,
        })
        history.push("/");
    };

    onChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    onClick = () => {
        const { Email } = this.state
        if (Email) {
            payload.append('Email', Email)
            try {
                axios.post(`${baseUrl}forgot_pass.php`, payload)
                    .then((res) => {
                        const [checkstatus] = res.data.checkstatus;
                        if (checkstatus.status == 1) {
                            const { history } = this.props
                            this.props.enqueueSnackbar('Check your email for password!', {
                                variant: 'success', anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                }
                            });
                            history.push('/')
                        } else if (checkstatus.status == 2) {
                            this.setState({
                                resendLinkOpen: true
                            })
                        } else if (checkstatus.status == 3) {
                            this.props.enqueueSnackbar('Email address not found!', {
                                variant: 'error', anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                }
                            });
                        } else if (checkstatus.status == 0) {
                            this.props.enqueueSnackbar('Internal server error!', {
                                variant: 'error', anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                }
                            });
                        }
                    })
            } catch (e) {
                
            }
        } else {
            this.props.enqueueSnackbar('Please enter you valid email address!', {
                variant: 'error', anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Dialog
                    open={this.state.dialogOpen}
                >
                    <DialogContent className={classes.container}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Toolbar style={{ backgroundColor: '#eb7134', height: 30, position: 'static', minHeight: 50 }}>
                                    <Image
                                        color="inherit"
                                        src={logo}
                                        style={{ height: -70, width: -120, paddingTop: 0 }}
                                        imageStyle={{ height: 50, width: 80, left: 37 }}
                                    />
                                </Toolbar>
                                <Box style={{ height: theme.spacing(4) }} />
                                <Typography component="h1" variant="h5">Forget Password?</Typography>
                                <TextField
                                    margin="normal"
                                    // required
                                    fullWidth
                                    id="email"
                                    label="Enter registered email"
                                    name="Email"
                                    value={this.state.Email}
                                    onChange={this.onChange}
                                    autoComplete="Email"
                                    autoFocus
                                />
                                <Box style={{ height: theme.spacing(1) }} />
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
                                            Submit
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
                                            Cancel
                                </Button>
                                    </Grid>
                                </Grid>
                                <Box style={{ height: theme.spacing(2) }} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <ResendLink
                    email={this.state.Email}
                    dailogOpen={this.state.resendLinkOpen}
                    dailogClose={this.handleClose}
                />
            </Fragment>
        );
    }
}

export default withSnackbar(withStyles(useStyles)(ForgetPass));
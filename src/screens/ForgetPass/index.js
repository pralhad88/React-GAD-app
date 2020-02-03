import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { theme } from '../../theme/theme';
import logo from '../../assets/logo.png';

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
    
    // handleChange = (e) => {
    //     console.log("Pralhad", e.target.value)
    //     this.handleClose();
    //     this.setState({
    //         country: e.target.name
    //     });
    // }

    render() {
        const { classes } = this.props;
        return (
        <Fragment>
            <Dialog
                open={this.state.modalOpen}
            >
                <DialogContent className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Toolbar style={{ backgroundColor: '#eb7134', height: 30, position: 'static' }}>
                            <Image
                                color="inherit"
                                src={logo}
                                style={{ height: -70, width: -120, paddingTop: 0 }}
                                imageStyle={{ height: 50, width: 80, top: -10, left: 35 }}
                            />
                        </Toolbar>
                        <Box style={{ height: theme.spacing(4) }} />
                        <Typography component="h1" variant="h5">Forget Password?</Typography>
                        <TextField
                            margin="normal"
                            // required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            // onChange={this.handleChange()}
                            autoComplete="email"
                            autoFocus
                        />
                        <Box style={{ height: theme.spacing(3) }} />
                        <Grid container item>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    halfWidth
                                    variant="contained"
                                    justifyContent='center'
                                    color="primary"
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
        </Fragment>
        );
    }
}

export default withStyles(useStyles)(ForgetPass);
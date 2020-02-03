import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Image from 'material-ui-image';
import Toolbar from '@material-ui/core/Toolbar';
import { theme } from '../../theme/theme';
import logo from '../../assets/logo.png'


const names = [
    'India',
    'Sri lanka',
    'Pakistan',
    'Afganistan',
    'Africa',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const useStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        maxWidth: 500,
    },
    dropdownStyle: {
        backgroundColor: "lightgray" 
      },
    submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#eb7134",
    // marginLeft: 60,
    // width: 150
    },
});

class ListOfCountry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            country: '',
        };
    }

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    };

    handleOpen = () => {
        this.setState({
            modalOpen: true
        })
        // this.props.modalOpen = true
    };
    
    handleChange = (e) => {
        console.log("Pralhad", e.target.value)
        this.handleClose();
        this.setState({
            country: e.target.value
        });
    }
    
    render() {
        const { classes } = this.props;
        return (<Grid item xs={12}>
            <TextField
                fullWidth
                value={this.state.country}
                name="country"
                label="Country"
                type="Country"
                id="country"
                autoComplete="country"
                onClick={this.handleOpen}
            />
            <Dialog
                open={this.state.modalOpen}
            >   <DialogContent className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Toolbar style={{backgroundColor: '#eb7134',height: 30, position:'static'}}>
                            <Image
                            color="inherit"
                            src={logo}
                            style={{  height: -70, width: -120, paddingTop: 0}}
                            imageStyle={{ height: 50, width: 80, top: -10, left: 13 }}
                        />
                        </Toolbar>
                        <Box style={{height: theme.spacing(4)}} />
                        <Select
                            fullWidth
                            native
                            value={this.state.country}
                            name="value"
                            onChange={this.handleChange}
                    >       <option>Select Country</option>
                            {names.map(name => (
                            <option key={name} value={name}>
                                {name}
                                </option>
                            ))}
                        </Select>
                        <Box style={{height: theme.spacing(1)}} />
                        <Button 
                            fullWidth
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.submit}
                            onClick={this.handleClose}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                </DialogContent>
            </Dialog>
        </Grid>
        );
    }
}   

export default withStyles(useStyles)(ListOfCountry);
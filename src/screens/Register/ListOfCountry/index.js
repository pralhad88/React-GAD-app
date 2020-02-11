import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { InputAdornment, withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Image from 'material-ui-image';
import Toolbar from '@material-ui/core/Toolbar';
import Spinner from 'react-spinner-material';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { theme } from '../../../theme/theme';
import logo from '../../../assets/logo.png'

const baseUrl = process.env.API_URL;

const useStyles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        maxWidth: 250,
    },
    dropdownStyle: {
        backgroundColor: "lightgray"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#eb7134",
        // marginLeft: 60,
        // width: 150
    },
    dropDown: {
        cursor: 'pointer',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 184,
    },
});

class ListOfCountry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            loading: false,
            country: '',
            listOfCountry: []
        };
    }

    fetchCountry = () => {
        try {
            axios.post(`${baseUrl}country_list.php`, {})
                .then((res) => {
                    this.setState({
                        listOfCountry: res.data.countrydata,
                        loading: false,
                        modalOpen: true
                    })
                })
        } catch (e) {
            this.props.enqueueSnackbar('Internal Server Error', { variant: 'error' });
        }
    }
    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    };

    handleOpen = async () => {
        this.setState({
            loading: true,
        })
        await this.fetchCountry();
    };

    handleChange = (e) => {
        const { country_Id } = this.props;
        const country = JSON.parse(e.target.value);
        country_Id(country.Cntry_ID)
        this.handleClose();
        this.setState({
            country: country['Cntry_Name']
        });
    }

    render() {
        const { classes } = this.props;
        return (<Grid item xs={12} >
            <TextField
                fullWidth
                value={this.state.country}
                name="country"
                label="Country"
                type="Country"
                id="country"
                autoComplete="country"
                onClick={this.handleOpen}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <ArrowDropDownIcon
                                className={classes.dropDown}
                                onClick={this.handleOpen}
                                color='primary'
                                fontSize='large'
                            />
                        </InputAdornment>
                    ),
                }}
            />
            <Dialog
                open={this.state.loading}
            >
                <DialogContent className={classes.container}>
                    <Spinner size={35} spinnerColor={"green"} spinnerWidth={5} visible={this.state.loading} />
                </DialogContent>
            </Dialog>
            <Dialog
                open={this.state.modalOpen}
            >   <DialogContent className={classes.container} >
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Toolbar style={{ backgroundColor: '#eb7134', height: 30, position: 'static', minHeight: 50 }}>
                                <Image
                                    color="inherit"
                                    src={logo}
                                    style={{ height: -70, width: -120, paddingTop: 0 }}
                                    imageStyle={{ height: 50, width: 80, left: 38 }}
                                />
                            </Toolbar>
                            <Box style={{ height: theme.spacing(4) }} />
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Select Country
                                </InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name='value'
                                    onChange={this.handleChange}
                                    labelWidth={105}
                                >
                                    {this.state.listOfCountry.map((country, index) => (
                                    <MenuItem key={index} value={JSON.stringify(country)} >
                                        {country.Cntry_Name}
                                    </MenuItem>
                                ))}   
                                </Select>
                            </FormControl>
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

export default withSnackbar(withStyles(useStyles)(ListOfCountry));
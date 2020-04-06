import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Spinner from 'react-spinner-material';


const baseUrl = process.env.API_URL;
const payload = new FormData();

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
        const formData = new FormData();
        try {
            axios.post(`${baseUrl}country_list.php`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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

            <Dialog
                open={this.state.loading}
            >
                <DialogContent className={classes.container}>
                    <Spinner size={35} spinnerColor={"green"} spinnerWidth={5} visible={this.state.loading} />
                </DialogContent>
            </Dialog>
            <InputLabel id="demo-simple-select-outlined-label" style={{ marginBottom: 10 }}>
                Select Category
            </InputLabel>
            <Select style={{ marginBottom: 99 }}
                onClick={this.handleOpen}
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
        </Grid>
        );
    }
}

export default withSnackbar(withStyles(useStyles)(ListOfCountry));
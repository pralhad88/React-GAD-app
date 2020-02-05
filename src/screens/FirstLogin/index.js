import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Image from 'material-ui-image';
import Typography from '@material-ui/core/Typography';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import logo from '../../assets/logo.png'
const animatedComponents = makeAnimated();


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

});




class FirstLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Country: '',
            State: '',
            City: '',
        };
    }

    onChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    onClick = () => {
        console.log("testing")
    }


    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs" style={{ padding: -100 }}>
                <CssBaseline />
                <div className={classes.paper} style={{}}>
                    <Image
                        src={logo}
                        style={{ height: 140, width: 175, paddingTop: 0, backgroundColor: 'none' }}
                        imageStyle={{ height: 120, width: 165 }}
                    />
                    <Typography component="h1" variant="h5">
                        First Login
                        <hr></hr>
                    </Typography>
                    <InputLabel className={"firstloginLable"}>Country</InputLabel>
                    <Select
                        className={"filterSelectGlobal"}
                        onChange={this.changeStudentStage}
                        options={[{ value: "requestCallback", label: "Request Callback" },
                        { value: "softwareCourse", label: "Other Data" }]}
                        placeholder={"Select Country..."}
                        isClearable={false}
                        components={animatedComponents}
                        closeMenuOnSelect={true}
                    />
                    <InputLabel className={"firstloginLable"}>State</InputLabel>
                    <Select
                        className={"filterSelectGlobal"}
                        onChange={this.changeStudentStage}
                        options={[{ value: "requestCallback", label: "Request Callback" },
                        { value: "softwareCourse", label: "Other Data" }]}
                        placeholder={"Select State..."}
                        isClearable={false}
                        components={animatedComponents}
                        closeMenuOnSelect={true}
                    />
                    <InputLabel className={"firstloginLable"}>City</InputLabel>
                    <Select
                        className={"filterSelectGlobal"}
                        onChange={this.changeStudentStage}
                        options={[{ value: "Jalgaon", label: "Request Callback" },
                        { value: "Bihar", label: "Other Data" }]}
                        placeholder={"Select City..."}
                        isClearable={false}
                        components={animatedComponents}
                        closeMenuOnSelect={true}
                    />
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
                </div>
            </Container>
        );
    }
}


export default withStyles(useStyles)(FirstLogin);
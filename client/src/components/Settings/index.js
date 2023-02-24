// --------------------------------------------------- \/ Imports

import React from 'react';

import {
    Typography,
    TextField,
    makeStyles,
    Button,
    Grid,
    Box,
    Tabs,
    Tab,
    Switch
} from '@material-ui/core';


// --------------------------------------------------- /\ Imports
// --------------------------------------------------- \/ Styles

const useStyles = makeStyles((theme) => {
    return {
        page: {
            backgroundColor: 'lightgrey',
            backgroundSize: 'cover',
            opacity: 0.9,
            minHeight: 'calc(100vh - 60px)',
            paddingTop: '90px'
        },
    }
})


// Validation parameters
const validation_init = {
    "display_name": false,
    "user_id": false,
    "bio": false,
    "username": false,
    "password": false,
    "email": false,
    "year": false,
    "program": false
}


export default function Settings() {
    const classes = useStyles();

    // Temporary JSON file to simulate database
    const init_data = require('../../user.json');

    // State variable for storing user data
    const [data, changeData] = React.useState(init_data);

    // State variable for storing validation check parameters (by default they're all false)
    const [validate, invalidate] = React.useState(validation_init);

    // Tabber toggles
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    // Update user account information
    const handleSubmit = (e) => {

        const userInput = document.getElementById(e.target.id + '_info').value

        // Validation checks
        if (userInput.trim() === "") {
            validate[e.target.id] = true
            invalidate({ ...validate })

        } else {
            validate[e.target.id] = false
            invalidate({ ...validate })

            // Input: Array (interests)
            if (e.target.id === 'interests') {
                data[e.target.id] = userInput.split(', ')
            } else {
                data[e.target.id] = userInput
            }
        }
        changeData({ ...data })

    }

    const handleSwitch = (e) => {
        // Input: Switches (private/searchable)
        data[e.target.id] = document.getElementById(e.target.id).checked
        changeData({ ...data })
    }


    // For input fields iwht text values
    const InputField = (props) => {
        return (
            <Grid container spacing={2} style={{ padding: '10px 40px 10px 40px' }}>
                <Grid item xs={3}>
                    <Typography style={{ marginTop: '5px', textAlign: 'right' }}>
                        {props.field}
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        label={props.label}
                        placeholder={"Enter new " + props.field.toLowerCase()}
                        variant="outlined"
                        helperText={validate[props.id] ? "This field cannot be blank" : ""}
                        error={validate[props.id]}
                        id={props.id + '_info'}
                        style={{ width: "300px" }}
                        multiline minRows={props.paragraph ? 5 : 1}
                        fullWidth
                        size="small" />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        id={props.id}
                        onClick={handleSubmit}
                        style={{ float: 'right', marginLeft: '50px' }}
                        color="primary">
                        Change
                    </Button>
                </Grid>

            </Grid>
        )
    }


    // For input fields with true/false values (ie. private/searchable)
    const SwitchField = (props) => {
        return (
            <Grid container spacing={2} style={{ padding: '10px 40px 10px 40px' }}>
                <Grid item xs={9}>
                    <Typography style={{ marginTop: '5px', textAlign: 'right' }}>
                        {props.field}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Switch
                        defaultChecked={props.toggled}
                        onChange={handleSwitch}
                        color='primary'
                        id={props.id} />
                </Grid>
            </Grid >
        )
    }

    return (

        <Box
            sx={{ flexGrow: 1, display: 'flex', height: 224 }}
            className={classes.page}>

            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                style={{ backgroundColor: 'white', paddingTop: '40px', marginTop: '-30px' }}
                sx={{ borderRight: 1, borderColor: 'divider' }}>
                <Tab label="General" />
                <Tab label="Account" />
                <Tab label="Privacy" />
            </Tabs>

            {/* Settings for General (Public information) */}
            {/* Display Name, Bio, Program, Academic Year, Interests */}
            <TabPanel value={value} index={0}>

                <InputField field={"Display Name"} label={data.display_name} id={'display_name'} />
                <InputField field={"Program"} label={data.program} id={'program'} />
                <InputField field={"Academic Year"} label={data.year} id={'year'} />
                <InputField field={"Bio"} label={data.bio} id={'bio'} paragraph />
                <InputField field={"Interests"} label={data.interests.join(', ')} id={'interests'} paragraph />

            </TabPanel>

            {/* Settings for Account information */}
            {/* User ID, Username, Password, Email */}
            <TabPanel value={value} index={1}>

                <InputField field={"User ID"} label={data.user_id} id={'user_id'} />
                <InputField field={"Username"} label={data.username} id={'username'} />
                <InputField field={"Password"} label={data.password} id={'password'} />
                <InputField field={"Email"} label={data.email} id={'email'} />

            </TabPanel>

            {/* Settings for Privacy */}
            {/* Hide name from search, Private account */}
            <TabPanel value={value} index={2}>

                <SwitchField field={"Private Account"} toggled={data.private} id={'private'} />
                <SwitchField field={"Searchable Account"} toggled={data.searchable} id={'searchable'} />

            </TabPanel>

        </Box >
    );
}


function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div>
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

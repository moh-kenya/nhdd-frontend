const { TextField } = require("@mui/material")

// {
//     "username": "johnnydoe",
//     "name": "Johnny Doe",
//     "email": "jdoe@me.com",
//     "company": "My New Company",
//     "location": "Eldoret, Kenya",
//     "preferred_locale": "en,sw",
//     "website": "http://mydomain.me/",
//     "extras": { "my-field": "my-value" }
// }

function RequestUserCreation(params) {
    return (
        <div>
            <TextField label='Username' variant="outlined" margin="normal" fullWidth required={true} />
            <TextField label='Full Name' variant="outlined" margin="normal" fullWidth required={true} />
            <TextField label='email' variant="outlined" margin="normal" fullWidth required={true} />
            <TextField label='Institution/Organisation' variant="outlined" margin="normal" fullWidth required={true} />
            <TextField label='location' variant="outlined" margin="normal" fullWidth required/>
            <TextField label='Prefered Language' variant="outlined" margin="normal" fullWidth required={true} />
            <TextField label='Website' variant="outlined" margin="normal" fullWidth required={false} />
            <TextField label='Phone Number' variant="outlined" margin="normal" fullWidth required={false} />

        </div>
    )
}

export default RequestUserCreation;
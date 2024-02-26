import { Typography, Link } from "@mui/material"
function Copyright(props) {
    return(
        <Typography variant='body2' color="text.secondary" align='center' {...props}>
            {'Copyright © '}{' '}{new Date().getFullYear()}{'. '}
            <Link color="inherit" href="https://www.health.go.ke/">
            Ministry of Health
            </Link>
        </Typography>
    )
}
export default Copyright
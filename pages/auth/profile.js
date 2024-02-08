import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Person from '@mui/icons-material/Person';
import { Divider } from '@mui/material';

export default function mainListItemw({user}) {
    
    return (
      <Card sx={{ maxWidth: 230 }}>
        {/* <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        /> */}
        <PersonIcon sx={{fontSize: 200, flexDirection: 'row'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {user?.first_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {user?.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Company: {user?.company}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Status: {user?.status}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit Profile</Button>
          {/* <Button size="small">Date</Button> */}
        </CardActions>
      </Card>
    );
  }
import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}
const API_BASE_URL  = 'http://41.89.92.186:8000/users/'
export default function Deposits() {

  const [data, setData] = React.useState([])
  React.useEffect(()=>{
    fetch(API_BASE_URL).then((res)=>{
      return res.json()
  })
  .then((data)=>{
      setData(data)
  })
  },[])
 
  return (
    <React.Fragment>
       <Title>Total Users</Title>
      <Typography component="p" variant="h4" align='center'>
        {Object.keys(data).length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      Date: {new Date().toISOString().split('T')[0] }
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View more Statistics
        </Link>
      </div> 
    </React.Fragment>
  );
}
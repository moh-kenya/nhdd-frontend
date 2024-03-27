// pages/user-profile.js
import React from 'react';
import { Avatar, Button, Sheet, Typography, Textarea, Grid } from '@mui/joy';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const TOKEN = Cookies.get("token") || "";

const UserProfile = () => {
   const router = useRouter();
   const { username } = router.query;
   const [user, setUser] = useState(null);
   
  useEffect(() => {
    
    if (username && TOKEN) {
      fetch(`${API_BASE_URL}/users/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`, // Include the Bearer token in the Authorization header
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => console.error('There was a problem with your fetch operation:', error));
    }
  }, [username]);

  if (!user) return <div>Loading...</div>;

  return (
    <Grid container spacing={2} sx={{ maxWidth: 'lg', m: 'auto', p: 2 }}>
      <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar src="/path/to/user/avatar.jpg" sx={{ width: 300, height: 300 }} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Sheet
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
          }}
          variant="outlined"
        >
        <Typography level="h4" component="h1">{user.name}</Typography>
        <Typography level="body2">{user.email}</Typography>
        <Typography>Company: {user.company}</Typography>
        <Typography>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></Typography>
        <Typography>Verified: {user.verified ? "Yes" : "No"}</Typography>
        <Typography>Status: {user.status}</Typography>
        <Typography>Superuser: {user.is_superuser ? "Yes" : "No"}</Typography>
        <Typography>Staff: {user.is_staff ? "Yes" : "No"}</Typography>
        <Typography>Organizations: {user.orgs}</Typography>
        <Typography>Created On: {new Date(user.created_on).toLocaleDateString()}</Typography>
        <Typography>Last Updated: {new Date(user.updated_on).toLocaleDateString()}</Typography>
        <Typography>Last Login: {new Date(user.last_login).toLocaleDateString()}</Typography>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="solid">Verify User</Button>
        </div>
          <Textarea
            placeholder="Add a comment about the user..."
            multiline
            minRows={3}
          />
          <Button variant="outlined">Send Message</Button>
        </Sheet>
      </Grid>
    </Grid>
  );
};

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Tooltip, IconButton, Grid } from '@mui/material';
import { PersonOutline, Business, PeopleAlt, Visibility, VisibilityOff } from '@mui/icons-material'; // Import Material-UI icons

function UserDetailsPage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {setUser(data)
      console.log(data)})
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch user's followers
    fetch(`https://api.github.com/users/${username}/followers`)
      .then(response => response.json())
      .then(data => setFollowers(data))
      .catch(error => console.error('Error fetching followers:', error));
  }, [username]);

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ maxWidth: '600px', width: '100%', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {user.name || user.login}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer"> {/* Anchor tag to make the image clickable */}
                <Avatar src={user.avatar_url} alt={user.login} style={{ width: '200px', height: '200px', margin: 'auto', display: 'block' }} />
              </a>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                <PersonOutline /> <strong>Username:</strong> {user.login}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Business /> <strong>Company:</strong> {user.company || 'N/A'}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <PeopleAlt /> <strong>Followers:</strong> {user.followers}{' '}
                <Tooltip title="Show Followers">
                  <IconButton onClick={toggleFollowers} size="small">
                    {showFollowers ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Tooltip>
              </Typography>
              {showFollowers && (
                <div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {followers.map((follower, index) => (
                      <span key={index}>{follower.login}{index < followers.length - 1 ? ', ' : ''}</span>
                    ))}
                  </Typography>
                </div>
              )}
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>Following:</strong> {user.following}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>Public Repositories:</strong> {user.public_repos}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetailsPage;

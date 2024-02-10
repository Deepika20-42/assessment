import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, Avatar } from '@mui/material';

function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(data => {setUsers(data)
    console.log(data)})
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <>
      <h1 style={{textAlign:'center'}}>User List</h1>
      <div style={{display:'flex', flexWrap: 'wrap', gap:'30px'}}>
      {users.map(user => (
        <Card key={user.id} style={{ marginBottom: '20px', width:'400px' }}>
          <Link to={`/user/${user.login}`}>
            <CardHeader
              avatar={<Avatar src={user.avatar_url} alt={user.login} style={{width: 170, height:170}} />}
              title={user.name || user.login}
              subheader={`@${user.login}`}
            />
            <CardContent>
            </CardContent>
          </Link>
        </Card>
      ))}
      </div> 
    </>
  );
}

export default UserListPage;

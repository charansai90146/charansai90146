import React, { useState, FormEvent } from 'react';
import { FormControl, FormGroup, FormLabel, Form, Button } from 'react-bootstrap';
import { useUser } from './UserContext';


interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

const users: User[] = [
  { id: 1, username: 'user1', password: 'pass1', role: 'Admin' },
  { id: 2, username: 'user2', password: 'pass2', role: 'Hod' },
];

const LoginPage = () => {
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useUser(); 

 
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      
      login({ id: user.id, name: user.username, role: user.role });
      console.log(login,'log')
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15%' }}>
      <Form style={{backgroundColor: 'moccasin', padding: '10px', }} onSubmit={handleLogin}>
        <FormGroup>
          <FormLabel>Login Id</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;

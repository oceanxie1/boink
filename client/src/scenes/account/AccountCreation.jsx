import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

// Define the validation schema using yup
const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
});

const AccountCreation = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateAccount = async (event) => {
        event.preventDefault();

        try {
            // Validate the form data using yup
            await validationSchema.validate({ name, username, email, password }, { abortEarly: false });

            // Create account
            await axios.post('http://localhost:1337/api/auth/local/register', {
                username,
                email,
                password,
                name,
            });

            // Log in after account creation
            const loginResponse = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password: password,
            });

            const { jwt, user } = loginResponse.data;
            sessionStorage.setItem('token', jwt); // Use sessionStorage
            sessionStorage.setItem('user', JSON.stringify(user)); // Use sessionStorage

            // Navigate to home page after login
            navigate('/');
            window.location.reload(); // Reload to ensure navbar updates
        } catch (err) {
            if (err.name === 'ValidationError') {
                const errors = {};
                err.inner.forEach((error) => {
                    errors[error.path] = error.message;
                });
                setValidationErrors(errors);
            } else {
                setError('Error creating account or logging in. Please try again.');
            }
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" mb={3}>Create Account</Typography>
            <form onSubmit={handleCreateAccount}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                />
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    error={!!validationErrors.username}
                    helperText={validationErrors.username}
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    error={!!validationErrors.password}
                    helperText={validationErrors.password}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary">Create Account</Button>
            </form>
        </Box>
    );
};

export default AccountCreation;

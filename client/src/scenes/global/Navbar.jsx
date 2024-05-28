import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Link } from "@mui/material";
import {
    PersonOutline,
    ShoppingBagOutlined,
    MenuOutlined,
    SearchOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from '../../state';
import kkumaShop from "../kkumashop3.png";
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    // Compute the total count of items in the cart
    const totalItemCount = cart.reduce((total, item) => total + item.count, 0);

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState(null); 

    const debouncedNavigate = useCallback(
        debounce((query) => {
            if (query.trim() !== "") {
                navigate(`/search?query=${query}`);
            }
        }, 300), // 300ms debounce time
        [navigate]
    );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        debouncedNavigate(event.target.value);
    };

    const handleSearchToggle = () => {
        if (isSearchVisible) {
            setSearchQuery(""); // Clear the search query when closing the search bar
            navigate("/"); // Navigate to home page
        }
        setIsSearchVisible(!isSearchVisible);
    };

    const handleLoginOpen = () => {
        const token = sessionStorage.getItem('token'); // Use sessionStorage
        const user = JSON.parse(sessionStorage.getItem('user')); // Get user info from sessionStorage
        if (token) {
            setUsername(user.username);
            navigate('/account');
        } else {
            setIsLoginOpen(true);
        }
    };

    const handleLoginClose = () => {
        setIsLoginOpen(false);
        setError('');
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password: password,
            });
            const { jwt, user } = response.data;
            sessionStorage.setItem('token', jwt); // Use sessionStorage
            sessionStorage.setItem('user', JSON.stringify(user)); // Use sessionStorage
            setUsername(user.username); // Set username
            handleLoginClose();
        } catch (error) {
            setError('Invalid login credentials');
        }
    };

    const handleCreateAccountClick = () => {
        handleLoginClose();
        navigate('/create-account');
    };

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setUsername(user.username);
        }
    }, []);

    useEffect(() => {
        return () => {
            debouncedNavigate.cancel(); // Cleanup debounce on unmount
        };
    }, [debouncedNavigate]);

    return (
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="60px"
            backgroundColor="rgba(255, 255, 255 0.95)"
            color="black"
            position="fixed"
            top="0"
            left="0"
            zIndex="1"
        >
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    onClick={() => navigate("/")}
                    sx={{ '&:hover': { cursor: "pointer" }}}
                    color={"white"}
                >
                    <img 
                        src={kkumaShop}
                        alt="Logo"
                        style={{ width: 'auto', height: '100px' }} // Adjust size as needed
                    />
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    columnGap="20px"
                    zIndex="2"
                >
                    {isSearchVisible && (
                        <form>
                            <TextField
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search..."
                                variant="outlined"
                                size="small"
                                sx={{ backgroundColor: "white", borderRadius: "4px" }}
                            />
                        </form>
                    )}
                    <IconButton 
                        sx={{ color: "black" }}
                        onClick={handleSearchToggle}
                    >
                        <SearchOutlined />
                    </IconButton>
                    <Box display="flex" flexDirection="column" alignItems="center" position="relative">
                        <IconButton 
                            sx={{ color: "black" }}
                            onClick={handleLoginOpen}
                        >
                            <PersonOutline />
                        </IconButton>
                        <Typography 
                            variant="body2" 
                            position="absolute" 
                            top="75%" 
                            transform="translateX(-50%)"
                            sx={{ cursor: "pointer" }}
                            onClick={handleLoginOpen}
                        >
                            {username ? username : "log in"}
                        </Typography>
                    </Box>
                    <Badge
                        badgeContent={totalItemCount}
                        color="secondary"
                        invisible={totalItemCount === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px"
                            }
                        }}
                    >
                        <IconButton 
                            onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{ color: "black" }}>
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>
                    <IconButton sx={{ color: "black" }}>
                        <MenuOutlined />
                    </IconButton>
                </Box>
            </Box>
            <Dialog open={isLoginOpen} onClose={handleLoginClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email/Username"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Box mt={2}>
                            <Typography variant="body2">
                                Don't have an account? <Link href="#" onClick={handleCreateAccountClick}>Create one</Link>
                            </Typography>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoginClose}>Cancel</Button>
                    <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Navbar;

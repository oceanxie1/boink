import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton, TextField } from "@mui/material";
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

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    // Compute the total count of items in the cart
    const totalItemCount = cart.reduce((total, item) => total + item.count, 0);

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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
                    <IconButton sx={{ color: "black" }}>
                        <PersonOutline />
                    </IconButton>

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
        </Box>
    );
}

export default Navbar;

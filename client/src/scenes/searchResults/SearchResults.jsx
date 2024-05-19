import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Item from "../../components/Item"; // Adjust the import path as needed
import debounce from 'lodash/debounce'; // Ensure lodash is installed

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const searchQuery = query.get('query');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const fetchItems = useCallback(
        debounce(async (query) => {
            try {
                setLoading(true);
                setError(null);
                const getItemsUrl = `http://localhost:1337/api/items?populate=image&filters[name][$containsi]=${query}`;
                const response = await fetch(getItemsUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setItems(json.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }, 300), // 300ms debounce time
        []
    );

    useEffect(() => {
        if (searchQuery) {
            fetchItems(searchQuery);
        }
    }, [searchQuery, fetchItems]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh" mt={5}>
                <Typography variant="h4" sx={{ fontSize: '2rem' }}>Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh" mt={5}>
                <Typography variant="h4" sx={{ fontSize: '2rem' }}>Error loading data: {error.message}</Typography>
            </Box>
        );
    }

    if (items.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh" mt={5}>
                <Typography variant="h4" sx={{ fontSize: '2rem' }}>No items found for "{searchQuery}"</Typography>
            </Box>
        );
    }

    return (
        <Box width="80%" margin="80px auto">
            <Typography variant="h3" textAlign="center" mb="20px">
                Search Results for "{searchQuery}"
            </Typography>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 400px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {items.map((item) => (
                    <Item item={item} key={`${item.attributes.name}-${item.id}`} width="100%" />
                ))}
            </Box>
        </Box>
    );
};

export default SearchResults;

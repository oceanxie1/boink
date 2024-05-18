import { Box, Button, IconButton, Typography, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const extractText = useCallback((descArray) => {
    return descArray?.map(paragraph => 
        paragraph.children?.map(child => child.text).join(' ')
    ).join('\n') || '';
  }, []);

  useEffect(() => {
    const fetchData = async (url, setState) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setState(json.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const getItemUrl = `http://localhost:1337/api/items/${itemId}?populate=image`;
    const getItemsUrl = `http://localhost:1337/api/items?populate=image`;

    fetchData(getItemUrl, setItem);
    fetchData(getItemsUrl, setItems);
  }, [itemId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading data: {error.message}</Typography>;
  }

  if (!item) {
    return <Typography>No item found</Typography>;
  }

  const itemLongDescription = extractText(item?.attributes?.longDescription);

  const handleAddToCart = () => {
    const itemToAdd = { ...item, count };
    dispatch(addToCart({ item: itemToAdd }));
  };

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          {item?.attributes?.image?.data?.attributes?.formats?.medium?.url && (
            <img
              alt={item?.attributes?.name}
              width="100%"
              height="100%"
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
              style={{ objectFit: "contain" }}
            />
          )}
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>{itemLongDescription}</Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && <div>{itemLongDescription}</div>}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((relatedItem, i) => (
            <Item key={`${relatedItem.name}-${i}`} item={relatedItem} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;

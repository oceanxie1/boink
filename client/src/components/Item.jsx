import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import { darken } from "@mui/system";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { palette: { neutral } } = useTheme();

  const { category, price, name, image } = item.attributes;
  const { url } = image.data.attributes.formats.medium;

  const handleAddToCart = () => {
    dispatch(addToCart({ item: { ...item, count } }));
    setIsAdded(true);
  };

  const buttonColor = isAdded ? "#bb83b0" : shades.primary[300];
  const hoverColor = darken(buttonColor, 0.2); // Darken the color by 20%

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {/* Image of the item */}
        <img
          alt={name}
          width="400px"
          height="400px"
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={handleAddToCart}
              sx={{
                backgroundColor: buttonColor,
                color: "white",
                '&:hover': {
                  backgroundColor: hoverColor, // Use the darker color on hover
                },
              }}
            >
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        {/* Category Name */}
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        {/* Item Name */}
        <Typography>{name}</Typography>
        {/* Item Price */}
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;

import { Box, Typography, IconButton } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";
import { useMediaQuery } from "@mui/material";
import { useMatch } from "react-router-dom";
import logoImage from "../logo.png"

// imports all image from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Box
        color="white"
        padding="20px"
        borderRadius="1px"
        textAlign="left"
        backgroundColor="rgb(0, 0, 0, 0)"
        position="absolute"
        top="20%"
        left={isNonMobile ? "2%" : "0"}
        right={isNonMobile ? undefined : "0"}
        margin={isNonMobile ? undefined : "0 auto"}
        maxWidth={isNonMobile ? undefined : "240px"}
        zIndex={1} // Ensure the box remains on top of the carousel
      >
        <img 
            src={logoImage}
            alt="Logo"
            style={{ width: 'auto', height: '500px' }} // Adjust size as needed
        />
      </Box>

      <Carousel
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              color: "white",
              padding: "5px",
              zIndex: 10, // Ensure the arrows remain on top of the box
            }}
          >
            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0",
              color: "white",
              padding: "5px",
              zIndex: 10, // Ensure the arrows remain on top of the box
            }}
          >
            <NavigateNextIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
      >
        {Object.values(heroTextureImports).map((texture, index) => (
          <img
            key={`carousel-image-${index}`}
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "700px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
        ))}
      </Carousel>
    </>
  );
};

export default MainCarousel;

import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
    const { palette: { neutral }} = useTheme();
    return (
        <Box mt="70px" p="40px 0" backgroundColor="#f9f1f1">
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"
            >
                <Box width="clamp(20px, 30px, 40px)">
                    <Typography 
                        variant="h4" 
                        fontWeight="bold" 
                        mb="30px" 
                        color="black"
                    >
                        KkumaCharms
                    </Typography>
                    <div>
                        I LOVE YOU
                    </div>
                </Box>
                <Box>
                    <Typography
                        variant="h4" 
                        fontWeight="bold" 
                        mb="30px" 
                    >
                        About Us
                    </Typography>
                    <Typography mb="30px">Careers</Typography>
                    <Typography mb="30px">Our Stores</Typography>
                    <Typography mb="30px">Terms & Conditions</Typography>
                    <Typography mb="30px">Privary Policy</Typography>
                </Box>

                <Box>
                    <Typography
                        variant="h4" 
                        fontWeight="bold" 
                        mb="30px" 
                    >
                        Customer Care
                    </Typography>
                    <Typography mb="30px">Help Center</Typography>
                    <Typography mb="30px">Track Your Order</Typography>
                    <Typography mb="30px">Corporate & Bulk</Typography>
                    <Typography mb="30px">Returns & Refunds</Typography>
                </Box>

                <Box width="clamp(20%, 25%, 30%)">
                <Typography
                        variant="h4" 
                        fontWeight="bold" 
                        mb="30px" 
                    >
                        Contact Us
                    </Typography>
                    <Typography mb="30px">Address</Typography>
                    <Typography mb="30px">Email</Typography>
                    <Typography mb="30px">Phone Number</Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default Footer;
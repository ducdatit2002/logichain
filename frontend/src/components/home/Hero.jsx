import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import bgImg from "../../img/bg.png";
import heroImg from "../../img/logo.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#D8EFD3", minHeight: "95vh" }}>
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "2" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 1,
                mb: 4,
              }}
            >

              Welcome to Log!Chain
            </Typography>
            <Title variant="h2" sx={{ fontSize: "45px"}}>
            Reliable Medical Device Tracking - Powered by Solana Blockchain
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Our blockchain platform is designed to identify counterfeit medical devices, thereby enhancing the quality of healthcare for the public.
            </Typography>
            <Link to="/scanner">

              <CustomButton
                backgroundColor="#0F1B4C"
                color="#fff"
                buttonText="Scan QR"
                heroBtn={true}
              />
            </Link>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;

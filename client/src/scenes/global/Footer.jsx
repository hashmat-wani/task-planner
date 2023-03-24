import React from "react";
import { Box, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FlexBox } from "../../components/FlexBox";
import { shades } from "../../theme";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  if (["/"].includes(pathname))
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-between" },
          gap: "10px",
          p: "15px 20px",
          background: shades.secondary[900],
          color: "white",
        }}
      >
        <Typography fontSize="16px" fontFamily="'Noto Serif JP', serif">
          hashtech © 2023
        </Typography>
        <FlexBox gap={4} justifyContent="flex-end">
          <a
            rel="noreferrer"
            href="https://github.com/hashmat-noorani"
            title="github"
            target="_blank"
          >
            <GitHubIcon />
          </a>
          <a
            rel="noreferrer"
            href="https://www.linkedin.com/in/hashmat-noorani/"
            title="Linkedin"
            target="_blank"
          >
            <LinkedInIcon />
          </a>
          <a
            rel="noreferrer"
            href="https://www.facebook.com/hwx.75"
            title="facebook"
            target="_blank"
          >
            <FacebookTwoToneIcon />
          </a>
          <a
            rel="noreferrer"
            href="https://twitter.com/hashmatwani_x"
            title="Twitter"
            target="_blank"
          >
            <TwitterIcon />
          </a>
        </FlexBox>
      </Box>
    );

  return null;
};

export default Footer;

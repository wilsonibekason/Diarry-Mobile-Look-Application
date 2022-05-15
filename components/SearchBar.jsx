import { alpha, styled } from "@mui/material";
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

//-- Global Variables
const APPBAR_MOBILE = 64;
const APPBAR_DESTOP = 92;

const SearchBarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "90%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: APPBAR_MOBILE,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  padding: theme.spacing(0, 3),
  //boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default)}`,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {isOpen && (
          <IconButton onClick={handleOpen}>
            <SearchIcon fontSize="small" />
          </IconButton>
        )}
        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchBarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchBarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}

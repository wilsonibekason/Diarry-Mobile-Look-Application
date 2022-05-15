import { styled } from "@mui/material";
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

const SearchBarStyle = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
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
          </SearchBarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}

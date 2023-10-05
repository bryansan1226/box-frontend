import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    navigate(
      `/searchResults?searchQuery=${searchQuery}&userInfo=${props.userInfo.user_id}`
    );
  };

  return (
    <div>
      <TextField
        label="Search by name or username"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

export default SearchBar;

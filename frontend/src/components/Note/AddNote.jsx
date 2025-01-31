// import React from "react";

// import { Box } from "@mui/material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
const AddNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <Box>
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
        <OutlinedInput
          id="outlined-adornment-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end"></IconButton>
            </InputAdornment>
          }
          label="Title"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        {/* <InputLabel htmlFor="outlined-adornment-description">
          Description
        </InputLabel> */}
        <TextField
          id="outlined-adornment-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4} // You can adjust the number of rows
          variant="outlined"
          label="Description"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">{/* Add any icon here */}</IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Button>Save Note</Button>
    </Box>
  );
};

export default AddNote;

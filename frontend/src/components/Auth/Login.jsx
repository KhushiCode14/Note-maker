import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AuthState } from "../../context/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = AuthState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login(formData);
    navigate("/");
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start", // Aligns content at the top
        alignItems: "center", // Centers horizontally
        height: "100%", // Full viewport height
        padding: { xs: "0", sm: "1rem", md: "1rem", lg: "1rem" },
        gap: "1rem",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginTop: "0",
          marginBottom: "1rem",
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {/* username */}
      {/* <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={"username"}
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                // onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                <PersonIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Username"
        />
      </FormControl> */}
      {/* Email */}
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label={"email"} edge="end">
                <EmailIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Email"
        />
      </FormControl>
      {/* Password */}
      <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button type="submit" disabled={loading}>
        {" "}
        {loading ? "Logging..." : "Login"}
      </Button>
    </Box>
  );
};

export default Login;

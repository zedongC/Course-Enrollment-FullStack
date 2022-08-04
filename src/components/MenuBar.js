import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LoginDialog from "./LoginDialog";
import cookie from "react-cookies";
import {TOKEN_COOKIE_NAME} from "../constant";

export default function MenuBar() {
  const [open, setOpen] = React.useState(false);
  // JS Truthy convert anything to boolean, exist => true, not exist || "" || 0 || undefined => false
  let hasLoggedIn = !!cookie.load(TOKEN_COOKIE_NAME);
  let buttonText = hasLoggedIn ? "Logout" : "Login";

  const handleClickOpen = () => {  //2, it changes the open so we update/rerender again?
    if (hasLoggedIn) {
      // remove cookies, refresh window
      cookie.remove(TOKEN_COOKIE_NAME);
      window.location.reload();
    }
    else setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Course Enrollment Service
          </Typography>
          <Button color="inherit" component={Link} to="/">All Courses</Button>
          <Button color="inherit"component={Link} to="Enrolled">Enrolled Courses</Button>
          <Button color="inherit"onClick={handleClickOpen}>{buttonText}</Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={open} handleClose={handleClose}></LoginDialog>
    </Box>
  );
}

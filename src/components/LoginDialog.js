import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";
import {AuthService} from "../service/AuthService";
import cookie from "react-cookies"
import {TOKEN_COOKIE_NAME} from "../constant";

export default function LoginDialog(props) {
  const [error, setError] = React.useState("");
  let userName;
  let password
  const login = () => {
    AuthService.getJWTToken(userName, password)
      .then(response => {
        const token = response.data.id_token;  // JWT
        cookie.save(TOKEN_COOKIE_NAME, token);  // save token in cookie
        window.location.reload(); //refresh the whole window(including allcourse, login and menubar to activate the JWT
      })
      .catch(error => {
        console.error(error);
        setError(String(error));
      });
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please enter Username & Password"}
        </DialogTitle>
        <DialogContent>
          <TextField id="filled-basic" label="Username" variant="filled" fullWidth autoFocus onChange={(event => userName = event.target.value)}/>
          <TextField id="filled-basic" label="Password" variant="filled" fullWidth type={"password"} onChange={(event => password = event.target.value)}/>
          <DialogContentText id="alert-dialog-description" style={{"color" : "red"}}>
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>CANCEL</Button>
          <Button onClick={login} >LOGIN</Button>
          {/*<Button onClick={test} >LOGIN</Button>*/}
        </DialogActions>
      </Dialog>
    </div>
  );

  // function test() {
  //   console.log(userName, password);
  // }
}

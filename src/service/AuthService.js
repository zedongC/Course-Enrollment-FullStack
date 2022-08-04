import axios from "../axios/config";

export const AuthService = {
  getJWTToken: function (userName, password) {
    return axios.post("/api/authenticate", {  // connect with postMapping in backend
      "username" : userName,
      "password" : password
    })

  }
}

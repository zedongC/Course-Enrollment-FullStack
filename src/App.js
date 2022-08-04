import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/MenuBar";
import AllCourses from "./views/AllCourses";
import EnrolledCourses from "./views/EnrolledCourses";
import ErrorPage from "./views/ErrorPage";
import LoginDialog from "./components/LoginDialog";

function App() {

  return (
    <div>
      <MenuBar />
      <Routes>
        <Route path="login-dialog" element={<LoginDialog />} />
        <Route path="" element={<AllCourses />} />  // the mapping of path and component
        <Route path="Enrolled" element={<EnrolledCourses />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </div>
  );
}

export default App;

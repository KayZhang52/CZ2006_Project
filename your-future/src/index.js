import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/userManagement/LoginForm";
import SignUpForm from "./components/userManagement/SignUpForm";
import Home from "./routes/Home";
import RecommendationTool from "./routes/RecommendationTool";
import RecommendationResult from "./routes/RecommendationResult";
import UniversityHome from "./routes/UniversityHome";
import SchoolList from "./routes/SchoolList";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";

ReactDOM.render(
  <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route
            path="/recommendation"
            element={<RecommendationTool />}
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/test" element={<RecommendationResult />}></Route>
          <Route
            path="recommendation-page"
            element={<RecommendationResult />}
          ></Route>
          <Route path="/home" element={<UniversityHome />}></Route>
          <Route path="/schools" element={<SchoolList />}></Route>
        </Route>
      </Routes>
    </Router>
  </ChakraProvider>,
  document.getElementById("root")
);

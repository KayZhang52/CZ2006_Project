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
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/test" element={<RecommendationResult />}></Route>
          <Route
            path="recommendation-page"
            element={<RecommendationResult />}
          ></Route>
          <Route path="test" element={<UniversityHome />}></Route>
        </Route>
      </Routes>
    </Router>
  </ChakraProvider>,
  document.getElementById("root")
);

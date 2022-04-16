import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RecommendationTool from "./routes/RecommendationTool";
import RecommendationResult from "./routes/RecommendationResult";
import UniversityHome from "./routes/UniversityHome";
import SchoolList from "./routes/SchoolList";
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import RecommendationsForm from "./components/homepage/RecommendationsForm";

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
          <Route path="/result" element={<RecommendationResult />}></Route>
          <Route
            path="recommendation-page"
            element={<RecommendationResult />}
          ></Route>
          <Route
            path="/schoolhome/:school"
            element={<UniversityHome />}
          ></Route>
          <Route path="/schools/" element={<SchoolList />}></Route>
        </Route>
      </Routes>
    </Router>
  </ChakraProvider>,
  document.getElementById("root")
);

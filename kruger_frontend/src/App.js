import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/404";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default App;
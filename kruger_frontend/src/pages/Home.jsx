import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import HomeAdmin from "../components/HomeAdmin";
import HomeEmployee from "../components/HomeEmployee";
import NavBar from "../components/NavBar";

const mdTheme = createTheme();
const cookies = new Cookies();

export default function HomePage() {
	const logout = () => {
		cookies.remove("username");
		window.location.href = "/login";
	};

	useEffect(() => {
		if (cookies.get("username") === undefined) window.location.href = "/login";
	}, []);

	return (
		<ThemeProvider theme={mdTheme}>
			<NavBar />
			<Box sx={{ display: "flex" }}>
				{cookies.get("username").role === "employee" && <HomeEmployee />}
				{cookies.get("username").role === "admin" && <HomeAdmin />}
				<Button onClick={() => logout()}>Cerrar Sesión</Button>
			</Box>
		</ThemeProvider>
	);
}
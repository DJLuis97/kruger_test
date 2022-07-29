import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const mdTheme = createTheme();
const cookies = new Cookies();

export default function HomePage() {
	const logout = () => {
		cookies.remove("username");
		window.location.href = "/login";
	};

	useEffect(() => {
		if (cookies.get("username") === undefined) {
			window.location.href = "/login";
		}
	}, []);

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: "flex" }}>
				<Button onClick={() => logout()}>Cerrar Sesión</Button>
			</Box>
		</ThemeProvider>
	);
}
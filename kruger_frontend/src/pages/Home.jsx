import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import FormEmployee from "../components/FormEmployee";
import NavBar from "../components/NavBar";

const mdTheme = createTheme();
const cookies = new Cookies();

export default function HomePage() {
	const [user, setUser] = useState(null);
	const [employee, setEmployee] = useState(null);
	const [loadHomePage, setLoadHomePage] = useState(false);

	const logout = () => {
		cookies.remove("username");
		window.location.href = "/login";
	};

	useEffect(() => {
		if (cookies.get("username") === undefined) {
			window.location.href = "/login";
		} else {
			setUser(cookies.get("username"));
			if (cookies.get("username").role === "employee") {
				setLoadHomePage(true);
				axios
					.get(`http://localhost:3001/employees?user_id=${cookies.get("username").id}`)
					.then((res) => {
						if (res.data.length === 1) {
							setEmployee(res.data[0]);
						}
					})
					.catch((err) => {
						alert("Algo ocurrio al obtener los datos del empleado logueado");
					})
					.finally(() => setLoadHomePage(false));
			}
		}
	}, []);

	if (loadHomePage) return <div>Cargando...</div>;

	return (
		<ThemeProvider theme={mdTheme}>
			<NavBar />
			<Box sx={{ display: "flex" }}>
				{user?.role === "employee" && <FormEmployee />}
				{user?.role === "admin" && <Button href="/employees">Empleados</Button>}
				<Button onClick={() => logout()}>Cerrar Sesión</Button>
			</Box>
		</ThemeProvider>
	);
}
import { Box, Container, createTheme, CssBaseline, Grid, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import FormEmployee from "./FormEmployee";

const cookies = new Cookies();
const theme = createTheme();

const HomeEmployee = () => {
	const [employee, setEmployee] = useState(null);
	const [loadPage, setLoadPage] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		const fetchEmployee = () => {
			setLoadPage(true);
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
				.finally(() => setLoadPage(false));
		};
		fetchEmployee();
	}, []);

	if (loadPage) return <div>Cargando...</div>;

	return (
		<Container maxWidth="lg">
			<main>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography>Nombres: {employee?.name}</Typography>
						<Typography>Apellidos: {employee?.last_name}</Typography>
						<Typography>Cédula: {employee?.ci}</Typography>
						<Typography>Correo: {employee?.email}</Typography>
					</Grid>
					{employee?.vaccinated && (
						<Grid item xs={6}>
							<Typography>Vacunado: {employee?.vaccinated}</Typography>
							<Typography>Tipo de vacuna: {employee?.vaccinated_type}</Typography>
							<Typography>Fecha vacunación: {employee?.vaccinated_date}</Typography>
							<Typography>Número de dosis de la vacuna: {employee?.vaccinated_dose}</Typography>
						</Grid>
					)}
				</Grid>
				<FormEmployee employee={employee} />
			</main>
		</Container>
	);
};

export default HomeEmployee;
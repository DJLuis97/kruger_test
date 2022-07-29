import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import FormEmployee from "./FormEmployee";

const cookies = new Cookies();

const HomeEmployee = () => {
	const [employee, setEmployee] = useState(null);
	const [loadPage, setLoadPage] = useState(false);

	const updateEmployeeState = (employee) => {
		setEmployee(employee);
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
				<Typography>Nombres: {employee?.name}</Typography>
				<Typography>Apellidos: {employee?.last_name}</Typography>
				<Typography>Cédula: {employee?.ci}</Typography>
				<Typography>Correo: {employee?.email}</Typography>
				<FormEmployee employee={employee} update={updateEmployeeState} />
			</main>
		</Container>
	);
};

export default HomeEmployee;
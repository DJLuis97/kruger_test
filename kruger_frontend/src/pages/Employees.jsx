import {
	AppBar,
	createTheme,
	CssBaseline,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	ThemeProvider,
	Toolbar,
	Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const theme = createTheme();
const cookies = new Cookies();

export default function EmployeesPage() {
	const [employees, setEmployees] = useState([]);
	const [loadEmployeesPage, setLoadEmployeesPage] = useState(false);

	useEffect(() => {
		if (cookies.get("username") === undefined) {
			window.location.href = "/login";
		} else {
			if (cookies.get("username").role !== "admin") {
				window.location.href = "/";
			} else {
				setLoadEmployeesPage(true);
				axios
					.get(`http://localhost:3001/employees`)
					.then((res) => setEmployees(res.data))
					.catch((err) => {
						alert("Algo ocurrio al obtener la lista de empleados");
					})
					.finally(() => setLoadEmployeesPage(false));
			}
		}
	}, []);

	if (loadEmployeesPage) return <div>Cargando...</div>;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar
				position="absolute"
				color="default"
				elevation={0}
				sx={{
					position: "relative",
					borderBottom: (t) => `1px solid ${t.palette.divider}`
				}}
			>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						Kruger test
					</Typography>
				</Toolbar>
			</AppBar>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="right">Cédula</TableCell>
							<TableCell align="right">Nombres</TableCell>
							<TableCell align="right">Apellidos</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{employees.map((employee) => (
							<TableRow key={employee.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									{employee.id}
								</TableCell>
								<TableCell align="right">{employee.ci}</TableCell>
								<TableCell align="right">{employee.name}</TableCell>
								<TableCell align="right">{employee.last_name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</ThemeProvider>
	);
}
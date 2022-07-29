import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
	createTheme,
	CssBaseline,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	ThemeProvider
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import ModalNewEmployee from "../components/ModalNewEmployee";
import NavBar from "../components/NavBar";

const theme = createTheme();
const cookies = new Cookies();

export default function EmployeesPage() {
	const [employees, setEmployees] = useState([]);
	const [loadEmployeesPage, setLoadEmployeesPage] = useState(false);

	const addSingleEmployee = (employee) => setEmployees((prevState) => [...prevState, employee]);

	const deleteSingleEmployee = (employee) => {
		const employees_tmp = employees;
		const result = employees_tmp.filter((item) => employee.id !== item.id);
		setEmployees(result);
	};

	const deleteEmployee = (employee) => {
		setLoadEmployeesPage(true);
		axios
			.delete(`http://localhost:3001/users/${employee.user_id}`)
			.then((res) => {
				setLoadEmployeesPage(true);
				axios
					.delete(`http://localhost:3001/employees/${employee.id}`)
					.then((res) => {
						deleteSingleEmployee(employee);
						alert("Empleado eliminado con éxito");
					})
					.catch((err) => {
						alert("Algo paso al eliminar el empleado");
					})
					.finally(() => setLoadEmployeesPage(false));
			})
			.catch((err) => {
				alert("ALgo paso al eliminar el usuario");
			})
			.finally(() => setLoadEmployeesPage(false));
	};

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
			<NavBar />
			<ModalNewEmployee add={addSingleEmployee} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="right">Cédula</TableCell>
							<TableCell align="right">Nombres</TableCell>
							<TableCell align="right">Apellidos</TableCell>
							<TableCell align="right"></TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{employees.length <= 0 ? (
							<TableRow>
								<TableCell component="th">No existen registros</TableCell>
							</TableRow>
						) : (
							employees.map((employee) => (
								<TableRow key={employee.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
									<TableCell component="th" scope="row">
										{employee.id}
									</TableCell>
									<TableCell align="right">{employee.ci}</TableCell>
									<TableCell align="right">{employee.name}</TableCell>
									<TableCell align="right">{employee.last_name}</TableCell>
									<TableCell align="right">
										<IconButton component="label">
											<EditIcon />
										</IconButton>
									</TableCell>
									<TableCell align="right">
										<IconButton onClick={() => deleteEmployee(employee)} component="label">
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</ThemeProvider>
	);
}
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const HomeEmployee = () => {
	const [employee, setEmployee] = useState(null);
	const [loadPage, setLoadPage] = useState(false);

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

	return <div>Bienvenido {employee?.name}</div>;
};

export default HomeEmployee;
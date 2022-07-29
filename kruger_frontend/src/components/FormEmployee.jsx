import { Box, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const vaccines = [
	{ id: 1, name: "Sputnik" },
	{ id: 2, name: "AstraZeneca" },
	{ id: 3, name: "Pfizer" },
	{ id: 4, name: "Jhonson&Jhonson" }
];

const FormEmployee = ({ employee }) => {
	const [vaccineType, setVaccineType] = useState("AstraZeneca");
	const [isVaccined, setIsVaccined] = useState(false);
	const [loadUpdateEmployee, setLoadUpdateEmployee] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoadUpdateEmployee(true);
		const data = new FormData(event.currentTarget);
		axios
			.patch(`http://localhost:3001/employees/${employee?.id}`, {
				bith: data.get("bith"),
				address: data.get("address"),
				phone: data.get("phone"),
				vaccinated: isVaccined,
				vaccinated_type: isVaccined ? vaccineType : null,
				vaccinated_date: isVaccined ? data.get("vaccinated_date") : null,
				vaccinated_dose: isVaccined ? data.get("vaccinated_dose") : null
			})
			.then((res) => {
				if (res.status === 200) {
					alert("Datos actualizado con éxito");
				} else {
					console.log(res);
				}
			})
			.catch((err) => {
				alert("Algo pasó al actualizar tus datos de empleado");
			})
			.finally(() => setLoadUpdateEmployee(false));
	};

	if (loadUpdateEmployee) return <div>Actualizando...</div>;

	return (
		<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
			<TextField
				margin="normal"
				required
				fullWidth
				id="address"
				label="Direccion de domicilio"
				name="address"
				type="text"
				autoFocus
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				id="bith"
				label="Fecha de nacimiento"
				name="bith"
				type="date"
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				id="phone"
				label="Teléfono móvil"
				name="phone"
				type="number"
			/>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							checked={isVaccined}
							onChange={(event) => setIsVaccined(!isVaccined)}
							inputProps={{ "aria-label": "controlled" }}
							value="remember"
							color="primary"
						/>
					}
					label="¿Vacunado?"
				/>
			</div>
			{isVaccined && (
				<div>
					<TextField
						id="outlined-select-currency"
						select
						label="Select"
						value={vaccineType}
						onChange={(event) => setVaccineType(event.target.value)}
						helperText="Selecciona tipo de vacuna"
					>
						{vaccines.map((vaccine) => (
							<MenuItem key={vaccine.id} value={vaccine.name}>
								{vaccine.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						margin="normal"
						required
						fullWidth
						id="vaccinated_date"
						label="Fecha de vacunación"
						name="vaccinated_date"
						type="date"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="vaccinated_dose"
						label="Número de dosis"
						name="vaccinated_dose"
						type="number"
					/>
				</div>
			)}
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
				Actualizar mis datos
			</Button>
		</Box>
	);
};

export default FormEmployee;
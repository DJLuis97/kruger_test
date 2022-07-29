import { Box, Button, Container, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import md5 from "md5";
import { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 2
};

const ModalNewEmployee = ({ add }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [loadSubmit, setLoadSubmit] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		setLoadSubmit(true);
		axios
			.post(`http://localhost:3001/users`, {
				username: data.get("ci"),
				password: md5(data.get("ci"))
			})
			.then((res) => {
				if (res.status === 201) {
					axios
						.post(`http://localhost:3001/employees`, {
							ci: data.get("ci"),
							name: data.get("name"),
							last_name: data.get("last_name"),
							email: data.get("email"),
							user_id: res.data.id
						})
						.then((res) => {
							if (res.status === 201) {
								alert("Empleado creado con existo");
								add(res.data);
							} else {
								console.log(res);
							}
						})
						.catch((err) => {
							alert("ALgo malo paso al guardar el empleado");
						})
						.finally(() => setLoadSubmit(false));
				} else {
					console.log(res);
				}
			})
			.catch((err) => {
				alert("ALgo malo paso al crear el usuario");
			});
	};

	if (loadSubmit) return <div>Cargando...</div>;

	return (
		<>
			<Button onClick={handleOpen}>Agregar empleado</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
					<Typography component="h1" variant="h4" align="center">
						Agrega un empleado
					</Typography>
					<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
						<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="name"
										name="name"
										label="Nombres"
										fullWidth
										autoComplete="given-name"
										variant="standard"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="last_name"
										name="last_name"
										label="Apellidos"
										fullWidth
										autoComplete="family-name"
										variant="standard"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField required id="ci" name="ci" label="Cédula" fullWidth variant="standard" />
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="email"
										name="email"
										label="Correo"
										fullWidth
										type="email"
										autoComplete="shipping address-line2"
										variant="standard"
									/>
								</Grid>
							</Grid>
							<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
								<Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>
									Guardar
								</Button>
							</Box>
						</Paper>
					</Container>
				</Box>
			</Modal>
		</>
	);
};

export default ModalNewEmployee;
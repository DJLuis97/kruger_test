import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import md5 from "md5";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const theme = createTheme();

export default function LoginPage() {
	const [loadLogin, setLoadLogin] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		setLoadLogin(true);
		axios
			.get(`http://localhost:3001/users`, {
				params: {
					username: data.get("username"),
					password: md5(data.get("password"))
				}
			})
			.then((res) => res.data)
			.then((data) => {
				if (data.length === 1) {
					cookies.set("username", data[0], { path: "/" });
					window.location.href = "/";
				} else {
					alert("Datos incorrectos");
				}
			})
			.catch((err) => console.log(err))
			.finally(() => setLoadLogin(false));
	};

	useEffect(() => {
		if (cookies.get("username") !== undefined) {
			window.location.href = "/";
		}
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Nombre de usuario"
							name="username"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Contraseña"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button disabled={loadLogin} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Iniciar sesión
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
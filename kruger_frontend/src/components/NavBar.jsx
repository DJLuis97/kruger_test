import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const NavBar = ({ title = "Kruger Test", url = "/" }) => {
	const [isAutenticated, setIsAutenticated] = useState(false);

	const logout = () => {
		cookies.remove("username");
		window.location.href = "/login";
	};

	useEffect(() => {
		setIsAutenticated(cookies.get("username") !== undefined);
	}, []);

	return (
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
					<LinkRouter to={url}>{title}</LinkRouter>
				</Typography>
				<Typography>Iniciaste sesión como @{cookies.get("username").username}</Typography>
				{isAutenticated && <Button onClick={() => logout()}>Cerrar Sesión</Button>}
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
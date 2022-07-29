import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

const NavBar = ({ title = "Kruger Test", url = "/" }) => {
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
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
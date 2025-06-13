import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ()=>{
    const tokenFromStorage = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/login")
    }
    return(
        <Box sx={{ flexGrow : 1}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow:1}}>
                        Task Manager Dashboard
                    </Typography>
                    {
                        tokenFromStorage ? <Button color="inherit" onClick={handleLogout}>Logout</Button> :
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <p>/</p>
                            <Button color="inherit" component={Link} to="/signUp">signUp</Button> 
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ()=>{
    const navigate = useNavigate();
    return(
        <Box sx={{ flexGrow : 1}}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow:1}}>
                        Task Manager Dashboard
                    </Typography>
                    
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/signUp">Sign Up</Button>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;
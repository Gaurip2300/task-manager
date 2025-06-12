import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , Link} from "react-router-dom";
import type { AppDispatch, RootState } from "../store";
import { registerUser } from "../features/auth/authSlice";
import { useState } from "react";

export default function SignUp() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error } = useSelector((state:RootState)=>state.auth);

     const [formData, setFormData] = useState({name:'',email:'', password:''})
        
        const handleChange = (e:any)=>{
            const {name, value} = e.target
            setFormData({...formData, [name]: value})
        }


    const handleSignUp = async(e:any)=>{
        e.preventDefault();
        const res = await dispatch(registerUser(formData));
        if(registerUser.fulfilled.match(res)){
            navigate('/login')
        }
    }
    return(
        <Container maxWidth="sm" sx={{ height:"100vh", display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Paper elevation={3} sx={{padding:4, width:"100%"}}>
                <Typography variant="h5" component="h2" gutterBottom>SignUp</Typography>
                <Box component="form" onSubmit={handleSignUp}>
                    <TextField
                        label="Name"
                        type="text"
                        name="name"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                    />
                      {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >Sign Up</Button>
                    <Typography variant="subtitle1" mt={4}> If you already have account <Link to="/login">Login</Link> </Typography>
                </Box>  
            </Paper>
        </Container>
    )
}
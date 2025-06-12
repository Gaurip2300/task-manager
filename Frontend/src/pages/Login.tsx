import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import type React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../store";
import { useState } from "react";
import { loginUser } from "../features/auth/authSlice";

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading , error } = useSelector((state:RootState)=>state.auth)
    
    const [formData, setFormData] = useState({email:'', password:''})
    
    const handleChange = (e:any)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleLogin = async(e:React.FormEvent)=>{
        e.preventDefault();
        const res = await dispatch(loginUser(formData));
        if(loginUser.fulfilled.match(res)){
            navigate('/')
        }
    }
    return(
     <Container maxWidth="sm" sx={{ height:"100vh", display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Paper elevation={3} sx={{padding:4, width:"100%"}}>
                <Typography variant="h5" component="h2" gutterBottom>Login</Typography>
                <Box component="form" onSubmit={handleLogin}>
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
                    >{loading ? 'Loggin in.....' : 'Login'}</Button>
                <Typography variant="subtitle1" mt={4}> If you don't have account <Link to="/signUp">Create</Link> </Typography>
                </Box>  
            </Paper>
        </Container>
    )
}
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
    const { loading, error } = useSelector((state: RootState) => state.auth)

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [fieldErrors, setFieldErrors] = useState({
        email: "",
        password: "",
    });

    const validate = () => {
        const errors = { email: "", password: "" };
        let isValid = true;

        if (!formData.email) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Invalid email format";
            isValid = false;
        }

        if (!formData.password) {
            errors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };


    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        const res = await dispatch(loginUser(formData));
        if (loginUser.fulfilled.match(res)) {
            navigate('/')
        }
        setFieldErrors({ email: "", password: "" });
    }
    return (
        <Container maxWidth="sm" sx={{ height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
                <Typography variant="h5" component="h2" gutterBottom>Login</Typography>
                <Box component="form" onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        error={Boolean(fieldErrors.email)}
                        helperText={fieldErrors.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        error={Boolean(fieldErrors.password)}
                        helperText={fieldErrors.password}
                        onChange={handleChange}
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >{loading ? 'Loggin in.....' : 'Login'}</Button>
                    <Typography variant="subtitle1" mt={4}> If you don't have account <Link to="/signUp">Sign Up</Link> </Typography>
                </Box>
            </Paper>
        </Container>
    )
}
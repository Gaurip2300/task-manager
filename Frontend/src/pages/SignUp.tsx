import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../store";
import { registerUser } from "../features/auth/authSlice";
import { useState } from "react";

export default function SignUp() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const [fieldErrors, setFieldErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const validate = () => {
        const errors = { name: "", email: "", password: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    };


    const handleSignUp = async (e: any) => {
        e.preventDefault();
        if (!validate()) return;
        const res = await dispatch(registerUser(formData));
        if (registerUser.fulfilled.match(res)) {
            navigate('/login')
        }
        setFieldErrors({ name: "", email: "", password: "" });
    }
    return (
        <Container maxWidth="sm" sx={{ height: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
                <Typography variant="h5" component="h2" gutterBottom>SignUp</Typography>
                <Box component="form" onSubmit={handleSignUp}>
                    <TextField
                        label="Name"
                        type="text"
                        name="name"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formData.name}
                        error={Boolean(fieldErrors.name)}
                        helperText={fieldErrors.name}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formData.email}
                        error={Boolean(fieldErrors.email)}
                        helperText={fieldErrors.email}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formData.password}
                        error={Boolean(fieldErrors.password)}
                        helperText={fieldErrors.password}
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
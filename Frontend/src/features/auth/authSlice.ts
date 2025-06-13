import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log("BASE_URL", import.meta.env.VITE_BASE_URL);
const tokenFromStorage = localStorage.getItem("token");

interface UserState {
    token: string | null;
    isAuthenticated : boolean;
    loading: boolean;
    error : string | null;
}

const initialState : UserState ={
    token: tokenFromStorage,
    isAuthenticated : false,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async(payload : {email:string, password:string}, thunkAPI)=>{
        try{
            const res = await axios.post(`${BASE_URL}/api/users/login`, payload, { withCredentials: true } );
            return res.data.token;
        }catch(err:any){    
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login Failed')
        }
    }
)

export const registerUser = createAsyncThunk(
    '/auth/registerUser',
    async(data:{name: string; email: string; password: string}, thunkAPI)=>{
        try{
            const res = await axios.post(
                `${BASE_URL}/api/users/register`,
                data,
                { withCredentials: true } 
              );
            return res.data
        }catch(err: any){
            return thunkAPI.rejectWithValue(err?.response?.data?.message || 'Registration failed');
        }
    }
)

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout : (state) =>{
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(loginUser.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state,action)=>{
                state.token = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                localStorage.setItem("token", action.payload);
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.loading=  false;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state)=>{
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.loading=  false;
                state.error = action.payload as string;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer
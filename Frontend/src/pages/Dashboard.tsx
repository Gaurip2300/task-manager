import { Container, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios";

const Dashboard =() =>{
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetchAllTasks()
    },[])
    const fetchAllTasks = async()=>{
        try{
            const res = await axios.get("https://silver-zebra-v6r6r69r4wgq3wrw5-3000.app.github.dev/api/tasks/get-tasks")
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
            <Navbar/>
            <Container maxWidth="md" sx={{mt:4}}>
                <Typography variant="h4">
                    Welcome to the Task Manager Please Login to access application
                </Typography>
                
            </Container>
        </>
    )
}

export default Dashboard
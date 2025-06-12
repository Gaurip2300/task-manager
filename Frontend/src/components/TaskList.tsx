import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";

const TaskList = ()=>{
    const [tasks, setTasks] = useState([])
    return(
        <div>
            <Typography variant="h6">Task Manager</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Priority</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tasks.map((task)=>(
                                <TableRow>
                                    <TableCell>
                                        <Checkbox
                                            checked={task.completed}
                                            onChange={()=>{
                                                handleToggleCompleted(task.id)
                                            }}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>{task.due_date}</TableCell>
                                    <TableCell>{task.priority}</TableCell>
                                </TableRow>
                            ))
                        }
                        {
                            tasks.length === 0 && (
                                <TableCell colSpan={5} align="center">
                                    No Tasks Available
                                </TableCell>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default TaskList;
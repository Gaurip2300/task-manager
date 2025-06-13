import { Container, Typography, CircularProgress, Modal, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import Navbar from "../components/Navbar"
import TaskList from "../components/TaskList"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { getAllTasks } from "../features/tasks/taskSlice"
import AddTask from "../components/AddTask"
import { useNavigate, Link } from "react-router-dom";

type Task = {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: "pending" | "completed";
};

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
    const { token } = useSelector((state: RootState) => state.auth);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const handleAddTaskClick = () => {
        console.log('clicked')
        setShowAddTaskForm(true)
    }

    const fetchFilteredTasks = () => {
        dispatch(getAllTasks({
            status: statusFilter || undefined,
            priority: priorityFilter || undefined
        }));
    };

    useEffect(() => {
        if (token) {
            fetchFilteredTasks();
        }
    }, [token]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleStatusFilterChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        setStatusFilter(value);
        dispatch(getAllTasks({ status: value || undefined, priority: priorityFilter || undefined }));
    };

    const handlePriorityFilterChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        setPriorityFilter(value);
        dispatch(getAllTasks({ status: statusFilter || undefined, priority: value || undefined }));
    }

    const resetFilters = () => {
        setSearchText("");
        setStatusFilter("");
        setPriorityFilter("");
        dispatch(getAllTasks({ status: undefined, priority: undefined }));
    }

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesStatus = statusFilter ? task.status === statusFilter : true;
        const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {
                    !token ? (
                        <Typography variant="h4">
                            Welcome to the Task Manager Please <Link to="/login">Login</Link> to access application
                        </Typography>
                    ) :
                        loading ? (<CircularProgress />) :
                            error ? <Typography color="error">{error}</Typography> :
                                tasks ? (<>
                                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2, gap: 2 }}>
                                        <TextField
                                            label="Search Task"
                                            variant="outlined"
                                            size="small"
                                            value={searchText}
                                            onChange={handleSearchChange}
                                        />
                                        <FormControl size="small" sx={{ minWidth: 120 }}>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                value={statusFilter}
                                                label="Status"
                                                onChange={handleStatusFilterChange}
                                            >
                                                <MenuItem value="">All</MenuItem>
                                                <MenuItem value="pending">Pending</MenuItem>
                                                <MenuItem value="completed">Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl size="small" sx={{ minWidth: 120 }}>
                                            <InputLabel>Priority</InputLabel>
                                            <Select
                                                value={priorityFilter}
                                                label="Priority"
                                                onChange={handlePriorityFilterChange}
                                            >
                                                <MenuItem value="">All</MenuItem>
                                                <MenuItem value="low">Low</MenuItem>
                                                <MenuItem value="medium">Medium</MenuItem>
                                                <MenuItem value="high">High</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Button variant="contained" color="primary" onClick={() => resetFilters()}>Reset</Button>
                                        <Button variant="contained" color="primary" onClick={() => handleAddTaskClick()}>
                                            Add New Task
                                        </Button>
                                    </Box>
                                    <TaskList
                                        tasks={filteredTasks}
                                        onEdit={(task) => {
                                            setTaskToEdit(task);
                                            setShowAddTaskForm(true);
                                        }}
                                    />
                                </>) : (<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                                    <Button variant="contained" color="primary" onClick={() => handleAddTaskClick()}>
                                        Add New Task
                                    </Button>
                                </Box>)
                }

                <Modal
                    open={showAddTaskForm}
                    onClose={() => {
                        setShowAddTaskForm(false);
                        setTaskToEdit(null);
                    }}
                >
                    <Box sx={{ width: 400, margin: "auto", mt: 10 }}>
                        <AddTask
                            onClose={() => {
                                setShowAddTaskForm(false);
                                setTaskToEdit(null);
                            }}
                            taskToEdit={taskToEdit ?? undefined}
                        />
                    </Box>
                </Modal>



            </Container>
        </>
    )
}

export default Dashboard
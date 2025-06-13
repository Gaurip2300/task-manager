import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { createTask, updateTask } from "../features/tasks/taskSlice";

type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "pending"
};

type AddTaskProps = {
  onClose?: () => void;
  taskToEdit?: {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
  };
};

export default function AddTask({ onClose, taskToEdit }: AddTaskProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.tasks);

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "pending"
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        dueDate: taskToEdit.dueDate?.split("T")[0] || "",
        priority: taskToEdit.priority || "medium",
        status: "pending"
      });
    }
  }, [taskToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        await dispatch(
          updateTask({ taskId: taskToEdit._id, updates: formData })
        ).unwrap();
      } else {
        await dispatch(createTask(formData)).unwrap();
      }

      setSubmitted(true);

      if (!taskToEdit) {
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "medium",
          status: "pending"
        });
      }

      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to submit task:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" mb={3}>
        {taskToEdit ? "Edit Task" : "Add Task"}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {submitted && !error && (
        <Alert severity="success">
          {taskToEdit ? "Task updated!" : "Task added!"}
        </Alert>
      )}

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      <TextField
        label="Due Date"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        select
        label="Priority"
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        {loading ? (taskToEdit ? "Updating..." : "Adding...") : taskToEdit ? "Update Task" : "Add Task"}
      </Button>
    </Box>
  );
}

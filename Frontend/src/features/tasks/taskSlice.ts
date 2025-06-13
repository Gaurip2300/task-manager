import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: "completed" | "pending";
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
}

export const getAllTasks = createAsyncThunk(
  "tasks/getTasks",
  async (
    filters: { status?: string; priority?: string } = {},
    thunkAPI
  ) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.auth.token;

      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);

      const res = await axios.get(`${BASE_URL}/api/tasks/get-tasks?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;

    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch tasks");
    }
  }
)

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (
    data: {
      title: string;
      description: string;
      dueDate: string;
      priority: string;
      status: "pending"
    },
    thunkAPI
  ) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.auth.token;

      const res = await axios.post(`${BASE_URL}/api/tasks/create-task`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create task"
      );
    }
  }
)

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.auth.token;

      await axios.delete(`${BASE_URL}/api/tasks/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return taskId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    data: {
      taskId: string;
      updates: {
        title?: string;
        description?: string;
        dueDate?: string;
        priority?: string;
        status: "completed" | "pending";
      };
    },
    thunkAPI
  ) => {
    try {
      const state: any = thunkAPI.getState();
      const token = state.auth.token;

      const res = await axios.put(`${BASE_URL}/api/tasks/update-task/${data.taskId}`, data.updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update task"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
  }
})


export default taskSlice.reducer;
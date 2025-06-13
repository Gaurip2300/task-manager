import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, TablePagination } from "@mui/material";
import { useState } from "react";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";
import { useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Define the Task type if not already imported
type Task = {
  _id: string;
  id?: string; // in case you use both _id and id
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: "completed" | "pending";
};

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
};

const TaskList = ({ tasks, onEdit }: TaskListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleToggleCompleted = (taskId: string, currentStatus: "completed" | "pending") => {
    dispatch(updateTask({
      taskId,
      updates: {
        status: currentStatus === "completed" ? "pending" : "completed"
      }
    }));
  };
  const [page, setPage] = useState(0);
  const rowsPerPage = 4;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const paginatedTasks = tasks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (task: any) => {
    onEdit(task);
  };

  return (
    <div>
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
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>
                    <Checkbox
                      checked={task.status === "completed"}
                      onChange={() =>
                        handleToggleCompleted(task.id ?? task._id, task.status)
                      }
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description ? task.description : '-'}</TableCell>
                  <TableCell>
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Tasks Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={tasks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />

      </TableContainer>
    </div>
  )
}
export default TaskList;
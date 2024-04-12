import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { BsSave } from "react-icons/bs";
import { toast } from "react-toastify";

interface MaterialModalProps {
    open: boolean;
    course: any;
    onClose: () => void;
}

const MaterialModal: React.FC<MaterialModalProps> = ({ open, onClose, course }) => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [taskTitles, setTaskTitles] = useState<string[]>([]);
    const [existingTaskIds, setExistingTaskIds] = useState<string[]>([]);

    useEffect(() => {
        if (open && course?.id) {
            axios.get(`/api/getTasks?id=${course.id}`)
                .then(response => {
                    const tasksData = response.data;
                    const initialTaskTitles = tasksData.map((task: any) => task.title);
                    const initialTasks = tasksData.map((task: any) => task.content);
                    const initialTaskIds = tasksData.map((task: any) => task.id);
                    setTaskTitles(initialTaskTitles);
                    setTasks(initialTasks);
                    setExistingTaskIds(initialTaskIds);
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                    setTaskTitles([]);
                    setTasks([]);
                    setExistingTaskIds([]);
                });
        }
    }, [open, course]);

    const addOrUpdateTasks = () => {
        // Array to store promises for axios requests
        const requests = [];

        // Add or update tasks
        tasks.forEach((task, index) => {
            const taskId = existingTaskIds[index];
            const taskData = {
                title: taskTitles[index],
                content: task
            };

            if (taskId) {
                // Update existing task
                requests.push(axios.put(`/api/updateTasks`, {
                    taskId: taskId,
                    content: taskData.content,
                    title: taskData.title,
                }))
            } else {
                // Add new task
                requests.push(axios.post(`/api/addTask`, {
                    id: course.id,
                    content: taskData.content,
                    title: taskData.title,

                }));
            }
        });

        // Delete removed tasks
        existingTaskIds.forEach((taskId, index) => {
            if (!tasks[index]) {
                requests.push(axios.delete(`/api/deleteTask?taskID=${taskId}`));
            }
        });

        // Wait for all requests to finish
        Promise.all(requests)
            .then(() => {
                // Tasks updated successfully, you can perform any additional actions here if needed
                console.log('Tasks updated successfully');
                toast.success('Tasks updated successfully');
            })
            .catch(error => {
                toast.error('Error updating tasks');
                console.error('Error updating tasks:', error);
            });
    };

    const addTask = () => {
        setTaskTitles([...taskTitles, ""]);
        setTasks([...tasks, ""]);
    };

    const removeTask = (index: number) => {
        const updatedTaskTitles = [...taskTitles];
        const updatedTasks = [...tasks];
        updatedTaskTitles.splice(index, 1);
        updatedTasks.splice(index, 1);
        setTaskTitles(updatedTaskTitles);
        setTasks(updatedTasks);
    };

    const handleTaskTitleChange = (index: number, value: string) => {
        const updatedTaskTitles = [...taskTitles];
        updatedTaskTitles[index] = value;
        setTaskTitles(updatedTaskTitles);
    };

    const handleTaskChange = (index: number, value: string) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = value;
        setTasks(updatedTasks);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Add Tasks for {course?.name}</DialogTitle>
            <DialogContent>
                {tasks.map((task, index) => (
                    <Accordion key={index} style={{ marginBottom: 8 }}>
                        <AccordionSummary expandIcon={<AddIcon />} aria-controls={`task-${index}`} id={`task-${index}`}>
                            <Typography>Task {index + 1} - {taskTitles[index]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                label="Title"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={taskTitles[index] || ''}
                                onChange={(e) => handleTaskTitleChange(index, e.target.value)}
                            />
                            <TextField
                                label="Task"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={task}
                                onChange={(e) => handleTaskChange(index, e.target.value)}
                            />
                            <IconButton className="float-right" aria-label="delete" onClick={() => removeTask(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addOrUpdateTasks} color="primary">
                    <BsSave className="mx-3"/>  Save Changes
                </Button>
                <Button onClick={addTask} color="primary">
                    <AddIcon />  Add Task
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MaterialModal;

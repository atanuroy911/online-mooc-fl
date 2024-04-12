import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for the loader
import Accordion from '@mui/material/Accordion';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axios from 'axios';

interface MaterialModalProps {
    open: boolean;
    onClose: () => void;
    course: any;
    email: any;
    tasksCompleted: any;
}

const MaterialModal: React.FC<MaterialModalProps> = ({ open, onClose, course, email }) => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [taskTitles, setTaskTitles] = useState<string[]>([]);
    const [taskCompletion, setTaskCompletion] = useState<boolean[]>([]);
    const [tasksId, setTasksId] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // State variable for managing loading
    const [tasksCompleted, setTasksCompleted] = useState([]);


    useEffect(() => {
        let taskPromise;
        let taskCompletedPromise;

        if (open && course?.id) {
            setLoading(true); // Set loading state to true when data fetching starts
            taskPromise = axios.get(`/api/getTasks?id=${course.id}`)
                .then(response => {
                    const tasksData = response.data;
                    const initialTaskTitles = tasksData.map((task: any) => task.title);
                    const initialTasks = tasksData.map((task: any) => task.content);
                    const initialId = tasksData.map((task: any) => task.id);
                    setTaskTitles(initialTaskTitles);
                    setTasks(initialTasks);
                    setTasksId(initialId);
                    // setLoading(false); // Set loading state to false when data fetching completes
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                    setTaskTitles([]);
                    setTasks([]);
                    setTasksId([]);
                });
        }

        if (email) {
            setLoading(true);
            taskCompletedPromise = fetch(`/api/getTaskCompleted?id=${email}`)
                .then(response => response.json())
                .then(data => setTasksCompleted(data))
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                });
        }

        Promise.all([taskPromise, taskCompletedPromise])
            .then(() => {
                checkTaskCompletion(); // Check task completion after data fetching
                setLoading(false); // Set loading state to false after all operations are done
            })
            .catch(error => console.error('Error fetching tasks:', error));

    }, [open, course, email]);

    const checkTaskCompletion = () => {
        const updatedTaskCompletion = tasks.map((_, index) => {
            const taskId = tasksId[index];
            const completedTask = tasksCompleted.find(obj => obj.task_id === taskId);
            return completedTask ? true : false;
        });
        setTaskCompletion(updatedTaskCompletion);
    };

    const toggleTaskCompletion = async (index: number, Id: any) => {
        try {
            // Toggle the completion status immediately
            const updatedTaskCompletion = [...taskCompletion];
            updatedTaskCompletion[index] = !taskCompletion[index];
            setTaskCompletion(updatedTaskCompletion);

            // Send request to update task completion status
            await axios.post('/api/marktask', {
                studentEmail: email,
                taskId: Id,
                flag: updatedTaskCompletion[index] // Use the updated value directly
            });

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Add Tasks for {course?.name}</DialogTitle>
            <DialogContent>
                {loading ? (
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    tasks.map((task, index) => (
                        <Accordion key={index} style={{ marginBottom: 8 }}>
                            <AccordionSummary
                                aria-controls={`task-${index}`}
                                id={`task-${index}`}
                                style={{ backgroundColor: taskCompletion[index] ? 'lightgreen' : 'inherit' }}
                            >
                                <Typography>Task {index + 1} - {taskTitles[index]}</Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={taskTitles[index] || ''}
                                />
                                <TextField
                                    label="Task"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={task}
                                />
                            </AccordionDetails>
                            <div className="float-right">
                                <IconButton onClick={() => toggleTaskCompletion(index, tasksId[index])}>
                                    {taskCompletion[index] ? <CheckIcon /> : <CheckBoxOutlineBlankIcon />}
                                </IconButton>
                            </div>
                        </Accordion>
                    ))
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MaterialModal;

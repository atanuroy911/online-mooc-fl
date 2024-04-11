import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const AssignStudentsForm = () => {
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch courses
        axios.get('/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });

        // Fetch users
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleStudentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedStudents(event.target.value as number[]);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Add your form submission logic here
    };

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>
                Assign Students
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="course-select-label">Select Course</InputLabel>
                            <Select
                                labelId="course-select-label"
                                id="course-select"
                                label="Select Course"
                                fullWidth
                            >
                                {courses.map((course: any) => (
                                    <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="student-select-label">Select Student(s)</InputLabel>
                            <Select
                                labelId="student-select-label"
                                id="student-select"
                                label="Select Student(s)"
                                multiple
                                value={selectedStudents}
                                onChange={handleStudentChange}
                                fullWidth
                            >
                                {users.map((user: any) => (
                                    <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Assign Students
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AssignStudentsForm;

import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const AssignStudentsForm = () => {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
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

    const handleCourseChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCourse(event.target.value as number);
    };

    const handleStudentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedStudents(event.target.value as number[]);
    };

    const handleToggleStudent = (studentId: number) => {
        const currentIndex = selectedStudents.indexOf(studentId);
        const newSelectedStudents = [...selectedStudents];

        if (currentIndex === -1) {
            newSelectedStudents.push(studentId);
        } else {
            newSelectedStudents.splice(currentIndex, 1);
        }

        setSelectedStudents(newSelectedStudents);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (selectedCourse && selectedStudents.length > 0) {            
            try {
                const response = await axios.post('/api/assigncourse', {
                    selectedCourse, selectedStudents
                    // Add other fields as needed
                });
                
                console.log('Course added successfully:', response.data);
                toast.success('Students assigned Successfully');
                // console.log(syllabus);
                
                // Optionally, you can navigate to another page or show a success message
            } catch (error) {
                // console.error('Error assigning course:', error);
                toast.error('Student Exists in Course')
                // Handle error (show error message, etc.)
            }
            console.log("Selected Course:", selectedCourse);
            console.log("Selected Students:", selectedStudents);
        }
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
                                value={selectedCourse || ''}
                                onChange={handleCourseChange}
                                fullWidth
                            >
                                {courses.map((course: any) => (
                                    <MenuItem key={course.id} value={course.id}>{course.courseId + ' - ' + course.name}</MenuItem>
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
                                renderValue={(selected) => {
                                    return (
                                        <div>
                                            {selected.map((value: number) => (
                                                <ListItemText key={value} primary={users.find((user: any) => user.UserID === value)?.username} />
                                            ))}
                                        </div>
                                    );
                                }}
                                fullWidth
                            >
                                {users.map((user: any) => (
                                    <MenuItem key={user.UserID} value={user.UserID}>
                                        <Checkbox
                                            checked={selectedStudents.indexOf(user.UserID) !== -1}
                                            onChange={() => handleToggleStudent(user.UserID)}
                                        />
                                        <ListItemText primary={user.username} />
                                    </MenuItem>
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

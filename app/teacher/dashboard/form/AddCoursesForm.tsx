// AddCoursesForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCoursesForm = () => {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [department, setDepartment] = useState('');
    const [departmentShort, setDepartmentShort] = useState('');
    const [instructor, setInstructor] = useState('');
    const [learningObjectives, setLearningObjectives] = useState('');
    const [prerequisites, setPrerequisites] = useState('');
    const [duration, setDuration] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [experience, setExperience] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [courseCredits, setCourseCredits] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('/api/addcourses', {
                courseName,
                courseDescription,
                courseCode,
                department,
                departmentShort,
                instructor,
                learningObjectives,
                prerequisites,
                duration,
                qualifications,
                experience,
                syllabus,
                courseCredits
                // Add other fields as needed
            });
            
            console.log('Course added successfully:', response.data);
            toast.success('Course Added Successfully');
            console.log(syllabus);
            
            emptyField();
            // Optionally, you can navigate to another page or show a success message
        } catch (error) {
            console.error('Error adding course:', error);
            toast.error('Error Adding Course')
            // Handle error (show error message, etc.)
        }
    };

    const emptyField = () => {
                setCourseName('');
                setCourseDescription('');
                setCourseCode('');
                setDepartment('');
                setDepartmentShort('');
                setInstructor('');
                setLearningObjectives('');
                setPrerequisites('');
                setDuration('');
                setQualifications('');
                setExperience('');
                setSyllabus('');
                setCourseCredits('');
    }

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>
                Add Course
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseName"
                            label="Course Name"
                            variant="outlined"
                            onChange={(e) => setCourseName(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseDescription"
                            label="Course Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={(e) => setCourseDescription(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="courseCode"
                            label="Course Code"
                            variant="outlined"
                            onChange={(e) => setCourseCode(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="courseCredits"
                            label="Course Credits"
                            variant="outlined"
                            type="number"
                            onChange={(e) => setCourseCredits(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseDepartment"
                            label="Department"
                            variant="outlined"
                            onChange={(e) => setDepartment(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseDepartmentShort"
                            label="Department Short"
                            variant="outlined"
                            onChange={(e) => setDepartmentShort(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseInstructor"
                            label="Instructor"
                            variant="outlined"
                            onChange={(e) => setInstructor(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseLearningObjectives"
                            label="Learning Objectives"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={(e) => setLearningObjectives(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="coursePrerequisites"
                            label="Prerequisites"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={(e) => setPrerequisites(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseDuration"
                            label="Duration"
                            variant="outlined"
                            onChange={(e) => setDuration(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseQualifications"
                            label="Qualifications"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={(e) => setQualifications(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseExperience"
                            label="Experience"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={(e) => setExperience(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="courseSyllabus"
                            label="Syllabus"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={(e) => setSyllabus(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Add Course
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddCoursesForm;

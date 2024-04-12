import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Modal from "@/app/components/modal";
import MaterialModal from "./MaterialModal"; // Import the MaterialModal component


const Courses = () => {
    const [courseName, setCourseName] = useState("");
    const [courseDepartment, setCourseDepartment] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [deletingCourse, setDeletingCourse] = useState(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [openStudentModal, setStudentModal] = useState(false);
    const [studentsInCourse, setStudentsInCourse] = useState([]);
    const [isLoadingStudents, setIsLoadingStudents] = useState(false); // Add loading state variable


    useEffect(() => {
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => setFilteredCourses(data));
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const applyFilters = () => {
        const filtered = filteredCourses.filter((course) => {
            return (
                course?.name.toLowerCase().includes(courseName.toLowerCase()) &&
                course?.department.toLowerCase().includes(courseDepartment.toLowerCase())
            );
        });
        setFilteredCourses(filtered);
    };

    const resetFilters = () => {
        setCourseName("");
        setCourseDepartment("");
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => setFilteredCourses(data));
    };

    const handleOpenModal = (course: any) => {
        setSelectedCourse(course);
        setOpenModal(true);
    };

    const [openMaterialModal, setOpenMaterialModal] = useState(false);

    // Function to open material modal
    const handleOpenMaterialModal = (course, event) => {
        event.stopPropagation();
        setSelectedCourse(course);
        setOpenMaterialModal(true);
    };

    // Function to close material modal
    const handleCloseMaterialModal = () => {
        setOpenMaterialModal(false);
    };


    const handleCloseStudentModal = () => {
        setSelectedCourse(null);
        setStudentModal(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenConfirmationModal = (course, event) => {
        event.stopPropagation();
        setDeletingCourse(course);
        setOpenConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setDeletingCourse(null);
        setOpenConfirmationModal(false);
    };

    const handleDeleteCourse = async () => {
        try {
            await axios.delete(`/api/deletecourse?postID=${deletingCourse.id}`);
            setFilteredCourses(prevPosts =>
                prevPosts.filter(post => post.id !== deletingCourse.id)
            );
            toast.success('Course Deleted');
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Course Failed to delete');
        }
        handleCloseConfirmationModal();
    };

    const handleStudentsButtonClick = async (course, event) => {
        event.stopPropagation();

        try {
            const response = await axios.get(`/api/getStCourse?id=${course.id}`);
            setStudentsInCourse(response.data);
            setStudentModal(true);
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('Failed to fetch students');
        } finally {
            setIsLoadingStudents(false); // Set loading state to false after fetching data
        }
    };

    const handleUnassignStudent = async (studentID, event) => {
        try {
            // Make an API call to unassign the student from the course
            await axios.get(`/api/unassignstudent?courseID=${selectedCourse.id}&studentID=${studentID}`);
            // Refresh the list of students in the course
            handleStudentsButtonClick(selectedCourse, event);
            toast.success('Student Unassigned');
        } catch (error) {
            console.error('Error unassigning student:', error);
            toast.error('Failed to unassign student');
        }
    };

    return (
        <>
            <div className="mx-8 h-screen">
                <div className="my-4">
                    <p className="my-2">Filter Courses</p>
                    <TextField
                        className="mr-2"
                        label="Search course name"
                        variant="outlined"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                    <TextField
                        className="mr-2"
                        label="Search course department"
                        variant="outlined"
                        value={courseDepartment}
                        onChange={(e) => setCourseDepartment(e.target.value)}
                    /> <br></br>
                    <Button
                        variant="contained"
                        color="primary"
                        className="mr-2 my-2"
                        onClick={applyFilters}
                    >
                        Apply
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </Button>
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Course Name</StyledTableCell>
                                    <StyledTableCell>Department</StyledTableCell>
                                    <StyledTableCell>Instructor</StyledTableCell>
                                    <StyledTableCell>Department Short</StyledTableCell>
                                    <StyledTableCell>Actions</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCourses.map((course) => (
                                    <StyledTableRow key={course?.id} onClick={() => handleOpenModal(course)} style={{ cursor: 'pointer' }}>
                                        <StyledTableCell>{course?.name}</StyledTableCell>
                                        <StyledTableCell>{course?.instructor}</StyledTableCell>
                                        <StyledTableCell>{course?.department}</StyledTableCell>
                                        <StyledTableCell>{course?.department_short}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button onClick={(e) => handleStudentsButtonClick(course, e)} variant="contained" color="primary" sx={{marginRight: '2px'}}>Students</Button>
                                            <Button onClick={(e) => handleOpenMaterialModal(course, e)} variant="contained" color="primary">Materials</Button> {/* Button to open material modal */}
                                            <Button onClick={(e) => handleOpenConfirmationModal(course, e)} variant="contained" color="secondary">Delete</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            {/* Confirmation Modal */}
            {deletingCourse && (
                <Dialog open={openConfirmationModal} onClose={handleCloseConfirmationModal}>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        <p>Are you sure you want to delete {deletingCourse?.name}?</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmationModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteCourse} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Students Modal */}
            <Dialog open={openStudentModal} onClose={handleCloseStudentModal}>
                <DialogTitle>Students in {selectedCourse?.name}</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Student Name</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {studentsInCourse.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            {isLoadingStudents ? (
                                                <CircularProgress />
                                            ) : (
                                                "No students found"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    studentsInCourse.map((student) => (
                                        <StyledTableRow key={student.RollNumber}>
                                            <StyledTableCell>{student.FirstName + ' ' + student.LastName}</StyledTableCell>
                                            <StyledTableCell>{student.Email}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button onClick={(e) => handleUnassignStudent(student.UserID, e)} variant="contained" color="secondary">Unassign</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStudentModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Material Modal */}
            <MaterialModal
                open={openMaterialModal}
                onClose={handleCloseMaterialModal}
                course={selectedCourse}
            />
            {/* Render Modal component */}
            <Modal open={openModal} onClose={handleCloseModal} course={selectedCourse} />
        </>
    );
};

export default Courses;

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
import Modal from "@/app/components/modal";
import { Container, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Courses = () => {
    const [courseName, setCourseName] = useState("");
    const [courseDepartment, setCourseDepartment] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null); // State to store selected course
    const [openModal, setOpenModal] = useState(false); // State to control modal open/close
    const [deletingCourse, setDeletingCourse] = useState(null); // State to store the course being deleted
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false); // State to control confirmation modal

    useEffect(() => {
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => setFilteredCourses(data));
    }, []);

    // Function to handle applying filters
    const applyFilters = () => {
        // Filter the courses based on the search criteria
        const filtered = filteredCourses.filter((course: any) => {
            return (
                course?.name.toLowerCase().includes(courseName.toLowerCase()) &&
                course?.department.toLowerCase().includes(courseDepartment.toLowerCase())
            );
        });
        setFilteredCourses(filtered);
    };

    // Function to handle resetting filters
    const resetFilters = () => {
        setCourseName("");
        setCourseDepartment("");
        fetch('/api/courses')
            .then(response => response.json())
            .then(data => setFilteredCourses(data));
    };

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
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // Function to handle opening modal and setting selected course
    const handleOpenModal = (course: any) => {
        setSelectedCourse(course);
        setOpenModal(true);
    };

    // Function to handle closing modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenConfirmationModal = (course: any, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Stop event propagation
        setDeletingCourse(course);
        setOpenConfirmationModal(true);
    };

    // Function to handle closing confirmation modal
    const handleCloseConfirmationModal = () => {
        setDeletingCourse(null);
        setOpenConfirmationModal(false);
    };

    // Function to handle deleting a course
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
            // Handle error
        }
        handleCloseConfirmationModal();
    };

    return (
        <>
            <Container>
                <div className="container mx-auto h-screen">
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
                                        <StyledTableCell>Actions</StyledTableCell> {/* Add a new column for actions */}
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCourses.map((course: any) => (
                                        <StyledTableRow key={course?.id} onClick={() => handleOpenModal(course)} style={{ cursor: 'pointer' }}>
                                            <StyledTableCell>{course?.name}</StyledTableCell>
                                            <StyledTableCell>{course?.instructor}</StyledTableCell>
                                            <StyledTableCell>{course?.department}</StyledTableCell>
                                            <StyledTableCell>{course?.department_short}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button onClick={(e) => handleOpenConfirmationModal(course, e)} variant="contained" color="secondary">Delete</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Container>

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

            {/* Details Modal */}
            <Modal open={openModal} onClose={handleCloseModal} course={selectedCourse} />
        </>
    );
};

export default Courses;

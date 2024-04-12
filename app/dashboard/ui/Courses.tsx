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
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import Modal from "@/app/components/modal";
import MaterialModal from "./MaterialModal";


const Courses = ({ session }: { session: any }) => {
    const [courseName, setCourseName] = useState("");
    const [courseDepartment, setCourseDepartment] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [tasksCompleted, setTasksCompleted] = useState([]);
    const [deletingCourse, setDeletingCourse] = useState(null);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [isLoadingStudents, setIsLoadingStudents] = useState(false); // Add loading state variable


    useEffect(() => {
        fetch(`/api/mycourses?id=${session?.user?.email}`)
            .then(response => response.json())
            .then(data => setFilteredCourses(data));

    }, []);
    useEffect(() => {
        fetch(`/api/getTaskCompleted?id=${session?.user?.email}`)
            .then(response => response.json())
            .then(data => setTasksCompleted(data));

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


    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseConfirmationModal = () => {
        setDeletingCourse(null);
        setOpenConfirmationModal(false);
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
                                            <Button onClick={(e) => handleOpenMaterialModal(course, e)} variant="contained" color="primary">Materials</Button> {/* Button to open material modal */}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </div>
            </div>


            {/* Material Modal */}
            <MaterialModal
                open={openMaterialModal}
                onClose={handleCloseMaterialModal}
                course={selectedCourse}
                email={session?.user?.email}
                tasksCompleted={tasksCompleted}
                
            />
            {/* Render Modal component */}
            <Modal open={openModal} onClose={handleCloseModal} course={selectedCourse}  />
        </>
    );
};

export default Courses;

// pages/courses.tsx
'use client'

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
import Header from "../components/header";
import Footer from "../components/footer";
import Modal from "../components/modal";

const Courses = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDepartment, setCourseDepartment] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // State to store selected course
  const [openModal, setOpenModal] = useState(false); // State to control modal open/close

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

  return (
    <>
      <div className="container mx-auto">
        <Header />
      </div>
      <div className="mx-auto">
        <div className="bg-gray-200 p-4">
          <h1 className="text-3xl font-bold">Courses</h1>
        </div>
      </div>
      <br />
      <hr />
      <br />
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
          <h2 className="text-xl font-bold mb-2">All Courses</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Course Name</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Instructor</StyledTableCell>
                  <StyledTableCell>Department Short</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredCourses.map((course: any) => (
                  <StyledTableRow key={course?.id} onClick={() => handleOpenModal(course)} style={{ cursor: 'pointer' }}>
                    <StyledTableCell>{course?.name}</StyledTableCell>
                    <StyledTableCell>{course?.instructor}</StyledTableCell>
                    <StyledTableCell>{course?.department}</StyledTableCell>
                    <StyledTableCell>{course?.department_short}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
      {/* Render Modal component */}
      <Modal open={openModal} onClose={handleCloseModal} course={selectedCourse} />
    </>
  );
};

export default Courses;

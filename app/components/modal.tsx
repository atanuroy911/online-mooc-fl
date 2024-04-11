// components/Modal.tsx
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  course: any; // Course object containing detailed information
}

const Modal: React.FC<ModalProps> = ({ open, onClose, course }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{course?.name}</DialogTitle>
      <DialogContent>
        <p><strong>Department:</strong>  {course?.department}</p>
        <p><strong>Department Short:</strong> {course?.department_short}</p>
        <p><strong>Instructor:</strong> {course?.instructor}</p>
        <p><strong>Course Credits:</strong> {course?.credits}</p>
        <p><strong>Duration:</strong> {course?.duration}</p>
        <p><strong>Learning Objectives:</strong><br></br> {course?.learning_objectives}</p>
        <p><strong>Prerequisites:</strong><br></br> {course?.prerequisites}</p>
        <p><strong>Content:</strong><br></br> {course?.content}</p>
        <p><strong>Qualifications:</strong><br></br> {course?.qualifications}</p>
        <p><strong>Experience:</strong><br></br> {course?.experience}</p>
        <p><strong>Syllabus:</strong><br></br> {course?.syllabus}</p>
        {/* Add more details as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;

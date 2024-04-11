import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

interface EditPostModalProps {
  post: any; // Assuming Post type is defined
  onClose: () => void;
  onPostEdited: (editedPost: any) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, onClose, onPostEdited }) => {
  const [editedSubject, setEditedSubject] = useState(post.Subject);
  const [editedContent, setEditedContent] = useState(post.Content);

  const handleEditPost = async () => {
    console.log(post);
    
    try {
      const response = await axios.put(`/api/updatepost`, {
        postId: post.PostID,
        subject: editedSubject,
        content: editedContent,
      });
  
      onPostEdited(response.data); // Assuming the backend returns the edited post
      onClose();
    } catch (error) {
      console.error('Error editing post:', error);
      // Handle error
    }
  };
  

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        maxWidth: 600,
        maxHeight: '80vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h4" gutterBottom>Edit Post</Typography>
        <TextField
          sx={{ mt: 2, width: '100%' }}
          variant="outlined"
          label="Subject"
          value={editedSubject}
          onChange={(e) => setEditedSubject(e.target.value)}
        />
        <TextField
          sx={{ mt: 2, width: '100%' }}
          variant="outlined"
          label="Content"
          multiline
          rows={6}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleEditPost}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 2, ml: 2 }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default EditPostModal;

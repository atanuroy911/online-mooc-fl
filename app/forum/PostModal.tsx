import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import CommentList from './Comments';

const PostModal = ({ post, onClose, session }: { post: any, onClose: any, session: any }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false); // Initialize loading state

  function formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  useEffect(() => {
    fetchData();
  }, [post]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(`/api/getcomments?postID=${post?.PostID}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Handle error
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
      console.log(post);
      
    }
  };

  const handleAddComment = async () => {
    setLoading(true); // Set loading to true when adding comment
    try {
      const response = await axios.post('/api/addcomment', {
        postID: post.PostID,
        comment: commentText,
        createdBy: session.user.username
      });
      console.log("Comment added successfully:", response.data);
      setCommentText(""); // Clear comment text
      fetchData(); // Fetch updated comments
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle error
    } finally {
      setLoading(false); // Set loading to false after adding comment
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
        <Typography variant="h4" gutterBottom>{post.Subject}</Typography>
        <Typography variant="subtitle2" gutterBottom color="textSecondary">Published on: {formatTime(post?.CreationDate)}</Typography>
        <Typography variant="body1" gutterBottom>{post.Content}</Typography>
        <hr />
        <Typography variant="h5" gutterBottom>Comments</Typography>
        <CommentList comments={comments} loading={loading} /> {/* Pass loading prop */}
        <TextField
          sx={{ mt: 2, width: '100%' }}
          variant="outlined"
          label="Add a comment"
          multiline
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </Box>
    </Modal>
  );
};

export default PostModal;

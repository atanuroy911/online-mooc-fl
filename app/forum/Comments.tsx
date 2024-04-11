import React from 'react';
import { Typography, CircularProgress } from '@mui/material';

interface Comment {
  CommentID: number;
  PostID: number;
  Comment: string;
  CreatedBy: string;
  CreatedAt: string;
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

interface CommentListProps {
  comments: Comment[];
  loading: boolean; // Add loading prop
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading }) => {
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress  />
        </div>
      ) : comments.length === 0 ? (
        <div className="flex justify-center items-center">
          <p>No comments available.</p>
        </div>
      ) : (
        comments.map((comment: Comment, index: number) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Typography variant="body2" gutterBottom>{comment.Comment}</Typography>
            <Typography variant="caption" color="textSecondary">
              Commented by {comment.CreatedBy} on {formatTime(comment.CreatedAt)}
            </Typography>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;

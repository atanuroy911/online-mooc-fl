import React, { useState, useEffect } from 'react';
import { CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddPostModal from './ui/AddPostModal';
import Header from './Header';
import axios from 'axios';
import PostModal from './PostModal';
import EditPostModal from './ui/EditPostModal';

interface Post {
  PostID: number;
  Subject: string;
  CreatedBy: string;
  CreatedAt: string;

}

interface Session {
  user: {
    username: string;
  };
}

interface PostProps {
  admin: boolean
}

const Posts: React.FC<PostProps> = ({ admin }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (admin) {
          const response = await axios.get('/api/adcheck');
          if (response.status === 200) {
            setSession(response.data.session);
          }
        }
        else {
          const response = await axios.get('/api/check');
          if (response.status === 200) {
            setSession(response.data.session);
          }
        }
        console.log(session);

      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data: Post[] = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const handleDeletePost = (post: Post) => {
    setSelectedPost(post);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowPostModal(false);
    setShowEditModal(false);
  };

  const handlePostAdded = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handlePostEdited = (editedPost: Post) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.PostID === editedPost.PostID ? editedPost : post
      )
    );
    setShowEditModal(false);
  };

  const handlePostDeleted = async () => {
    try {
      if (!selectedPost) return;
      await axios.delete(`/api/deletepost?postID=${selectedPost.PostID}`);
      setPosts(prevPosts =>
        prevPosts.filter(post => post.PostID !== selectedPost.PostID)
      );
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error
    }
  };

  return (
    <div>
      <Header />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p>No posts available.</p>
        </div>
      ) : (
        <div className="px-8">
          {posts.map(post => (
            <div key={post?.PostID} className="border-b border-gray-300 py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{post?.Subject}</h2>
                  <p>Created By: {post?.CreatedBy}</p>
                  <p>{post?.CreatedAt}</p>
                </div>
                <div>
                  <Button variant="contained" color="primary" onClick={() => handlePostClick(post)}>View</Button>
                  {session && session?.user?.username === post.CreatedBy && (
                    <>
                      <Button variant="contained" color="warning" onClick={() => handleEditPost(post)}>Edit</Button>
                      <Button variant="contained" color="error" onClick={() => handleDeletePost(post)}>Delete</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <br />
      <Button onClick={() => setShowModal(true)} variant="contained" color="primary" className="px-4 py-2 rounded-md mx-4 my-4 right-8 bottom-2 float-right">Add New Post</Button>
      {showPostModal && <PostModal post={selectedPost} onClose={handleCloseModal} session={session} />}
      {showEditModal && <EditPostModal post={selectedPost} onClose={handleCloseModal} onPostEdited={handlePostEdited} />}
      {showModal && <AddPostModal onClose={handleCloseModal} onPostAdded={handlePostAdded} session={session} />}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)}>Cancel</Button>
          <Button onClick={handlePostDeleted} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Posts;

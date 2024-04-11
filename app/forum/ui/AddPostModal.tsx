import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AddPostModal = ({ onClose, onPostAdded, session }: { onClose: any, onPostAdded: any, session: any }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const handleAddPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Get user's name from session
            let createdBy = session.user.username;

            const response = await axios.post('/api/addpost', { subject, content, createdBy });

            if (response.status === 200 || response.status === 201) {
                toast.success('Posted Successfully');
                const newPost = response.data; // Assuming the response contains the newly added post data
                onPostAdded(newPost); // Call the callback function with the new post data
                onClose();
            } else {
                toast.error('Error posting');
            }
        } catch (error) {
            console.log(error);
            
            toast.error('Error posting');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md w-96">
                <form onSubmit={handleAddPost}>
                    <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        placeholder="Subject"
                        className="w-full border border-gray-300 rounded-md p-3 mb-4"
                    />
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Enter your post content..."
                        className="w-full h-40 border border-gray-300 rounded-md p-3 mb-4"
                    ></textarea>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
                            Add Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPostModal;

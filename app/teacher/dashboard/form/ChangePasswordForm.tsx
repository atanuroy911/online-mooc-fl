// components/ChangePasswordForm.tsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const ChangePasswordForm = ({ session }: { session: any }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const response = await axios.post('/api/change-password-teacher', {
                email: session.user.email, // Replace userId with the actual userId
                newPassword: password
            });

            if (response.data && response.data.message) {
                toast.success(response.data.message);
                setPassword('');
                setConfirmPassword('');
            } else {
                toast.error('Failed to change password');
            }
        } catch (error) {
            toast.error('Failed to change password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type="password"
                label="New Password"
                value={password}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                type="password"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={handleConfirmChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Change Password
            </Button>
        </form>
    );
};

export default ChangePasswordForm;

// pages/account-settings.tsx
import React from 'react';
import ChangePasswordForm
 from '../form/ChangePasswordForm';
const AccountSettings = ({ session }: { session: any }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
      <ChangePasswordForm session={session} />
    </div>
  );
};

export default AccountSettings;

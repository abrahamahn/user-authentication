import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/Pages/Accounts/ResetPassword/ResetPassword.module.css';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Pass the necessary data, such as newPassword and the reset token, in the request body.
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setMessage(data.message);
      // Optionally, redirect the user to the login page after a successful password reset.
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className={styles.reset_password_container} onSubmit={handleResetPassword}>
      {/* Add input fields and elements for the new password */}
      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.message}>{message}</div>}
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;

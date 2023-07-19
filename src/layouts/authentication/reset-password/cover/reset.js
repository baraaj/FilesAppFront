import React, { useState } from 'react';
import axios from 'axios';

function ResetPasswordForm({ token }) {
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7213/api/Account/reset-password/confirm', {
        token: token,
        newPassword: newPassword
      });

      if (response.status === 200) {
        setSuccess(true);
        setError('');
      } else {
        setSuccess(false);
        setError('Password modification failed');
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      {success && <p>Password modified successfully</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <button type="submit">Modify Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;

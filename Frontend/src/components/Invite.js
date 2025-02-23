import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLoading } from '../context/LoadingContext';

const InviteContainer = styled.div`
  /* Add styles here */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Invite = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleInvite = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      const response = await axios.post('/api/invite', { email });
      setMessage(`Invitation sent to ${email}`);
      setEmail('');
    } catch (error) {
      console.error('Error sending invitation', error);
      setMessage('Failed to send invitation');
    } finally {
      stopLoading();
    }
  };

  return (
    <InviteContainer>
      <h2>Invite</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Form onSubmit={handleInvite}>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Send Invite</Button>
          </Form>
          {message && <p>{message}</p>}
        </>
      )}
    </InviteContainer>
  );
};

export default Invite;

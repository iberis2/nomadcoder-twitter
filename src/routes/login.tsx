import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/auth-components';
import GithubButton from '../components/github-button';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading) return;
    if (!inputValue.email || !inputValue.password) {
      setError('Please fill out all fields');
      return;
    }
    try {
      setIsLoading(true);
      // login
      await signInWithEmailAndPassword(auth, inputValue.email, inputValue.password);
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log into 𝕏 </Title>
      <Form onSubmit={onSubmit}>
        <Input
          name='email'
          onChange={onChange}
          value={inputValue.email}
          type='email'
          placeholder='Email'
          required
        />
        <Input
          name='password'
          onChange={onChange}
          value={inputValue.password}
          type='password'
          placeholder='Password'
          required
        />
        <Input type='submit' value={isLoading ? 'Loading...' : 'Log in'} disabled={isLoading} />
      </Form>
      {error && <Error>{error}</Error>}
      <Switcher>
        Don't have an account? <Link to='/create-account'>Create one</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}

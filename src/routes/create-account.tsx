import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/auth-components';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState({
    name: '',
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
    if (!inputValue.email || !inputValue.password || !inputValue.name) {
      setError('Please fill out all fields');
      return;
    }
    try {
      setIsLoading(true);
      // create account
      const credential = await createUserWithEmailAndPassword(
        auth,
        inputValue.email,
        inputValue.password,
      );
      console.log(credential.user);
      await updateProfile(credential.user, { displayName: inputValue.name });
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
      <Title>Join 𝕏 </Title>
      <Form onSubmit={onSubmit}>
        <Input
          name='name'
          onChange={onChange}
          value={inputValue.name}
          type='text'
          placeholder='Name'
          required
        />
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
        <Input
          type='submit'
          value={isLoading ? 'Loading...' : 'Create Account'}
          disabled={isLoading}
        />
      </Form>
      {error && <Error>{error}</Error>}
      <Switcher>
        Already have an account? <Link to='/login'>Log in</Link>
      </Switcher>
    </Wrapper>
  );
}

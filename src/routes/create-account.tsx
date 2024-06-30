import { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Form = styled.form`
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

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
      console.error(error);
      // setError(error);
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
    </Wrapper>
  );
}

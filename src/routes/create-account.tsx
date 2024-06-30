import { useState } from 'react';
import styled from 'styled-components';

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
    console.log(inputValue);
    // setIsLoading(true);
    try {
      // create account
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
        <Input type='submit' value={isLoading ? 'Loading...' : 'Create Account'} />
      </Form>
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
}

import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Textarea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(event.target.value);
  };

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <Form>
      <Textarea
        onChange={onChange}
        value={tweet}
        rows={5}
        maxLength={180}
        placeholder='What is Happening'
      />
      <AttachFileButton htmlFor='file'>{file ? 'Photo Added ✅' : 'Add photo'}</AttachFileButton>
      <AttachFileInput onChange={onChangeFile} type='file' id='file' accept='image/*' />
      <SubmitButton
        type='submit'
        value={isLoading ? 'Posting...' : 'Post Tweet'}
        disabled={isLoading}
      />
    </Form>
  );
}

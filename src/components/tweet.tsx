import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import { ITweet } from './time-line';
import styled from 'styled-components';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const Column = styled.div``;
const Username = styled.div`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.input`
  margin: 10px 0px;
  font-size: 18px;
  background-color: transparent;
  color: white;
`;

const EditPhoto = styled.input`
  display: none;
`;
const Label = styled.label``;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Flex = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: skyblue;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({ username, tweet, photo, userId, id }: ITweet) {
  const [editMode, setEditMode] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [tweetValue, setTweetValue] = useState('');
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onEdit = async () => {
    if (!editMode || !user) return;
    try {
      await updateDoc(doc(db, 'tweets', id), { tweet: tweetValue });
      if (photoFile) {
        const photoRef = ref(storage, `tweets/${user?.uid}-${user.displayName}/${id}`);
        await uploadBytes(photoRef, photoFile);
        setPhotoFile(null);
      }
    } catch (e) {
      console.error(e);
    }
    setEditMode(false);
  };

  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setPhotoFile(files[0]);
    }
  };

  useEffect(() => {
    setTweetValue(tweet);
  }, [tweet]);

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload
          value={tweetValue}
          onChange={e => setTweetValue(e.target.value)}
          disabled={!editMode}
        />
        {user?.uid === userId && (
          <Flex>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            <EditButton onClick={editMode ? onEdit : () => setEditMode(true)}>Edit</EditButton>
          </Flex>
        )}
      </Column>
      <Column>
        {photo && (
          <Label htmlFor='edit-photo'>
            <Photo src={photo} />
            <EditPhoto
              onChange={onChangePhoto}
              id='edit-photo'
              type='file'
              accept='image/*'
              disabled={!editMode}
            />
          </Label>
        )}
      </Column>
    </Wrapper>
  );
}

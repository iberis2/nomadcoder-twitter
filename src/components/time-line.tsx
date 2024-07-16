import { collection, getDocs, onSnapshot, orderBy, query, Unsubscribe } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import Tweet from './tweet';
import { limit } from 'firebase/firestore';

export interface ITweet {
  photo?: string;
  tweet: string;
  username: string;
  createdAt: number;
  userId: string;
  id: string;
}

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
`;

export default function TimeLine() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(collection(db, 'tweets'), orderBy('createdAt', 'desc'), limit(25));
      // const snapShot = await getDocs(tweetsQuery);
      // const tweets = snapShot.docs.map(doc => {
      //   const { photo, tweet, username, createdAt, userId } = doc.data();
      //   return { id: doc.id, photo, tweet, username, createdAt, userId };
      // });
      unsubscribe = await onSnapshot(tweetsQuery, snapShot => {
        const tweets = snapShot.docs.map(doc => {
          const { photo, tweet, username, createdAt, userId } = doc.data();
          return { id: doc.id, photo, tweet, username, createdAt, userId };
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return (
    <Wrapper>
      {tweets?.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

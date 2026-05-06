import { memo, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import UserCard from './UserCard';

const Feed = () => {

  const feed = useAppSelector((store) => store.feed);

  const dispatch = useAppDispatch();

  const getfeed = async () => {
    try {

      if (feed) return;

      const res = await axios.get(
        BASE_URL + "/user/request/feed",
        {
          withCredentials: true,
        }
      );

      dispatch(addFeed(res.data));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  return (
    feed && (
      <div className='flex justify-center my-15'>
        <UserCard user={feed[0]} />
      </div> 
    )     
    
  );
};

export default memo(Feed);
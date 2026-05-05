import { memo } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {
  const getfeed =  async () =>{

    const feed = useSelector( (store) => store.feed)
    const dispatch = useDispatch();
     const res = await axios.get(BASE_URL + "/feed");
    dispatch(addFeed(res.data));


  }




  return (
    <>
        
    </>
  );
};

export default memo(Feed);
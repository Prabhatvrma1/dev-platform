import axios from 'axios';
import { memo, useEffect } from 'react';
import { BASE_URL } from '../utils/constants';

  const Connection = () => {
    const fetchConnection = async () => {
        try{
            const res = await axios.get(BASE_URL + "/connection" , {
                withCredentials: true,
            });
        

        }
        catch( err){
            throw new Error("somethinig weny worng");
        }
    };

    useEffect(() =>{
        fetchConnection();
    })

  return (
    <div>
      <h2>Connection</h2>
    </div>
  );
};

export default memo(Connection);
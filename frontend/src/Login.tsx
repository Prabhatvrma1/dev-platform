import axios from 'axios';
import { memo } from 'react';
import {useState} from 'react';
const Login = () => {
  const [emailid , setemailid] = useState("test@gmail.com");
  const [password, setpassword] = useState("Test@1234"); 
  const handle = async () => {
    try{
      const res = await axios.post("http://localhost:3000/login" , {
      email: emailid,
      password
    },
  {
    withCredentials: true
  })
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <div className='flex justify-around p-10'>
      {/* login caard */}
      <div className="card card-dash bg-base-200 w-96">
          <div className="card-body">
            <h2 className="card-title">Login Page</h2>
            <div className='mt-4'>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email id</legend>
                    <input type="text" value={emailid} className="input" placeholder="Type here" 
                      onChange= {(e) => setemailid(e.target.value)}
                    />
                  </fieldset>
              <div className='mt-2'>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="text" value={password} className="input" placeholder="Type here" 
                      onChange= {(e) => setpassword(e.target.value)}
                    />
                  </fieldset>
              </div>

            </div>
            <div className="card-actions justify-around mt-5">
              <button className="btn btn-primary" onClick={handle}>Login</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default memo(Login);
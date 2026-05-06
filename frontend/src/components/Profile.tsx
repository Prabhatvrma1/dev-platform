import { memo } from 'react';
import EditProfile from './EditProfile';
import UserCard from './UserCard';
import { useAppSelector } from '../hooks';

const Profile = () => {

  const user = useAppSelector((store) => store.user);

  if (!user) {
    return (
      <div className="text-center mt-10 text-2xl">
        No User Found
      </div>
    );
  }

  return (

    <div className="flex justify-center items-start gap-10 my-10 flex-wrap">

      <div className="w-full max-w-md">
        <EditProfile />
      </div>

      <div className="sticky top-24">
        <UserCard user={user} />
      </div>

    </div>

  );
};

export default memo(Profile);
import { memo, useState } from 'react';
import EditProfile from './EditProfile';
import { useAppSelector } from '../hooks';

const Profile = () => {

  const user = useAppSelector((store) => store.user.currentUser);

  const [showEdit, setShowEdit] = useState(false);

  if (!user) {
    return (
      <div className="text-center mt-10 text-2xl">
        No User Found
      </div>
    );
  }

  return (
    <>

      {!showEdit ? (

        <div className="flex justify-center my-10">

          <div className="card bg-base-100 w-96 shadow-xl">

            <figure className="h-80 overflow-hidden">
              <img
                src={
                  user.photourl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="user"
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">

              <h2 className="card-title text-3xl">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-lg">
                Email: {user.email}
              </p>

              <p className="text-lg">
                Age: {user.age || "N/A"}
              </p>

              {user.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">

                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary"
                    >
                      {skill}
                    </span>
                  ))}

                </div>
              )}

              <div className="card-actions justify-center mt-5">

                <button
                  className="btn btn-primary w-full"
                  onClick={() => setShowEdit(true)}
                >
                  Edit Profile
                </button>

              </div>

            </div>

          </div>

        </div>

      ) : (

        <EditProfile />

      )}

    </>
  );
};

export default memo(Profile);
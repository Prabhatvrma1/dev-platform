import { memo } from 'react';

interface User {
  firstName: string;
  lastName: string;
  photourl?: string;
  age?: number;
  skills?: string[];
}

const UserCard = ({ user }: { user: User }) => {

  if (!user) return null;

  return (
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

        <h2 className="card-title text-2xl">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm text-gray-500">
          Age: {user.age || "N/A"}
        </p>

        {user.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
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

        <div className="card-actions justify-between mt-5">

          <button className="btn btn-secondary">
            Ignore
          </button>

          <button className="btn btn-success">
            Interested
          </button>

        </div>

      </div>
    </div>
  );
};

export default memo(UserCard);
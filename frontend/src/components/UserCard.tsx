import { memo } from 'react';
import type { User } from '../utils/userSlice';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {

  if (!user) return null;

  return (
    <div className="card bg-base-200 w-96 shadow-2xl">

      <figure className="h-[350px] overflow-hidden">
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

        <p className="text-gray-400">
          {user.age || "N/A"}, {user.gender || "Others"}
        </p>

        <p className="mt-4 text-sm">
          {user.about || "No about added yet"}
        </p>

        {user.skills && user.skills.length > 0 && (
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

        <div className="card-actions justify-center mt-6 gap-4">

          <button className="btn btn-primary">
            Ignore
          </button>

          <button className="btn btn-secondary">
            Interested
          </button>

        </div>

      </div>

    </div>
  );
};

export default memo(UserCard);
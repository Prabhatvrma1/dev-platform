import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

  const user = useAppSelector((store) => store.user.currentUser);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photourl, setPhotoUrl] = useState(user?.photourl || "");
  const [age, setAge] = useState(user?.age || "");
  const [skills, setSkills] = useState(
    user?.skills?.join(", ") || ""
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const saveProfile = async () => {
    try {

      setError("");
      setSuccess("");

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photourl,
          age,
          skills: skills.split(",").map((s) => s.trim()),
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));

      setSuccess("Profile updated successfully");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (err: any) {

      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Something went wrong"
      );

    }
  };

  return (
    <div className="flex justify-center my-10">

      <div className="card bg-base-200 w-96 shadow-xl">

        <div className="card-body">

          <h2 className="card-title justify-center text-3xl mb-4">
            Edit Profile
          </h2>

          <fieldset className="fieldset">

            <legend className="fieldset-legend">
              First Name
            </legend>

            <input
              type="text"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

          </fieldset>

          <fieldset className="fieldset mt-3">

            <legend className="fieldset-legend">
              Last Name
            </legend>

            <input
              type="text"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

          </fieldset>

          <fieldset className="fieldset mt-3">

            <legend className="fieldset-legend">
              Photo URL
            </legend>

            <input
              type="text"
              className="input input-bordered w-full"
              value={photourl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />

          </fieldset>

          <fieldset className="fieldset mt-3">

            <legend className="fieldset-legend">
              Age
            </legend>

            <input
              type="number"
              className="input input-bordered w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

          </fieldset>

          <fieldset className="fieldset mt-3">

            <legend className="fieldset-legend">
              Skills
            </legend>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="React, Node, MongoDB"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

          </fieldset>

          {error && (
            <p className="text-red-500 mt-3 text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-500 mt-3 text-center">
              {success}
            </p>
          )}

          <div className="card-actions justify-center mt-5">

            <button
              className="btn btn-primary w-full"
              onClick={saveProfile}
            >
              Save Profile
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default memo(EditProfile);
import { memo, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {

  const user = useAppSelector((store) => store.user.currentUser);

  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photourl, setPhotoUrl] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {

    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoUrl(user.photourl || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setAbout(user.about || "");
    setSkills(user.skills?.join(", ") || "");

  }, [user]);

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
          gender,
          about,
          skills: skills
            .split(",")
            .map((s) => s.trim()),
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));

      setSuccess("Profile updated successfully");

    } catch (err: any) {

      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Something went wrong"
      );

    }
  };

  return (

    <div className="card bg-base-200 shadow-2xl">

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
            Gender
          </legend>

          <input
            type="text"
            className="input input-bordered w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

        </fieldset>

        <fieldset className="fieldset mt-3">

          <legend className="fieldset-legend">
            About
          </legend>

          <textarea
            className="textarea textarea-bordered w-full"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
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

  );
};

export default memo(EditProfile);
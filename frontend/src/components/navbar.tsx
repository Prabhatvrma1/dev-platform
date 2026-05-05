import { useAppSelector, useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useAppSelector((store) => store.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="navbardiv">
      <div className="navbar bg-base-300 shadow-sm px-4">

        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">Dev Tinder</Link>
        </div>

        {user && (
          <p className="mr-8 text-lg font-semibold">
            Welcome, {user.firstName.toUpperCase()}
          </p>
        )}

        <div className="flex gap-2 items-center">
          {user ? (
            <div className="dropdown dropdown-end mr-3">

              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="user"
                    src={
                      user.photourl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50"
              >
                <li>
                  <a onClick={() => navigate("/profile")}>
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a onClick={() => navigate("/settings")}>
                    Settings
                  </a>
                </li>
                <li>
                  <a onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>

            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary"
            >
              Login
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
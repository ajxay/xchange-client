import { useEffect, useState } from "react";
import logo from "../../logo/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user, "profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  console.log(user, location, "user");

  if (location.pathname === "/" && user === null) {
    console.log(user, "user");
    return null;
  }

  return (
    <nav className="w-full bg-slate-900 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-0 md:block">
            <a>
              {/* <h2 className="text-2xl text-slate-400 font-bold">Xchange</h2> */}
              <Link to="/">
                <img src={logo} alt="" className="h-20" />
              </Link>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-blue-600">
                {user === null ? (
                  <Link to="/">Home</Link>
                ) : (
                  <Link to="/posts">Home</Link>
                )}
              </li>
              {/* <li className="text-gray-600 hover:text-blue-600">
                <a href="javascript:void(0)">Blog</a>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <a href="javascript:void(0)">About US</a>
              </li> */}
              {user ? (
                <>
                  <li className="text-gray-600 hover:text-blue-600"></li>
                  <li
                    onClick={logout}
                    className="cursor-pointer text-gray-600 hover:text-blue-600"
                  >
                    Logout
                  </li>
                </>
              ) : (
                <li className="text-gray-600 hover:text-blue-600">
                  <Link to="/auth">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

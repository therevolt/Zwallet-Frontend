import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default function SideMenu() {
  const [active, setActive] = useState(false);
  const classes = "my-5 cursor-pointer menu-active";
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    let location = window.location.href.split("/")[3];
    if (location === "history" || location === "home") location = "dashboard";
    setActive(location);
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    setActive(e.target.id);
    const path = e.target.id === "dashboard" ? "home" : e.target.id;
    router.push(`/${path}`);
  };

  const Logout = () => {
    router.push("/");
    localStorage.removeItem("token");
    document.cookie = "";
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="side-menu position-relative" style={{ height: "100%" }}>
      <ul className="my-5">
        <li
          className={active === "dashboard" ? classes : "my-5 cursor-pointer"}
          onClick={onClick}
          id="dashboard"
        >
          <span className="icon mx-3 ms-4" onClick={onClick} id="dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M11.6667 3.5H3.5V11.6667H11.6667V3.5Z"
                stroke={active === "dashboard" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.4999 3.5H16.3333V11.6667H24.4999V3.5Z"
                stroke={active === "dashboard" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.4999 16.333H16.3333V24.4997H24.4999V16.333Z"
                stroke={active === "dashboard" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 16.333H3.5V24.4997H11.6667V16.333Z"
                stroke={active === "dashboard" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={active === "dashboard" ? "primary-text" : "text-gray"}
            onClick={onClick}
            id="dashboard"
          >
            Dashboard
          </span>
        </li>
        <li
          className={active === "transfer" ? classes : "my-5 cursor-pointer"}
          onClick={onClick}
          id="transfer"
        >
          <span className="icon mx-3" onClick={onClick} id="transfer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14 22.1663V5.83301"
                stroke={active === "transfer" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83337 13.9997L14 5.83301L22.1667 13.9997"
                stroke={active === "transfer" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            onClick={onClick}
            id="transfer"
            className={active === "transfer" ? "primary-text" : "text-gray"}
          >
            Transfer
          </span>
        </li>
        <li
          className={active === "topup" ? classes : "my-5 cursor-pointer"}
          onClick={onClick}
          id="topup"
        >
          <span className="icon mx-3" onClick={onClick} id="topup">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14 5.83301V22.1663"
                stroke={active === "topup" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83337 14H22.1667"
                stroke={active === "topup" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={active === "topup" ? "primary-text" : "text-gray"}
            onClick={onClick}
            id="topup"
          >
            Top Up
          </span>
        </li>
        <li
          className={active === "profile" ? classes : "my-5 cursor-pointer"}
          onClick={onClick}
          id="profile"
        >
          <span className="icon mx-3" onClick={onClick} id="profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M23.3333 24.5V22.1667C23.3333 20.929 22.8416 19.742 21.9665 18.8668C21.0913 17.9917 19.9043 17.5 18.6666 17.5H9.33329C8.09562 17.5 6.90863 17.9917 6.03346 18.8668C5.15829 19.742 4.66663 20.929 4.66663 22.1667V24.5"
                stroke={active === "profile" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 12.8333C16.5774 12.8333 18.6667 10.744 18.6667 8.16667C18.6667 5.58934 16.5774 3.5 14 3.5C11.4227 3.5 9.33337 5.58934 9.33337 8.16667C9.33337 10.744 11.4227 12.8333 14 12.8333Z"
                stroke={active === "profile" ? "#6379F4" : "#3A3D42"}
                strokeOpacity="0.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={active === "profile" ? "primary-text" : "text-gray"}
            onClick={onClick}
            id="profile"
          >
            Profile
          </span>
        </li>
        {user?.role === "admin" && (
          <li
            className={active === "manage_user" ? classes : "my-5 cursor-pointer"}
            onClick={onClick}
            id="manage_user"
          >
            <span className="icon mx-3" onClick={onClick} id="manage_user">
              <img width="28" height="28" src="/user-list.svg" />
            </span>
            <span
              className={active === "manage_user" ? "primary-text" : "text-gray"}
              onClick={onClick}
              id="manage_user"
            >
              Manage User
            </span>
          </li>
        )}
      </ul>
      <div className="position-absolute bottom-0 mx-2 my-4 cursor-pointer" onClick={Logout}>
        <span className="icon mx-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M10.5 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H10.5"
              stroke="#3A3D42"
              strokeOpacity="0.8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.6666 19.8337L24.5 14.0003L18.6666 8.16699"
              stroke="#3A3D42"
              strokeOpacity="0.8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.5 14H10.5"
              stroke="#3A3D42"
              strokeOpacity="0.8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        Logout
      </div>
    </div>
  );
}

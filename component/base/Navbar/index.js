import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Popover, PopoverBody } from "reactstrap";
import Swal from "sweetalert2";
import axiosApiInstance from "../../../helper/axiosInstance";
import PhoneFormat from "../../../helper/phoneFormat";

export default function Navbar(props) {
  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (!user) {
        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/users`)
          .then((result) => {
            setUser(result.data.data);
          })
          .catch((err) => {
            if (err.response.data.message === "Token Expired") {
              localStorage.removeItem("user");
              router.push("/auth/login");
            } else {
              Swal.fire("Error", err.response.data.message, "error");
            }
          });
      }
    }
  }, []);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div
      style={
        props.type === "logged"
          ? {
              backgroundColor: "white",
              height: "100px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
              borderBottomLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }
          : { backgroundColor: "transparent", height: "100px" }
      }
      onMouseLeave={() => setPopoverOpen(false)}
    >
      <div
        className={
          props.type === "logged"
            ? "navbar-comp-logged container d-flex position-relative"
            : "navbar-comp container d-flex position-relative"
        }
      >
        <div
          className={
            props.type === "logged"
              ? "position-absolute mx-4 my-4 title-name primary-text"
              : "position-absolute mx-4 my-4 title-name text-white"
          }
        >
          Zwallet
        </div>
        {props.type === "logged" && user ? (
          <div className="d-flex position-absolute end-0 my-4">
            <div
              className="d-flex cursor-pointer"
              id="user-info"
              onClick={() => router.push("/profile")}
            >
              <img
                src={user.avatar}
                alt=""
                width="52px"
                height="52px"
                style={{ borderRadius: "10px" }}
              />
              <div className="d-flex flex-column mx-3">
                <span className="name fw-bold">
                  {user.firstName} {user.lastName}
                </span>
                <div className="number my-1" style={{ fontSize: "13px" }}>
                  {user.phone === "0" || !user.phone ? "-" : PhoneFormat(user.phone)}
                </div>
              </div>
            </div>
            <div className="mx-3 mt-2 icon-notif" id="icon-notif">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="#4D4B57"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="#4D4B57"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Popover placement="bottom" isOpen={popoverOpen} target="icon-notif" toggle={toggle}>
              <PopoverBody>
                <div className="d-flex flex-column">
                  <div className="history-notif">
                    <div className="title-day">Today</div>
                    <div className="card-history-notif d-flex py-3 px-2">
                      <div className="icon-history pe-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                        >
                          <path
                            d="M14 5.83366L14 22.167"
                            stroke="#1EC15F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22.1667 14.0003L14 22.167L5.83333 14.0003"
                            stroke="#1EC15F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="status-history-notif">Transfered from Joshua Lee</div>
                        <div className="balance-history-notif fw-bold">Rp2.000.000</div>
                      </div>
                    </div>
                    <div className="card-history-notif d-flex py-3 px-2">
                      <div className="icon-history pe-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                        >
                          <path
                            d="M14 5.83366L14 22.167"
                            stroke="#1EC15F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22.1667 14.0003L14 22.167L5.83333 14.0003"
                            stroke="#1EC15F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="status-history-notif">Transfered from Joshua Lee</div>
                        <div className="balance-history-notif fw-bold">Rp2.000.000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverBody>
            </Popover>
          </div>
        ) : (
          <div className="position-absolute end-0">
            <div className="d-flex justify-content-end">
              <div
                className="mx-2 my-4 btn-login cursor-pointer"
                id="login"
                onClick={() => router.push(`/auth/login`)}
              >
                <span>Login</span>
              </div>
              <div
                className="mx-2 my-4 btn-signup cursor-pointer"
                id="signup"
                onClick={() => router.push(`/auth/signup`)}
              >
                <span>Signup</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

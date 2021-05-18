import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Popover, PopoverBody } from "reactstrap";
import PhoneFormat from "../../../helper/phoneFormat";
import axiosInstance from "../../../helper/axiosInstance";
import Rupiah from "../../../helper/rupiah";
import { useSelector } from "react-redux";

export default function Navbar(props) {
  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState([]);
  const state = useSelector((states) => states.user.data);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(state);
      axiosInstance
        .get(`${process.env.NEXT_PUBLIC_URL_API}/trx/notif`)
        .then((result) => {
          setNotif(result.data.data);
        })
        .catch(() => {
          setNotif([]);
        });
    }
  }, [state]);

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
              ? "position-absolute mx-4 my-4 title-name primary-text d-sm-none d-md-block d-lg-block cursor-pointer"
              : "position-absolute mx-4 my-4 title-name text-white"
          }
        >
          Zwallet
        </div>
        <div
          className="d-sm-block d-md-none d-lg-none mx-4 my-4 cursor-pointer"
          onClick={() => router.push("/home")}
        >
          <img src="/logo.PNG" alt="" width="56px" />
        </div>
        {props.type === "logged" && user ? (
          <div className="d-flex position-absolute end-0 my-4 nav">
            <div
              className="d-flex cursor-pointer"
              id="user-info"
              onClick={() => router.push("/profile")}
            >
              <img className="profile" src={user.avatar} alt="" width="52px" height="52px" />
              <div className="d-md-flex d-lg-flex flex-column mx-3 d-none">
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
                    {notif.length > 0 ? (
                      notif.map((item) => {
                        return (
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
                              <div className="status-history-notif">
                                Transfered from <b>{item.sender}</b>
                              </div>
                              <div className="balance-history-notif fw-bold">
                                {Rupiah(item.amount)}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="card-history d-flex flex-column py-3 px-2">
                        <div className="icon-history pe-3" style={{ alignSelf: "center" }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Layer_1"
                            height="56"
                            viewBox="0 0 256 256"
                            width="56"
                          >
                            <g>
                              <g>
                                <g>
                                  <path
                                    d="m80.27 212.268c6.351 20.319 25.318 35.066 47.73 35.066s41.379-14.747 47.73-35.066z"
                                    fill="#808285"
                                  />
                                </g>
                                <g>
                                  <path
                                    d="m161.332 212.268c-8.637 14.977-24.801 25.066-43.332 25.066-11.257 0-21.643-3.722-30-10 9.122 12.144 23.643 20 40 20 22.412 0 41.379-14.747 47.73-35.066z"
                                    fill="#58595b"
                                  />
                                </g>
                                <g>
                                  <path
                                    d="m168.857 212.268c-7.702 17.692-25.331 30.066-45.857 30.066-12.534 0-23.982-4.623-32.757-12.243 9.167 10.557 22.677 17.243 37.757 17.243 22.412 0 41.379-14.747 47.73-35.066z"
                                    fill="#414042"
                                  />
                                </g>
                                <g>
                                  <path
                                    d="m144.697 220.268h-.395c-1.104 0-2-.896-2-2s.896-2 2-2h.395c1.104 0 2 .896 2 2s-.895 2-2 2zm-8.394 0h-43c-1.104 0-2-.896-2-2s.896-2 2-2h43c1.104 0 2 .896 2 2s-.896 2-2 2z"
                                    fill="#939598"
                                  />
                                </g>
                              </g>
                              <path
                                d="m117.333 30.963v-1.63c0-5.881 4.785-10.666 10.667-10.666s10.667 4.785 10.667 10.666v1.63c4.148.693 8.161 1.779 12 3.227v-4.857c0-12.498-10.168-22.666-22.667-22.666s-22.667 10.168-22.667 22.666v4.857c3.839-1.447 7.852-2.533 12-3.227z"
                                fill="#808285"
                              />
                              <path
                                d="m145.667 29.333v3.212c1.696.484 3.365 1.028 5 1.645v-4.857c0-12.498-10.168-22.666-22.667-22.666-.845 0-1.679.05-2.5.141 11.326 1.249 20.167 10.872 20.167 22.525z"
                                fill="#58595b"
                              />
                              <g>
                                <path
                                  d="m192.267 141.034v-46.701c0-35.494-28.773-64.267-64.267-64.267-35.494 0-64.267 28.774-64.267 64.267v46.701c0 12.183-4.565 23.924-12.794 32.908l-20.404 22.274c-5.629 6.146-1.27 16.051 7.064 16.051h180.802c8.334 0 12.694-9.906 7.064-16.051l-20.404-22.274c-8.229-8.984-12.794-20.725-12.794-32.908z"
                                  fill="#d10028"
                                />
                              </g>
                              <g>
                                <path
                                  d="m225.465 196.216-20.404-22.274c-8.229-8.983-12.794-20.725-12.794-32.908v-46.701c0-29.134-19.392-53.726-45.968-61.608 15.757 11.712 25.968 30.467 25.968 51.608v46.701c0 12.183 4.565 23.924 12.794 32.908l20.404 22.274c5.629 6.146 1.27 16.051-7.064 16.051h-170.388c-.193 5.064 3.704 10 9.586 10h180.802c8.334.001 12.694-9.905 7.064-16.051z"
                                  fill="#b7022d"
                                />
                              </g>
                              <g>
                                <g>
                                  <g>
                                    <path
                                      d="m210.475 144.335c-.69 0-1.391-.144-2.061-.446-2.515-1.14-3.63-4.103-2.491-6.618 8.698-19.198 8.698-44.009 0-63.207-1.14-2.516-.024-5.479 2.491-6.618 2.517-1.138 5.478-.023 6.618 2.491 9.834 21.705 9.834 49.756 0 71.461-.836 1.845-2.655 2.937-4.557 2.937z"
                                      fill="#d10028"
                                    />
                                  </g>
                                  <g>
                                    <path
                                      d="m229.475 154.335c-.69 0-1.391-.144-2.061-.446-2.515-1.14-3.63-4.103-2.491-6.618 11.451-25.273 11.451-57.934 0-83.207-1.14-2.516-.024-5.479 2.491-6.618 2.518-1.136 5.479-.023 6.618 2.491 12.587 27.78 12.587 63.681 0 91.461-.836 1.845-2.655 2.937-4.557 2.937z"
                                      fill="#d10028"
                                    />
                                  </g>
                                </g>
                                <g>
                                  <g>
                                    <path
                                      d="m45.525 144.335c-1.903 0-3.721-1.092-4.557-2.938-9.834-21.705-9.834-49.755 0-71.461 1.139-2.515 4.104-3.628 6.618-2.491 2.515 1.14 3.63 4.103 2.491 6.618-8.698 19.199-8.698 44.009 0 63.207 1.14 2.516.024 5.479-2.491 6.618-.67.303-1.371.447-2.061.447z"
                                      fill="#d10028"
                                    />
                                  </g>
                                  <g>
                                    <path
                                      d="m26.525 154.335c-1.903 0-3.721-1.092-4.557-2.938-12.587-27.78-12.587-63.681 0-91.461 1.14-2.515 4.103-3.629 6.618-2.491 2.515 1.14 3.63 4.103 2.491 6.618-11.451 25.273-11.451 57.934 0 83.207 1.14 2.516.024 5.479-2.491 6.618-.67.303-1.371.447-2.061.447z"
                                      fill="#d10028"
                                    />
                                  </g>
                                </g>
                              </g>
                              <g>
                                <g>
                                  <path
                                    d="m128 69.069c-7.324 0-13.079 5.976-12.454 12.933l5.064 56.318c.329 3.657 3.539 6.467 7.39 6.467s7.061-2.809 7.389-6.467l5.064-56.318c.626-6.957-5.129-12.933-12.453-12.933z"
                                    fill="#f1f2f2"
                                  />
                                </g>
                                <g>
                                  <path
                                    d="m128 152.845c-6.756 0-12.233 5.221-12.233 11.662s5.477 11.662 12.233 11.662 12.233-5.221 12.233-11.662c.001-6.441-5.477-11.662-12.233-11.662z"
                                    fill="#f1f2f2"
                                  />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div className="d-flex flex-column">You Don't Have Notifications Today</div>
                      </div>
                    )}
                  </div>
                </div>
              </PopoverBody>
            </Popover>
          </div>
        ) : user ? (
          <div className="position-absolute end-0">
            <div className="d-flex justify-content-end">
              <div
                className="mx-2 my-4 btn-login cursor-pointer"
                id="login"
                onClick={() => router.push(`/home`)}
              >
                <span>Home</span>
              </div>
            </div>
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

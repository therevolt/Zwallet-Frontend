import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Header from "../../component/base/Head";
import EyePassword from "../../component/base/EyePassword";
import ButtonAuth from "../../component/module/ButtonAuth";

export default function SignUp() {
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleShowPass = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/home");
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (data) {
      data.firstName = data.username.split(" ")[0];
      data.lastName = data.username.split(" ")[1];
      data.username = data.username.replace(" ", "").toLowerCase();
      axios
        .post(`${process.env.NEXT_PUBLIC_URL_API}/users`, data)
        .then((result) => {
          if (result.data.status) {
            Swal.fire("Success Register", result.data.message, "success");
            router.push("/auth/login");
          } else {
            Swal.fire("Something Error", result.data.message, "warning");
          }
        })
        .catch((err) => {
          Swal.fire(err.response.data.message, err.response.data.data.message, "error");
        });
    }
  };

  return (
    <div className="row login-page">
      <Header name="SignUp Pages" />
      <div className="col-7 right-panel">
        <div className="container d-flex flex-column align-items-center py-3">
          <div
            className="title-name text-white cursor-pointer"
            style={{ width: "35vw" }}
            onClick={() => router.push("/")}
          >
            Zwallet
          </div>
          <div className="img-app my-2">
            <img src="/preview_auth.png" alt="" height="450px" />
          </div>
          <div className="text-login">
            <div className="title-text-login fw-bold text-white my-3">
              App that Covering Banking Needs.
            </div>
            <div className="body-text-login text-white">
              Zwallet is an application that focussing in banking needs for all users in the world.
              Always updated and always following world trends. 5000+ users registered in Zwallet
              everyday with worldwide users coverage.
            </div>
          </div>
        </div>
      </div>
      <div className="col-5 left-panel">
        <div className="text-center my-4 title-mobile title-name primary-text">ZWallet</div>
        <div className="wrapper-auth d-flex flex-column mx-5 pe-4">
          <div className="title-login-input">
            Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users
          </div>
          <div className="title-login-input-2">
            Transfering money is eassier than ever, you can access Zwallet wherever you are.
            Desktop, laptop, mobile phone? we cover all of that for you!
          </div>
          <div className="input-username position-relative my-3 mt-5">
            <div className="position-absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  stroke="#a9a9a9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  d="M 4 20 C 4 17 8 17 10 15 C 11 14 8 14 8 9 C 8 5.667 9.333 4 12 4 C 14.667 4 16 5.667 16 9 C 16 14 13 14 14 15 C 16 17 20 17 20 20"
                />
              </svg>
            </div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>
          <div className="input-email position-relative my-3">
            <div className="position-absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  stroke="#a9a9a9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  d="M 22 5 H 2 V 19 H 22 V 5 Z"
                />
                <path
                  stroke="#a9a9a9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  d="M 3 6 L 12 13 L 21 6"
                />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="input-password position-relative mt-3">
            <div className="position-absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  stroke="#a9a9a9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  d="M 19 11 H 5 V 21 H 19 V 11 Z"
                />
                <path
                  stroke="#a9a9a9"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  d="M 17 9 V 8 C 17 5.23858 14.7614 3 12 3 C 9.23858 3 7 5.23858 7 8 V 9"
                />
              </svg>
            </div>
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={data.password}
            />
            <EyePassword
              className="position-absolute end-0 top-0 mx-3"
              onClick={handleShowPass}
              show={show}
            />
          </div>
          <div className="mt-3 pt-5">
            <ButtonAuth
              data={data}
              handleClick={handleClick}
              disabled={data && data.username && data.email && data.password ? false : true}
              text="Sign Up"
            />
          </div>
          <div className="sign-up text-center my-4">
            Already have an account? Let’s{" "}
            <span
              className="primary-text fw-bold cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

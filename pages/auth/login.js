import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../component/base/Head";
import { useDispatch } from "react-redux";
import EyePassword from "../../component/base/EyePassword";
import ButtonAuth from "../../component/module/ButtonAuth";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const defaultJson = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(defaultJson);
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);

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

  const handleClick = () => {
    if (data.email === "") {
      Swal.fire("Error!", "Email Cannot Be Null", "error");
    } else if (data.password === "") {
      Swal.fire("Error!", "Password Cannot Be Null", "error");
    } else {
      setLoad(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_URL_API}/users/login`, data)
        .then((result) => {
          Swal.fire("Success", result.data.message, "success");
          localStorage.setItem("token", result.data.data.token);
          dispatch({
            type: "REQUEST_LOGIN",
            payload: result.data.data,
          });
          router.push("/home");
          setLoad(false);
        })
        .catch((err) => {
          setLoad(false);
          Swal.fire("Something Error!", err.response.data.message, "error");
          setData(defaultJson);
        });
    }
  };

  return (
    <div className="row login-page">
      <Header name="Login Pages" />
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
          <div className="input-email position-relative my-5">
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
              value={data.email}
            />
          </div>
          <div className="input-password position-relative mb-3">
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
          <div className="forgot-pass position-relative">
            <div
              className="position-absolute end-0 fw-bold primary-text cursor-pointer"
              onClick={() => router.push("/auth/reset_password")}
            >
              Forgot Password?
            </div>
          </div>
          <div className="mt-5 pt-5">
            <ButtonAuth
              disable={data && data.email && data.password ? false : true}
              load={load}
              handleClick={handleClick}
              text="Login"
            />
          </div>
          <div className="sign-up text-center my-4">
            Don???t have an account? Let???s{" "}
            <span
              className="primary-text fw-bold cursor-pointer"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

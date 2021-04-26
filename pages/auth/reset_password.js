import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../../component/base/Button";
import Header from "../../component/base/Head";

export default function ResetPassword() {
  const [data, setData] = useState({ email: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/home");
    }
  }, []);

  const handleChange = (e) => {
    setData({ email: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_URL_API}/users/reset`, data)
      .then((result) => {
        Swal.fire("Success", result.data.message, "success");
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  };

  return (
    <div className="row login-page">
      <Header name="Reset Password" />
      <div className="col-7 right-panel">
        <div className="container d-flex flex-column align-items-center py-3">
          <div className="title-name text-white" style={{ width: "35vw" }}>
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
            Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.
          </div>
          <div className="title-login-input-2 mt-4">
            To reset your password, you must type your e-mail and we will send a link to your email
            and you will be directed to the reset password screens.
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
                  stroke={data.email ? "#6379F4" : "#3A3D42"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  d="M 22 5 H 2 V 19 H 22 V 5 Z"
                />
                <path
                  stroke={data.email ? "#6379F4" : "#3A3D42"}
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
              placeholder="Enter your e-mail"
              onChange={handleChange}
            />
          </div>
          <div className="mt-3 pt-3">
            <Button
              className="btn-filled login text-white"
              disabled={data && data.email && data.email.match(/@\w*\.com/) ? false : true}
              text="Confirm"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

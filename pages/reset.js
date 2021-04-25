import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../component/base/Button";
import Header from "../component/base/Head";

export default function ResetPassword() {
  const [data, setData] = useState({ password: "" });
  const router = useRouter();
  const token = location.href.split("token=")[1];

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  const handleChange = (e) => {
    setData({ password: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_URL_API}/users/reset`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        Swal.fire("Success", result.data.message, "success");
        router.push("/auth/login");
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
        setData({ password: "" });
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
          <div className="title-login-input">Set New Password Here</div>
          <div className="title-login-input-2 mt-4">Passwords must be longer than 6</div>
          <div className="input-password position-relative my-5">
            <div className="position-absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  stroke={data.password ? "#6379F4" : "#3A3D42"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  d="M 19 11 H 5 V 21 H 19 V 11 Z"
                />
                <path
                  stroke={data.password ? "#6379F4" : "#3A3D42"}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  d="M 17 9 V 8 C 17 5.23858 14.7614 3 12 3 C 9.23858 3 7 5.23858 7 8 V 9"
                />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <div className="mt-3 pt-3">
            <Button
              className="btn-filled login text-white"
              disabled={data && data.password && data.password.length > 6 ? false : true}
              text="Confirm"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

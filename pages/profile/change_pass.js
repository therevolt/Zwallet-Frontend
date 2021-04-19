import Layout from "../../component/base/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosApiInstance from "../../helper/axiosInstance";

export default function History() {
  const router = useRouter();
  const defaultJson = {
    current_password: "",
    new_password: "",
    new_password2: "",
  };
  const [data, setData] = useState(defaultJson);
  const [show, setShow] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleShow = (id) => {
    setShow({ ...show, [id]: !show[id] });
  };

  const handleSubmit = () => {
    if (data.current_password && data.new_password && data.new_password2) {
      if (data.new_password !== data.new_password2) {
        Swal.fire("Incorrect Repeat Password", "Password and Repeat Password Not Match", "warning");
        setData(defaultJson);
      } else {
        axiosApiInstance
          .put(`${process.env.NEXT_PUBLIC_URL_API}/users/pass`, data)
          .then((results) => {
            if (results.data.status) {
              Swal.fire("Success", "Password Has Been Changed", "success");
              router.push("/profile");
            }
          })
          .catch((err) => {
            Swal.fire("Error", err.response.data.message, "error");
            setData(defaultJson);
          });
      }
    } else {
      Swal.fire("Hey!", "Data Cannot Be Null", "warning");
    }
  };

  return (
    <Layout
      title="Home Pages"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col status-transactions pb-4"
    >
      <div className="head-transaction mx-4 my-4 fw-bold fs-4">Change Password</div>
      <div className="desc mx-4 my-4 text-gray" style={{ color: "#7A7886", width: "350px" }}>
        You must enter your current password and then type your new password twice.
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="position-relative mt-5">
          <div className="position-absolute start-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 11H5V21H19V11Z"
                stroke={data.current_password ? "#6379F4" : "#A9A9A9"}
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9"
                stroke={data.current_password ? "#6379F4" : "#A9A9A9"}
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="position-absolute end-0" onClick={() => handleShow("currentPassword")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"
                stroke="#A9A9A9"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="#A9A9A9"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {!show.currentPassword && (
                <path
                  d="M3 21L20 4"
                  stroke="#A9A9A9"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
          <input
            type={show.currentPassword ? "text" : "password"}
            name="current_password"
            id="current_password"
            onChange={handleChange}
            style={{
              width: "431px",
              border: "none",
              borderBottom: "2px solid #A9A9A9",
              paddingBottom: "10px",
              paddingLeft: "30px",
              outline: "none",
            }}
            placeholder="Current password"
            value={data.current_password}
          />
        </div>
        <div className="position-relative mt-5">
          <div className="position-absolute start-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 11H5V21H19V11Z"
                stroke={data.new_password ? "#6379F4" : "#A9A9A9"}
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9"
                stroke={data.new_password ? "#6379F4" : "#A9A9A9"}
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="position-absolute end-0" onClick={() => handleShow("newPassword1")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"
                stroke="#A9A9A9"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="#A9A9A9"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {!show.newPassword1 && (
                <path
                  d="M3 21L20 4"
                  stroke="#A9A9A9"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
          <input
            type={show.newPassword1 ? "text" : "password"}
            name="new_password"
            id="new_password"
            onChange={handleChange}
            style={{
              width: "431px",
              border: "none",
              borderBottom: "2px solid #A9A9A9",
              paddingBottom: "10px",
              paddingLeft: "30px",
              outline: "none",
            }}
            placeholder="New password"
            value={data.new_password}
          />
        </div>
        <div className="position-relative mt-5">
          <div className="position-absolute start-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 11H5V21H19V11Z"
                stroke={data.new_password2 ? "#6379F4" : "#A9A9A9"}
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9"
                stroke={data.new_password2 ? "#6379F4" : "#A9A9A9"}
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="position-absolute end-0" onClick={() => handleShow("newPassword2")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"
                stroke="#A9A9A9"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke="#A9A9A9"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {!show.newPassword2 && (
                <path
                  d="M3 21L20 4"
                  stroke="#A9A9A9"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
          <input
            type={show.newPassword2 ? "text" : "password"}
            name="new_password2"
            id="new_password2"
            onChange={handleChange}
            style={{
              width: "431px",
              border: "none",
              borderBottom: "2px solid #A9A9A9",
              paddingBottom: "10px",
              paddingLeft: "30px",
              outline: "none",
            }}
            placeholder="Repeat new password"
            value={data.new_password2}
          />
        </div>
        <button
          className="btn-change-pass btn-filled"
          onClick={handleSubmit}
          disabled={data.current_password && data.new_password && data.new_password2 ? false : true}
        >
          Change Password
        </button>
      </div>
    </Layout>
  );
}

import Layout from "../../component/base/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axiosApiInstance from "../../helper/axiosInstance";
import PhoneFormat from "../../helper/phoneFormat";
import FormData from "form-data";

export default function History() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const form = new FormData();
  const imgRef = useRef();

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
              router.push("/profile");
            }
          });
      }
    } else {
      Swal.fire("Restricted Area", "Only Users Can Be Access", "warning");
      router.push("/auth/login");
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleChange = async (e) => {
    const { id } = e.target;
    if (id === "avatar") {
      let file = e.target.files[0];
      form.append("avatar", file, file.name);
      await axiosApiInstance
        .put(`${process.env.NEXT_PUBLIC_URL_API}/users`, form)
        .then((result) => {
          setUser({ ...user, avatar: URL.createObjectURL(file) });

          Swal.fire("Success", result.data.message, "success");
          router.reload();
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.message, "error");
        });
    }
  };

  return (
    <Layout
      title="Home Pages"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col full-history"
    >
      <div className="d-flex flex-column align-items-center">
        {user && (
          <>
            <div className="pic-profile mt-5 mb-2">
              <img
                src={user.avatar}
                alt=""
                width="80"
                height="80"
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div
              className="edit-profile mb-3 cursor-pointer"
              style={{ color: "#7A7886" }}
              onClick={() => imgRef.current.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17 3.0003C17.2626 2.73766 17.5744 2.52932 17.9176 2.38718C18.2608 2.24503 18.6286 2.17188 19 2.17188C19.3714 2.17187 19.7392 2.24503 20.0824 2.38718C20.4256 2.52932 20.7374 2.73766 21 3.0003C21.2626 3.26295 21.471 3.57475 21.6131 3.91791C21.7553 4.26107 21.8284 4.62887 21.8284 5.0003C21.8284 5.37174 21.7553 5.73953 21.6131 6.08269C21.471 6.42585 21.2626 6.73766 21 7.0003L7.5 20.5003L2 22.0003L3.5 16.5003L17 3.0003Z"
                  stroke="#A9A9A9"
                  strokeOpacity="0.6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
              Edit
            </div>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleChange}
              hidden
              ref={imgRef}
            />
            <span className="name fw-bold fs-5 my-2">
              {user.firstName} {user.lastName}
            </span>
            <span className="number" style={{ color: "#7A7886" }}>
              {user.phone === "0" || !user.phone
                ? "Phone Number Has Not Been Added"
                : PhoneFormat(user.phone)}
            </span>
          </>
        )}
        <div
          className="card-action-profile position-relative cursor-pointer"
          onClick={() => router.push("/profile/personal")}
        >
          <div className="position-absolute end-0" style={{ marginRight: "20px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M5.83366 14L22.167 14"
                stroke="#7E7D84"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.0003 5.83365L22.167 14.0003L14.0003 22.167"
                stroke="#7E7D84"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Personal Information
        </div>
        <div
          className="card-action-profile position-relative cursor-pointer"
          onClick={() => router.push("/profile/change_pass")}
        >
          <div className="position-absolute end-0" style={{ marginRight: "20px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M5.83366 14L22.167 14"
                stroke="#7E7D84"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.0003 5.83365L22.167 14.0003L14.0003 22.167"
                stroke="#7E7D84"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Change Password
        </div>
        <div
          className="card-action-profile position-relative cursor-pointer"
          onClick={() => router.push("/profile/change_pin")}
        >
          <div className="position-absolute end-0" style={{ marginRight: "20px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M5.83366 14L22.167 14"
                stroke="#7E7D84"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.0003 5.83365L22.167 14.0003L14.0003 22.167"
                stroke="#7E7D84"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          Change PIN
        </div>
        <div className="card-action-profile position-relative cursor-pointer" onClick={Logout}>
          Logout
        </div>
      </div>
    </Layout>
  );
}

import Layout from "../../component/base/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosApiInstance from "../../helper/axiosInstance";
import PhoneFormat from "../../helper/phoneFormat";

export default function History() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
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

  return (
    <Layout
      title="Personal Information"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col status-transactions pb-4"
    >
      <div className="head-transaction mx-4 my-4 fw-bold fs-4">Personal Information</div>
      <div className="desc mx-4 my-4 text-gray" style={{ color: "#7A7886", width: "350px" }}>
        We got your personal information from the sign up proccess. If you want to make changes on
        your information, contact our support.
      </div>
      {user && (
        <div className="weekly mx-4">
          <div className="card-topup d-flex justify-content-between my-3">
            <div className="d-flex flex-column">
              <div className="firstName">First Name</div>
              <span className="fw-bold fs-5 mt-2">{user.firstName}</span>
            </div>
          </div>
          <div className="card-topup d-flex justify-content-between my-3">
            <div className="d-flex flex-column">
              <div className="firstName">Last Name</div>
              <span className="fw-bold fs-5 mt-2">{user.lastName}</span>
            </div>
          </div>
          <div className="card-topup d-flex justify-content-between my-3">
            <div className="d-flex flex-column">
              <div className="firstName">Verified E-mail</div>
              <span className="fw-bold fs-5 mt-2">{user.email}</span>
            </div>
          </div>
          <div className="card-topup d-flex justify-content-between my-3">
            <div className="d-flex flex-column">
              <div className="firstName">Phone Number</div>
              <span className="fw-bold fs-5 mt-2 phone">{PhoneFormat(user.phone)}</span>
            </div>
            <div
              className="manage-phone my-3 mx-3 primary-text cursor-pointer"
              onClick={() => router.push("/profile/phone")}
            >
              Manage
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

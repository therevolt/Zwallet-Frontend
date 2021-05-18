import React, { useEffect, useState } from "react";
import Layout from "../../component/base/Layout";
import axiosApiInstance from "../../helper/axiosInstance";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Swal.fire("Restricted Area", "Only Users Can Be Access", "warning");
      router.push("/auth/login");
    } else {
      if (!list) {
        axiosApiInstance.get(`${process.env.NEXT_PUBLIC_URL_API}/users`).then((resultCheck) => {
          const { role } = resultCheck.data.data;
          if (role === "admin") {
            axiosApiInstance
              .get(`${process.env.NEXT_PUBLIC_URL_API}/users/lists?size=100`)
              .then((result) => {
                setList(result.data.data);
              })
              .catch((err) => {
                Swal.fire("Error", err.response.data.message, "error");
              });
          } else {
            Swal.fire("Restricted Area", "Only Admin Can Access This Page", "error");
          }
        });
      }
    }
  }, [list]);

  const handleDelete = (e) => {
    axiosApiInstance
      .delete(`${process.env.NEXT_PUBLIC_URL_API}/users/delete/${e.target.id}`)
      .then(() => {
        Swal.fire("Success", "Success Delete Account", "success");
        setList(null);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  };

  const handleDisable = (e) => {
    axiosApiInstance
      .put(`${process.env.NEXT_PUBLIC_URL_API}/users/disable/${e.target.id}`)
      .then(() => {
        Swal.fire("Success", "Success Disable Account", "success");
        setList(null);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  };

  const handleEnable = (e) => {
    axiosApiInstance
      .put(`${process.env.NEXT_PUBLIC_URL_API}/users/enable/${e.target.id}`)
      .then(() => {
        Swal.fire("Success", "Success Enable Account", "success");
        setList(null);
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data.message, "error");
      });
  };

  return (
    <Layout
      title="Profile Pages"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col full-history"
    >
      <div className="title text-center fs-3 fw-bold mt-3">Manage Users</div>
      <div className="list-user">
        <ul>
          {list &&
            list.wallets.map((item, i) => {
              return (
                <div
                  className="card-history d-flex justify-content-between mx-4 my-4 cursor-pointer"
                  key={i}
                  id={item.userId}
                >
                  <div className="d-flex">
                    <div className="avatar-user me-2 my-1">
                      <img
                        src={item.avatar}
                        className="profile"
                        alt=""
                        width="52px"
                        height="52px"
                      />
                    </div>
                    <div className="list-user d-flex flex-column">
                      <span className="fw-bold">
                        {item.fullName}{" "}
                        <span style={{ fontWeight: "lighter" }}>
                          ({item.disable ? "DISABLE" : "ENABLE"})
                        </span>
                      </span>
                      <div className="d-flex">
                        {item.disable ? (
                          <span
                            style={{ color: "green", cursor: "pointer" }}
                            id={item.userId}
                            onClick={handleEnable}
                          >
                            Enable Account
                          </span>
                        ) : (
                          <span
                            style={{ color: "red", cursor: "pointer" }}
                            id={item.userId}
                            onClick={handleDisable}
                          >
                            Disable Account
                          </span>
                        )}
                        <span
                          className="mx-3 fw-bold"
                          style={{ color: "red", cursor: "pointer" }}
                          id={item.userId}
                          onClick={handleDelete}
                        >
                          Delete Account
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </ul>
        <div className="desc">
          Nb: All users who are disabled, they cannot use the transfer feature
        </div>
      </div>
    </Layout>
  );
};

export default ManageUser;

import Layout from "../../component/base/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axiosApiInstance from "../../helper/axiosInstance";
import PhoneFormat from "../../helper/phoneFormat";

export default function History() {
  const router = useRouter();
  const [list, setList] = useState(null);
  const [defaultList, setDefaultList] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      Swal.fire("Restricted Area", "Only Users Can Be Access", "warning");
      router.push("/auth/login");
    } else {
      if (!list) {
        axiosApiInstance
          .get(`${process.env.NEXT_PUBLIC_URL_API}/users/lists`)
          .then((result) => {
            setList(result.data.data);
            setDefaultList(result.data.data);
          })
          .catch((err) => {
            Swal.fire("Error", err.response.data.message, "error");
          });
      }
    }
  }, []);

  const handleSearch = (e) => {
    if (list) {
      if (e.target.value) {
        setList(
          list.filter((item) => item.fullName.toLowerCase().match(e.target.value.toLowerCase()))
        );
      } else {
        setList(defaultList);
      }
    }
  };

  return (
    <Layout
      title="Transfer Pages"
      navbar="logged"
      footer="logged"
      type="no-auth"
      classContent="col full-history"
    >
      <div className="head-transaction mx-4 my-4 fw-bold fs-4">Search Receiver</div>
      <div className="search-bar position-relative mx-4">
        <div className="position-absolute mx-3 my-2 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 16L20 21"
              stroke="#A9A9A9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 18C13.866 18 17 14.866 17 11C17 7.13401 13.866 4 10 4C6.13401 4 3 7.13401 3 11C3 14.866 6.13401 18 10 18Z"
              stroke="#A9A9A9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input
          type="text"
          name="name"
          id="name"
          className="input-name"
          placeholder="Search receiver here"
          onChange={handleSearch}
        />
      </div>
      <div className="contact mx-4">
        {list &&
          list.map((item) => {
            return (
              <Link href={`/transfer/${item.userId}`}>
                <a>
                  <div className="card-contact d-flex justify-content-between my-3">
                    <div className="d-flex">
                      <div className="avatar-user">
                        <img
                          src={item.avatar}
                          alt=""
                          width="56px"
                          height="46px"
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <div className="detail-transaction d-flex flex-column mx-3">
                        <span className="fw-bold">{item.fullName}</span>
                        <span>{PhoneFormat(item.phone)}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
      </div>
    </Layout>
  );
}

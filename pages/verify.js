import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Verify() {
  const router = useRouter();

  useEffect(() => {
    const token = window.location.href.split("token=")[1];
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_URL_API}/users/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          Swal.fire("Success", result.data.message, "success");
          router.push("/auth/create_pin?token=" + token);
        })
        .catch((err) => {
          Swal.fire("Something Error!", err.response.data.message, "error");
          router.push("/");
        });
    } else {
      router.push("/");
    }
  }, []);

  return <>Process. . .</>;
}

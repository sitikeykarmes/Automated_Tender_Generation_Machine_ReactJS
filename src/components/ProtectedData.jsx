import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedData() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "https://automated-tender-generation-machine.onrender.com/api/protected",
          {
            headers: { Authorization: token },
          }
        );
        setMessage(res.data.msg);
      } catch (err) {
        setMessage("Access denied or not logged in.");
      }
    };
    fetchProtected();
  }, []);

  return <div>{message}</div>;
}

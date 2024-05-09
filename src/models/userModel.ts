// src/models/userModel.ts
import { useState, useEffect } from "react";
// import { getUser } from '@/services/user';

export default function Page() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getUser().then((res) => {
  //     setUser(res);
  //     setLoading(false);
  //   });
  // }, []);

  return {
    user,
    loading,
  };
}

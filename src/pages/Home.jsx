import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function Home() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setUsers(data);
    }
  }

  return (
    <div>
      <h1>Home</h1>

      {users.map((user) => (
        <div key={user.id}>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setPosts(data);
    }
  }

  return (
    <div>
      <h1>Feed</h1>

      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
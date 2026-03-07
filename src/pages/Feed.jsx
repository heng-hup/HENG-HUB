import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    setPosts(data || []);
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-xl font-bold text-yellow-400 mb-4">
        HENG Feed
      </h1>

      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-gray-900 rounded-xl p-4 mb-4"
        >
          {post.content}
        </div>
      ))}
    </div>
  );
}
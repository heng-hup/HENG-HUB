import { useEffect, useState } from "react";

export default function Feed() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([
      { id: 1, title: "Test Post" }
    ]);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Feed</h1>

      {posts.map((post) => (
        <div key={post.id}>
          {post.title}
        </div>
      ))}

    </div>
  );
}
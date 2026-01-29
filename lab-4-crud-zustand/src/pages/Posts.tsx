import { Link, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/post.store";

const Posts = () => {
  const allPosts = usePostStore((s) => s.posts);
  const navigate = useNavigate();

  const posts = allPosts.filter((p) => !p.isDeleted);

  return (
    <div>
      <h2>Posts</h2>

      <button onClick={() => navigate("/posts/new")}>Create Post</button>

      {posts.length === 0 && <p>No posts yet.</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <Link to="/trash">Go to Trash</Link>
    </div>
  );
};

export default Posts;

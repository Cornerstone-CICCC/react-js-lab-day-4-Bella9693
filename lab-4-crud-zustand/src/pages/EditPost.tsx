import { useParams, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/post.store";
import { useState } from "react";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = usePostStore((s) => s.posts.find((p) => p.id === id));
  const updatePost = usePostStore((s) => s.updatePost);

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  if (!post) return <div>Post not found</div>;

  const handleSave = () => {
    updatePost(post.id, title, content);
    navigate(`/posts/${post.id}`);
  };

  return (
    <div>
      <h2>Edit Post</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditPost;

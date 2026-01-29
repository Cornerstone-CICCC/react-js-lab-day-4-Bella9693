import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../store/post.store";
import { v4 as uuid } from "uuid";

const AddPost = () => {
  const createPost = usePostStore((s) => s.createPost);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    createPost({
      id: uuid(),
      title,
      content,
      isDeleted: false,
    });
    navigate("/posts");
  };

  return (
    <div>
      <h2>Add Post</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default AddPost;

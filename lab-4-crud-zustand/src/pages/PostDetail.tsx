import { useParams, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/post.store";
import toast from "react-hot-toast";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = usePostStore((s) => s.posts.find((p) => p.id === id));
  const softDeletePost = usePostStore((s) => s.softDeletePost);

  if (!post) return <div>Post not found</div>;

  const handleDelete = () => {
    softDeletePost(post.id);
    toast.success("Post moved to trash");
    navigate("/posts");
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <button onClick={() => navigate(`/posts/${post.id}/edit`)}>Edit</button>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PostDetail;

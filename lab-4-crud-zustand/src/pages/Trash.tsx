import { usePostStore } from "../store/post.store";
import { useMemo } from "react";
import toast from "react-hot-toast";

const Trash = () => {
  const posts = usePostStore((s) => s.posts);
  const recoverPost = usePostStore((s) => s.recoverPost);
  const deletePostPermanently = usePostStore((s) => s.deletePostPermanently);

  // ✅ 핵심: snapshot 캐싱
  const deletedPosts = useMemo(() => posts.filter((p) => p.isDeleted), [posts]);

  return (
    <div>
      <h2>Trash</h2>

      {deletedPosts.length === 0 && <p>Trash is empty</p>}

      <ul>
        {deletedPosts.map((post) => (
          <li key={post.id}>
            {post.title}

            <button
              onClick={() => {
                recoverPost(post.id);
                toast.success("Post recovered");
              }}
            >
              Recover
            </button>

            <button
              onClick={() => {
                deletePostPermanently(post.id);
                toast.error("Post permanently deleted");
              }}
            >
              Delete Permanently
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trash;

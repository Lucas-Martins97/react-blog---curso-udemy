import React from "react";
import styles from "./Post.module.css";

// hooks
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  return (
    <div>
      {loading && <p>Carregando post...</p>}
      <h1 className={styles.post_container}>
        {post && (
          <>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.body}</p>
            <h3>
              Este post trata sobre:
              <div className={styles.tags}>
                {post.tagsArray.map((tag) => (
                  <p key={tag}>
                    <span>#</span> {tag}
                  </p>
                ))}
              </div>
            </h3>
          </>
        )}
      </h1>
    </div>
  );
};

export default Post;

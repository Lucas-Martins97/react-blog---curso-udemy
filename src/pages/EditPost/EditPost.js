import React from "react";
import styles from "./EditPost.module.css";

import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([""]);
  const [formError, setFormError] = useState("");
  const { updateDocument, response } = useUpdateDocument("posts");
  const { user } = useAuthValue();
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    // validar url da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    //  criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    // Checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos.");
    }
    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };
    updateDocument(id, data);

    // retirect to home page
    Navigate("/dashboard");
  };
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);
  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar Post: {post.title}</h2>
          <p>Edite seu post !</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Titulo:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Titulo..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>Imagem:</span>
              <input
                type="text"
                name="imagem"
                required
                placeholder="Url da imagem..."
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Conteudo:</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteudo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="insira as tags separadas por vírgulas"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button disabled className="btn">
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;

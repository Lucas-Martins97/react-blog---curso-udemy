import React from "react";
import styles from "./Createpost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocuments";

const Createpost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([""]);
  const [formError, setFormError] = useState("");
  const { insertDocument, response } = useInsertDocument("posts");
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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // retirect to home page
    Navigate("/");
  };
  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que você quiser e compartilhe o seu conhecimento !</p>
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
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button disabled className="btn">
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Createpost;

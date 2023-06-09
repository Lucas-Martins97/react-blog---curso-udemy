// CSS
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Master <span>Blog</span>
      </h2>
      <p>Blog criado com react.js no front end e firebase no backend</p>
      <Link to="/posts/create" className="btn">
        Publicar
      </Link>
    </div>
  );
};

export default About;

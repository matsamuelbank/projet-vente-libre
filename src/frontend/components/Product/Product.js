import { Link } from 'react-router-dom';
import styles from './Product.module.css'; 

function Product({ id, title, description, imageUrl, userId, price, categorie }) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} style={{width: "100%"}} />
      <div className="container">
        <h4><b>{title}</b></h4>
        <p>Prix: {price}</p>
        <p><Link to={`/learnmore/${id}`}>En savoir plus...</Link></p>
      </div>
    </div>
  );
}

export default Product
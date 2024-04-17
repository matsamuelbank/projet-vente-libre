import styles from './Seller.module.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate,useLocation} from 'react-router-dom';
// import logo from '../../assets/images/vente-libre-logo.jpeg';
// import Cookies from 'js-cookie';
import Product from '../Product/Product';

function Seller() {
    // const navigate = useNavigate();
    const [things, sellerThings] = useState([]); // Ajoute un état pour stocker les things, donc les objets mis en vente par l'utilisateur 

    useEffect(() => {
        const fetchThings = async () => {
            const token = localStorage.getItem('token');
            // console.log(token)

            try {
               const response = await fetch('http://localhost:3001/api/thing/seller/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                });

                const data = await response.json();
                console.log(data);

                if (data.status === 'success') {
                    // navigate('/seller');
                    console.log(data.status)
                } else {
                    console.log(" status different de 201");
                }
                sellerThings(data.data); // Met à jour l'état avec les données récupérées
            } catch (error) {
                console.error(error);
            }
        };

        fetchThings(); // Appele la fonction au chargement du composant
    }, []); // Le tableau vide signifie que cet effet s'exécute une fois au chargement du composant

    return (
        <div className={styles.container}>
            {things.map(thing => ( // Je mappe sur les things pour créer un SellerProduct pour chaque thing
                <Product
                    key={thing._id}
                    id={thing._id}
                    title={thing.title}
                    description={thing.description}
                    imageUrl={thing.imageUrl}
                    userId={thing.userId}
                    price={thing.price}
                    categorie={thing.categorie}
                />
            ))}
        </div>
    )
}

export default Seller;
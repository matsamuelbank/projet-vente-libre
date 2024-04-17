import styles from './LearnMore.module.css'
import logo from '../../assets/images/vente-libre-logo.jpeg';
import { useState, useEffect } from 'react';
import { Link, useNavigate,useLocation, useParams} from 'react-router-dom';

function LearnMore (){
    let { id } = useParams();

    const [thing, selectedThing] = useState(); 

    useEffect(() => {
        const getThing = async () => {
            const token = localStorage.getItem('token');

            try {
               const response = await fetch(`http://localhost:3001/api/thing/selectedthing/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                });

                const data = await response.json();
                console.log(data);
                if (data.status === 'success') {
                    console.log(data.status)
                } else {
                    console.log(" status different de 201");
                }
                selectedThing(data.data); 
            } catch (error) {
                console.error(error);
            }
        };

        getThing(); 
    }, []);

    return(
        <div className={styles.container}>
            {/* thing && : signifie si thing est défini  */}
            {thing && (
                <div className={styles.card}>
                    <img src={thing.imageUrl} alt='' />
                    <div className={styles.theproductInfo}>
                        <p>{thing.title}</p>
                        <p>{thing.description}</p>
                        <p>{thing.price}</p>
                    </div>
                </div>
            )}
        </div>
    )
}


export default LearnMore;
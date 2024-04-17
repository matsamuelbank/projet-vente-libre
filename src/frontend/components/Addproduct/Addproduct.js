import styles from './Addproduct.module.css'
import { Link, useNavigate,useLocation} from 'react-router-dom';

function Addproduct(){
    const navigate = useNavigate();
    let selectedFile;

    const handleImageUpload = (event) => {
        selectedFile = event.target.files[0];
        console.log(selectedFile)
    }

   const postInfoThing = async (event) => {
        event.preventDefault();

        const title =  event.target.elements.title.value;
        const price = event.target.elements.price.value;
        const description =  event.target.elements.description.value
        const categorie = event.target.elements.categorie.value
        

        const thing = {
            title: title, 
            price:price,
            description:description,
            categorie:categorie
        };

        const formData = new FormData();
        formData.append('thing', JSON.stringify(thing));
        formData.append('image', selectedFile);
        const token = localStorage.getItem('token');
        console.log(token)

        try {
        const response = await fetch('http://localhost:3001/api/thing/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        });

        const data = await response.json();
        console.log(data);

        if (Number(data.status) === 201) {
            navigate('/seller');
        } 
        else {
            console.log(data.status + " status different de 201");
        }

        } catch (error) {
            console.error(error);
        }

    };

    return(
        <div className= {styles.container}>
            <form className={styles.formproduct} onSubmit={postInfoThing}>
                <label>
                Nom de l'objet:
                </label>
                    <input type='text' name='title' placeholder="Nom de l'objet" />
                 <label>
                Catégorie
                </label>
                <select name='categorie'>
                    <option value="">--Choix de la catégorie--</option>
                    <option value='homme'>Homme</option>
                    <option value='femme'>Femme</option>
                    <option value='enfant'>Enfant</option>
                    <option alue='voiture'>Voiture</option>
                </select>
                <label>
                    Prix:
                </label>
                    <input type='number' name='price' placeholder='0 €' />

                <label>
                    Description:
                </label>
                    <textarea name='description' placeholder='Description'></textarea>

                <label>
                    Image:
                </label>
                <input name='image' type="file" onChange={handleImageUpload} />

                <button className={styles.btn} type="submit">Envoyer</button>
            </form>
        </div>
    )
}

export default Addproduct;

import styles from './Signup.module.css';
import { Link, useNavigate} from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const postData = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const firstname = event.target.elements.firstname.value;
    const role = event.target.elements.role.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const tel = event.target.elements.tel.value;

    const user = {
      name,
      firstname,
      role,
      email,
      password,
      tel
    };

    try {
      const response = await fetch('http://localhost:3001/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log(data);
      // Redirige l'utilisateur vers la page de connexion après la création du compte
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Inscription</h2>
      <form className={styles.formsignup} onSubmit={postData}>
          <input type='text' placeholder='Nom' name='name' id='name'/> 
          <input type='text' placeholder='Prénom' name='firstname' id='firstname'/>
          <select name="role" id="role-select">
            <option value="">--Choix de votre statut--</option>
            <option value="seller">Vendeur</option>
            <option value="buyer">Acheteur</option>
          </select>
          <input type='email' placeholder='Email' name='email' id='email'/>
          <input type='password' placeholder='Mot de passe' name='password' id='password'/>
          <input type='tel' placeholder='Téléphone' name='tel' id='tel'/>
          <input className={styles.btnSubmit} type='submit' value='Inscription' />
          <Link to="/">Aller à la page de connexion</Link>
        </form>
      </div>
  );
}

export default Signup;

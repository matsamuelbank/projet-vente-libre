import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();

    const postInfoUser = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        const user = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:3001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();
            console.log(data);

           if (Number(data.status) === 200) {
                // Stocke le token dans le local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.userRole);
                
                
                if (data.userRole === 'seller') {
                    navigate('/seller');
                } else if (data.userRole === 'buyer') {
                    navigate('/buyer');
                }
                } else {
                console.log(data.status + " status different de 200");
            }


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Connexion</h2>
            <form className={styles.formconexion} onSubmit={postInfoUser}>
                <input type='email' placeholder='Email' name='email' id='email' />
                <input type='password' placeholder='mot de passe' name='password' id='password' />
                <input className={styles.btnSubmit} type='submit' value='Connexion' />
                <div className={styles.liens}>
                    <Link to="/signup">S'inscrire</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;

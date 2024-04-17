import styles from './Header.module.css';
import { Link, useNavigate,useLocation} from 'react-router-dom';
import logo from '../../assets/images/vente-libre-logo.jpeg';

function Header()
{
    async function logout() {
        try {
            const response = await fetch('http://localhost:3001/api/user/logout', {
                method: 'POST',
                credentials: 'include',  // Nécessaire pour inclure les cookies dans la requête
            });
            const data = await response.json();
            console.log(data.message);  // Affiche "Déconnecté"
        } catch (error) {
            console.error(error);
        }
    }

    const userRole = localStorage.getItem('userRole');

    console.log(userRole)

    return (
        <div className={styles.container}>
            <header>
                <nav>
                    {userRole === 'seller' ? (
                            <>
                                <Link to='/seller'><img className={styles.ventelibreLogo} src={logo} alt='vente-libre-logo'/></Link>
                            </>
                        ) : userRole === 'buyer' ? (
                            <>
                                <Link to='/buyer'><img className={styles.ventelibreLogo} src={logo} alt='vente-libre-logo'/></Link>
                            </>
                        ) : null}
                    
                    <div className={styles.divofnav}>
                        <input className={styles.divofnavElement} placeholder='recherche' name='search' id='search'/>

                        {userRole === 'seller' ? (
                            <>
                                <Link className={styles.divofnavElement} to="/addproduct">Ajouter un produit</Link>
                            </>
                        ) : userRole === 'buyer' ? (
                            <>
                                <Link className={styles.divofnavElement} to="/card">Mon panier</Link>
                            </>
                        ) : null}

                        <Link className={styles.divofnavElement} to="/myaccount">Mon compte</Link>
                        <Link className={styles.divofnavElement} to="/about">A propos</Link>
                        <Link className={styles.divofnavElement} to="/contact">Contact</Link>
                        <Link onClick={logout} className={styles.divofnavElement} to="/">Déconnexion</Link>


                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;
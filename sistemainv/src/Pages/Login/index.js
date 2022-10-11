import './styles.css';
import login from '../../assets/login.png';
import logo from '../../assets/logoWhite.png';

export default function Login(){

    return(
        <div className="container-login">
            <div className="content-login">
                <div className='logo'>
                    <img src={login} />
                    
                </div>
            <form className="form-login">
                <h1>Login</h1>
                <input 
                    type="email" 
                    placeholder="Email"
                    required
                />
                
                <input 
                    type="password" 
                    placeholder="Senha"
                    required
                />
                
                
                <button>Entrar</button>

            </form>
            </div>
        </div>
    )
}
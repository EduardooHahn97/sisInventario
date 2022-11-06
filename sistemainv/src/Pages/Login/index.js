import './styles.css';
import login from '../../assets/login.png';
import logo from '../../assets/logoWhite.png';
import { useState } from 'react';

export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault();
    
    }

    return(
        <div className="container-login">
            <div className="content-login">
                <div className='logo'>
                    <img src={login} />
                    
                </div>
            <form className="form-login" onSubmit={handleSubmit}>
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
                
                
                <button type="submit">Entrar</button>

            </form>
            </div>
        </div>
    )
}
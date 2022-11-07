import './styles.css';
import login from '../../assets/login.png';
import { useState } from 'react';
import api from '../../service/api';
import Swal from 'sweetalert';

export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const errorToast = () => {
        Swal({
            text: 'Erro ao logar',
            position: 'center-end',
            toast:true
        })
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        api.post('/login', {email, senha}).then(
            res=>{
                console.log(res)
                localStorage.setItem("usuarioLogado", JSON.stringify(res.data[0]))
                window.location.href = '/';
            }
        ).catch(errorToast)
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <input 
                    type="password" 
                    placeholder="Senha"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                
                
                <button type="submit">Entrar</button>

            </form>
            </div>
        </div>
    )
}
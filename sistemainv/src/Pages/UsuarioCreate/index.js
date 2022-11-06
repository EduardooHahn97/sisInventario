import './styles.css';
import Nav from '../../Components/NavBar';
import api from '../../service/api';
import { useState } from 'react';
import Swal from 'sweetalert';

export default function UsuarioCreate(){
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const successToast = () => {Swal({
        text: 'Sucesso ao cadastrar',
        position: 'center-end',
        toast:true
      })
      window.location.href = '/usuarioHome'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var user = {
            nome: nome,
            matricula: matricula,
            email: email,
            senha: senha,
            token: 0, 
        };
        api.post('user', user)
        .then(successToast)
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="container-user-create">
            <Nav />

            <form className="form-user-create" onSubmit={handleSubmit}>
                <h1>Cadastrar Usuário</h1>
                <input 
                    
                    placeholder="Nome do Usuário"
                    required
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                />
                
                <input 
                    type="text" 
                    placeholder="Matricula"
                    required
                    value={matricula} 
                    onChange={(e) => setMatricula(e.target.value)}
                />

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
                <button type='submit'>Criar Usuário</button>
            </form>
        </div>
    )
}
import './styles.css'
import Nav from '../../Components/NavBar'
import { useState } from 'react'
import api from '../../service/api';

export default function UsuarioEdit(){
    const [nome, setNome] = useState('')
    const [matricula, setMatricula] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleClick = (e) => {
        //console.log(nome + ' - '+ matricula + ' - '+ email + ' - '+ senha);
        var user = {
            nome: nome,
            matricula: matricula,
            email: email,
            senha: senha
        };
        console.log(user)
        api.put('users', user)
    }

    return(
        <div className="container-item-create">
            <Nav />

            <form className="form-item-create">
                <h1>Editar Usuário</h1>
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
                <button onClick={handleClick}>Salvar alterações</button>
            </form>
        </div>
    )
}
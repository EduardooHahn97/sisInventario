import './styles.css'
import Nav from '../../Components/NavBar'
import { useState } from 'react'
import api from '../../service/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function UsuarioEdit(){
    const [nome, setNome] = useState('')
    const [matricula, setMatricula] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState({})

    let { userId } = useParams();    
    useEffect(() => {
        api.get('user?userId='+userId)
            .then(response => {
                setUser(response.data[0])
                setNome(response.data[0].nome)
                setMatricula(response.data[0].matricula)
                setEmail(response.data[0].email)
                
            })
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        //console.log(nome + ' - '+ matricula + ' - '+ email + ' - '+ senha);
        var user = {
            nome,
            matricula,
            email,
            idUsuario: userId
        };
        console.log(user)
        api.put('user', user).then(()=>{
            window.location.href = '/usuarioHome'}).catch(err => alert(err))
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
                <button onClick={handleClick}>Salvar alterações</button>
            </form>
        </div>
    )
}
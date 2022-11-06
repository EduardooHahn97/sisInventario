import React from "react";
import Nav from "../../Components/NavBar"
import { MdAddCircle, MdDeleteOutline, MdMode } from 'react-icons/md'
import './styles.css'
import swal from 'sweetalert';
import { useEffect } from "react";
import api from '../../service/api';
import {Link} from 'react-router-dom';

export default function UserHome() {
    const [close, setClose] = React.useState(false);
    const [deleteUser, setDeleteUser] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    
    useEffect(() => {
        api.get('users')
            .then(response => setUsers(response.data))
    }, [])

    const handleClose = () => {
        setClose(true);
    };

    const Delete = (id) => {
        setClose(true);
        console.log(id)
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(deleteApi(id))
    };

    const deleteApi = (id)=>{
        setDeleteUser(true)
        api.delete('user?userId='+id)
        .then(
            ()=>{
                setUsers(users.filter(user => user.id != id))
            })
    }

    return (

        <div className="user-list-container">
            <Nav />
            <div className="user-list-content">
                <div className="user-list-header">
                    <h1>Usuários Cadastrados</h1>
                    <div className="buttons">   
                        <a href="/UsuarioCreate"> <MdAddCircle size={20}/> <p>Cadastrar Usuários</p></a>       
                        <a href="/"> <p>Home</p></a>
                    </div>
                    
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Matricula</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.matricula}</td>
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/usuarioEdit/${user.id}`}><MdMode /></Link>
                                    <a onClick={()=>Delete(user.id)}><MdDeleteOutline /></a>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}
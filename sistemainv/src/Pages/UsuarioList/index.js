import React from "react";
import Nav from "../../Components/NavBar"
import { MdAddCircle, MdOutlineRemoveRedEye, MdDeleteOutline, MdMode, MdDone, MdWarning, MdOutlineQrCode, MdQrCode } from 'react-icons/md'
import './styles.css'
import swal from 'sweetalert';
import { useEffect } from "react";
import api from '../../service/api';
import {Link} from 'react-router-dom';

export default function UsuarioList() {
    const [close, setClose] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const handleOpen = () => setOpen(true);


    useEffect(() => {
        api.get('users')
            .then(response => setUsers(response.data))
    }, [])

    const Delete = (value) => {
        setClose(true);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                console.log(willDelete)
            })
    };

    return (

        <div className="item-list-container">

            <Nav />
            <div className="item-list-content">
                <div className="item-list-header">
                    <h1>Itens Cadastrados</h1>
                    <div className="buttons">
                        <a href="/itemCreate"> <MdAddCircle size={20}/> <p>Cadastrar Itens</p></a>
                        <a href="/emprestimoCreate"> <MdAddCircle size={20}/> <p> Cadastrar Emprestimo</p></a>
                    </div>
                    
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome</th>
                            <th>Matricula</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nome}</td>
                                <td>{user.matricula}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link onClick={handleOpen}><MdOutlineRemoveRedEye /></Link>
                                    <a onClick={Delete}><MdDeleteOutline /></a>
                                    <Link to={`/usuarioEdit/${user.id}`}><MdMode /></Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}
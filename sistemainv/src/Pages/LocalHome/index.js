import React from "react";
import Nav from "../../Components/NavBar"
import { MdAddCircle, MdDeleteOutline, MdMode } from 'react-icons/md'
import './styles.css'
import swal from 'sweetalert';
import { useEffect } from "react";
import api from '../../service/api';
import {Link} from 'react-router-dom';

export default function LocalHome() {
    const [close, setClose] = React.useState(false);
    const [deleteUser, setDeleteUser] = React.useState(false);
    const [locals, setUsers] = React.useState([]);
    
    useEffect(() => {
        api.get('locais')
            .then(response => setUsers(response.data))
    }, [])


    const Delete = (id) => {
        setClose(true);
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
        api.delete('local?localId='+id)
        .then(
            ()=>{
                setUsers(locals.filter(local => local.idLocal != id))
            })
    }

    return (

        <div className="local-list-container">
            <Nav />
            <div className="local-list-content">
                <div className="local-list-header">
                    <h1>Locais Cadastrados</h1>
                    <div className="buttons">   
                        <a href="/LocalCreate"> <MdAddCircle size={20}/> <p>Cadastrar Locais</p></a>       
                        <a href="/"> <p>Home</p></a>
                    </div>
                    
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Campus</th>
                            <th>Bloco</th>
                            <th>Sala</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locals.map((local) => (
                            <tr key={local.idLocal}>
                                <td>{local.campus}</td>
                                <td>{local.bloco}</td>
                                <td>{local.sala}</td>
                                <td>
                                    <Link to={`/localEdit/${local.idLocal}`}><MdMode /></Link>
                                    <a onClick={()=>Delete(local.idLocal)}><MdDeleteOutline /></a>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}
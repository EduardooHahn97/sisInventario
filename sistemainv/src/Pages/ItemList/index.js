import React from "react";
import Nav from "../../Components/NavBar"
import { MdAddCircle, MdOutlineRemoveRedEye, MdDeleteOutline, MdMode } from 'react-icons/md'
import './styles.css'
import swal from 'sweetalert';

export default function ItemList() {
    const [close, setClose] = React.useState(false);

    const handleClose = () => {
        setClose(true);
    };

    const handleListItemClick = (value) => {
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
                    <a href="/itemCreate"> <MdAddCircle /> <p>Cadastrar Itens</p></a>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome</th>
                            <th>Estado</th>
                            <th>Local</th>
                            <th>Número cod de Barras</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>id</td>
                            <td>Nome</td>
                            <td>Estado</td>
                            <td>Local</td>
                            <td>Número cod de Barras</td>
                            <td>
                                <a href="/itemShow"><MdOutlineRemoveRedEye /></a>
                                <button onClick={handleListItemClick}><MdDeleteOutline /></button>
                                <a href="/itemEdit"><MdMode /></a>
                            </td>
                        </tr>
                        <tr>
                            <td>id</td>
                            <td>Nome</td>
                            <td>Estado</td>
                            <td>Local</td>
                            <td>Número cod de Barras</td>
                            <td>
                                <a href="/itemShow"><MdOutlineRemoveRedEye /></a>
                                <a href="/itemDelete"><MdDeleteOutline /></a>
                                <a href="/itemEdit"><MdMode /></a>
                            </td>
                        </tr>
                        <tr>
                            <td>id</td>
                            <td>Nome</td>
                            <td>Estado</td>
                            <td>Local</td>
                            <td>Número cod de Barras</td>
                            <td>
                                <a href="/itemShow"><MdOutlineRemoveRedEye /></a>
                                <a href="/itemDelete"><MdDeleteOutline /></a>
                                <a href="/itemEdit"><MdMode /></a>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    )
}
import React from "react";
import Nav from "../../Components/NavBar"
import { MdAddCircle, MdOutlineRemoveRedEye, MdDeleteOutline, MdMode, MdDone, MdWarning, MdOutlineQrCode, MdQrCode } from 'react-icons/md'
import './styles.css'
import swal from 'sweetalert';
import Modal from '@mui/material/modal';
import Logo from '../../assets/logo.png';
export default function ItemList() {
    const [close, setClose] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

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

            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal" >
                    <h1>MOUSE</h1>
                    <p>DESCRIÇÃO: Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed placerat ut odio ac congue. 
                        Cras. Sed placerat ut odio ac congue. Cras.
                    </p>
                    <div className="inferior-modal">
                        <div className="info">
                            <p>ESTADO: <MdDone /></p>
                            <p>LOCAL: sala 110 Bloco C - UFSC Araranguá</p>
                            <MdQrCode size={70}/>
                        </div>
                        <img src={Logo} />
                    </div>
                </div>
            </Modal>
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
                                <button onClick={handleOpen}><MdOutlineRemoveRedEye /></button>
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
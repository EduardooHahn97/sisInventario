import React from "react";
import Nav from "../../Components/NavBar"
import { MdAddCircle, MdOutlineRemoveRedEye, MdDeleteOutline, MdMode, MdDone, MdWarning, MdOutlineQrCode, MdQrCode } from 'react-icons/md'
import './styles.css'
import swal from 'sweetalert';
import Modal from '@mui/material/modal';
import Logo from '../../assets/logo.png';
import { useEffect } from "react";
import api from '../../service/api';
import {Link} from 'react-router-dom';

export default function ItemList() {
    const [close, setClose] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);


    useEffect(() => {
        api.get('items')
            .then(response => setItems(response.data))
    }, [])

    const handleClose = () => {
        setClose(true);
    };
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
                            <MdQrCode size={70} />
                        </div>
                        <img src={Logo} />
                    </div>
                </div>
            </Modal>
            <Nav />
            <div className="item-list-content">
                <div className="item-list-header">
                    <h1>Itens Cadastrados</h1>
                    <div className="buttons">
                        <a href="/itemCreate"> <MdAddCircle size={20}/> <p>Cadastrar Itens</p></a>
                        <a href="/emprestimoCreate"> <MdAddCircle size={20}/> <p> Cadastrar Emprestimo</p></a>
                        <a href="/LocalCreate"> <MdAddCircle size={20}/> <p>Cadastrar Locais</p></a>
                    </div>
                    
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
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.estado == 1 ? <MdDone color="green" size={25  }/>: <MdWarning color="red" size={25}/> }</td>
                                <td>{item.local}</td>
                                <td>{item.codBarras}</td>
                                <td>
                                    <Link onClick={handleOpen}><MdOutlineRemoveRedEye /></Link>
                                    <a onClick={Delete}><MdDeleteOutline /></a>
                                    <Link to={`/itemEdit/${item.id}`}><MdMode /></Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
}
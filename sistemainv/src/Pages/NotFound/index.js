import './styles.css'
import Nav from '../../Components/NavBar'
import { useState, useEffect } from 'react'
import api from '../../service/api';

export default function UsuarioEdit(){

    const [locais, setLocais] = useState([]);

    useEffect(() => {
        api.get('locais')
            .then(response => setLocais(response.data))
    }, [])


    return(
        <div className="container-local-list">
            <Nav />
            <h1>Not found</h1>
        </div>
    )
}
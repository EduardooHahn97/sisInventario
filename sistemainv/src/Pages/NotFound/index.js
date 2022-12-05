import './styles.css'
import Nav from '../../Components/NavBar'
import { useState, useEffect } from 'react'
import api from '../../service/api';
import notFound from '../../assets/notfound.svg'
export default function UsuarioEdit(){

    const [locais, setLocais] = useState([]);

    useEffect(() => {
        api.get('locais')
            .then(response => setLocais(response.data))
    }, [])


    return(
        <div className="container-local-list">
            <Nav />
            <div className='img-not-found'>
                <img src={notFound} />
            </div>
        </div>
    )
}
import Logo from '../../assets/logoWhite.png'
import './styles.css'
import {MdPerson} from 'react-icons/md'
import {Navigate} from 'react-router-dom';
import { useEffect } from 'react';

export default function Nav(){
    const info = localStorage.getItem("usuarioLogado")
    const data = JSON.parse(info);

    const authenticated = async () => {
        if(data.nome == '' || data.matricula == '' || data.email == ''){
            console.log("not authenticated");
            window.location.href = '/login';
            //<Navigate replace to="/login" />;
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        window.location.href = '/login';
        localStorage.setItem("usuarioLogado", '');
        
    }

    useEffect(() => {
        authenticated();
    }, [])
    return(
        <nav>
            <a href="/"><img src={Logo} width="300px"/></a>
            <div className='person'>
                <MdPerson color='white'/>
                <p>{data.nome}</p>
                <button onClick={handleClick} class="logout">Logout</button>
            </div>
            
        </nav>
    )
}
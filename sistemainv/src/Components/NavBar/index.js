import Logo from '../../assets/logoWhite.png'
import './styles.css'
import {MdPerson} from 'react-icons/md'

export default function Nav(){
    const info = localStorage.getItem("usuarioLogado")
    const data = JSON.parse(info);

    if(data.nome == '' || data.matricula == '' || data.email == ''){
        window.location.href = '/login';
    }
    return(
        <nav>
            <a href="/"><img src={Logo} width="300px"/></a>
            <div className='person'>
                <MdPerson color='white'/>
                <p>{data.nome}</p>
            </div>
            
        </nav>
    )
}
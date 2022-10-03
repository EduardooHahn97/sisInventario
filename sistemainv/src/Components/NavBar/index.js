import Logo from '../../assets/logoWhite.png'
import './styles.css'
import {MdPerson} from 'react-icons/md'

export default function Nav(){
    return(
        <nav>
            <a href="/"><img src={Logo} width="300px"/></a>
            <div className='person'>
                <MdPerson color='white'/>
                <p>Jhennifer Matias</p>
            </div>
            
        </nav>
    )
}
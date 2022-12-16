import './styles.css'
import Nav from '../../Components/NavBar'
import { useState, useEffect } from 'react'
import api from '../../service/api';

export default function RelatorioInicio(){
    const [item, setItem] = useState(0);
    const [local, setLocal] = useState("");

    /*useEffect(() => {
        api.get('locais')
            .then(response => setLocais(response.data))
    }, [])*/


    return(
        <div className="container-local-list">
            {/*<Nav />
            <h1>Locais Cadastrados</h1>
            <table className='table-local-list'>
                <thead className='thead-local-list'>
                    <tr>
                        <th>id</th>
                        <th>Sala</th>
                        <th>Bloco</th>
                        <th>Campus</th>
                    </tr>
                </thead>
                <tbody>
                    {locais.map((local) => (
                        <tr key={local.id}>
                            <th>{local.id}</th>
                            <th>{local.sala}</th>
                            <th>{local.bloco}</th>
                            <th>{local.campus}</th>
                        </tr>


                    ))}
                </tbody>

            </table>*/}
        </div>
    )
}
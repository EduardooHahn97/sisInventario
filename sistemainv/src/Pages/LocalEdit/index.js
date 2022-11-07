import './styles.css';
import Nav from '../../Components/NavBar';
import { useState } from 'react';
import api from '../../service/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function LocalEdit(){
    const [sala, setSala] = useState('')
    const [bloco, setBloco] = useState('')
    const [campus, setCampus] = useState('')

    let { localId } = useParams();    
    useEffect(() => {
        api.get('local?localId='+localId)
            .then(response => {
                console.log(response.data[0])
                setSala(response.data[0].sala)
                setBloco(response.data[0].bloco)
                setCampus(response.data[0].campus)
                
            })
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();
        api.put('local', {sala, bloco, campus, idLocal: localId}).then(
            window.location.href="/LocalHome"
        )
    }

    return(
        <div className="container-local-edit">
            <Nav />

            <form className="form-local-edit" onSubmit={handleSubmit}>
                <h1>Cadastrar Local</h1>
                <input 
                    placeholder="Sala"
                    required
                    value={sala} 
                    onChange={(e) => setSala(e.target.value)}
                />
                
                <input 
                    type="text" 
                    placeholder="Bloco"
                    required
                    value={bloco} 
                    onChange={(e) => setBloco(e.target.value)}
                />

                <select 
                    placeholder="Campus" 
                    value={campus} 
                    onChange={(e) => setCampus(e.target.value)} 
                    required>
                    <option value="" data-default disabled selected>Selecione o Campus</option>
                    <option>Araranguá</option>
                    <option>Florianopolis</option>
                </select>
                <button type='submit'>Salvar Alterações</button>
            </form>
        </div>
    )
}
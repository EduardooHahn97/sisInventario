import './styles.css';
import Nav from '../../Components/NavBar';
import { useState } from 'react';
import api from '../../service/api';

export default function LocalCreate(){
    const [sala, setSala] = useState('');
    const [bloco, setBloco] = useState('');
    const [campus, setCampus] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        api.post('local', {sala, bloco, campus}).then(
            window.location.href="/LocalHome"
        )
    }

    return(
        <div className="container-local-create">
            <Nav />

            <form className="form-local-create" onSubmit={handleSubmit}>
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
                <button type='submit'>Criar Local</button>
            </form>
        </div>
    )
}
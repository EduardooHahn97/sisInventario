import './styles.css'
import Nav from '../../Components/NavBar'
import { useState } from 'react'

export default function LocalEdit(){
    const [sala, setSala] = useState('')
    const [bloco, setBloco] = useState('')
    const [campus, setCampus] = useState('')

    return(
        <div className="container-local-edit">
            <Nav />

            <form className="form-local-edit">
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

                <input 
                    type="text" 
                    placeholder="Campus"
                    required
                    value={campus} 
                    onChange={(e) => setCampus(e.target.value)}
                />
                <button>Criar Local</button>
            </form>
        </div>
    )
}
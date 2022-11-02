import './styles.css'
import Nav from '../../Components/NavBar'
import { useState } from 'react'
import api from '../../service/api'

export default function ItemCreate(){
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [estadoConservacao, setConservacao] = useState('')
    const [imagem, setImagem] = useState('')
    const [idLocal, setIdLocal] = useState('')


    const handleClick = (e) => {
        //console.log(nome + ' - '+ matricula + ' - '+ email + ' - '+ senha);
        var item = {
            nome: nome,
            descricao: descricao,
            estadoConservacao: estadoConservacao,
            imagem: imagem,
            codigoBarras: 111221,
            idLocal: 1,
            idUsuario: 1,
        };
        console.log(item)
        api.post('itemCreate', item)
    }

    return(
        <div className="container-item-create">
            <Nav />

            <form className="form-item-create">
                <h1>Criar Item</h1>
                <input 
                    type="text" 
                    placeholder="Nome do Produto"
                    required
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                />
                
                <textarea 
                    placeholder="Descrição"
                    required
                    value={descricao} 
                    onChange={(e) => setDescricao(e.target.value)}
                ></textarea>

                <select placeholder="Estado de Conservação">
                    <option value="" data-default disabled selected>Selecione o estado de Conservação</option>
                    <option>Bom</option>
                    <option>Ruim</option>
                    value={estadoConservacao} 
                    onChange={(e) => setConservacao(e.target.value)}
                </select>
                
                <input 
                    type="text" 
                    placeholder="imagem"
                    required
                    value={imagem} 
                    onChange={(e) => setImagem(e.target.value)}
                />

                <select>
                    <option value="" data-default disabled selected>Selecione o Local</option>
                    <option>Local 1</option>
                    <option>Local 2</option>
                    value={idLocal} 
                    onChange={(e) => setIdLocal(e.target.value)}
                </select>
                <button onClick={handleClick}>Criar item</button>
            </form>
        </div>
    )
}
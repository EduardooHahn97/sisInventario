import './styles.css'
import Nav from '../../Components/NavBar'
import { useState } from 'react'
import api from '../../service/api'

export default function ItemCreate(){
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [consevacao, setConversavacao] = useState('')
    const [imagem, setImagem] = useState('')
    const [local, setLocal] = useState('')


    const handleClick = (e) => {
        //console.log(nome + ' - '+ matricula + ' - '+ email + ' - '+ senha);
        var item = {
            nome: nome,
            descricao: descricao,
            consevacao: consevacao,
            imagem: imagem,
            local: local
        };
        console.log(item)
        api.post('item', item)
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
                    value={consevacao} 
                    onChange={(e) => setConversavacao(e.target.value)}
                </select>
                
                <input 
                    type="file" 
                    placeholder="imagem"
                    required
                    value={imagem} 
                    onChange={(e) => setImagem(e.target.value)}
                />

                <select>
                    <option value="" data-default disabled selected>Selecione o Local</option>
                    <option>Local 1</option>
                    <option>Local 2</option>
                    value={local} 
                    onChange={(e) => setLocal(e.target.value)}
                </select>
                <button onClick={handleClick}>Criar item</button>
            </form>
        </div>
    )
}
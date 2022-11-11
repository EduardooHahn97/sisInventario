import './styles.css'
import Nav from '../../Components/NavBar'
import { useState } from 'react'
import api from '../../service/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';



export default function ItemEdit(){
    const [item, setItem] = useState([])
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [conservacao, setConversavacao] = useState('')
    const [imagem, setImagem] = useState('')
    const [local, setLocal] = useState('')
    const [codigoBarras, setCodBarra] = useState('')
    const [idUsuario, setIdUsuario] = useState('')

    let { id } = useParams();
    
    const fetchCurrentUser = async(x) => {
        const userInfo = localStorage.getItem("usuarioLogado");
        const userData = JSON.parse(userInfo);
        if(userData.id) {
            setIdUsuario(userData.id);
        }
    }


    useEffect(() => {
        api.get('item?itemId='+id)
            .then(response => {
                setItem(response.data)
                setNome(response.data[0].nome)
                setDescricao(response.data[0].descricao)
                setCodBarra(response.data[0].codBarras)
                setConversavacao(response.data[0].estado)
                //setImagem(response.data[0].imagem)
                
                setLocal(response.data[0].local)
            })
            fetchCurrentUser();
    }, [])

    
    const handleClick = (e) => {
        e.preventDefault();

        let item;
        
        if(imagem == ''){
            item = {
                nome: nome,
                descricao: descricao,
                estadoConservacao: conservacao,
                idLocal: local,
                idItem: id,
                codigoBarras, 
                idUsuario: idUsuario
            }
        }else{
            item = {
                nome,
                descricao,
                estadoConservacao: conservacao,
                imagem,
                idLocal: local,
                idItem: id,
                codigoBarras,
                idUsuario: idUsuario
            }
        }
        api.put('item', item)
    }


    return(
        <div className="container-item-create">
            <Nav />

            <form className="form-item-create">
                <h1>Editar Item</h1>
                <input 
                    type="text" 
                    placeholder="Nome do Produto"
                    required
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                />

                <input 
                    type="text" 
                    placeholder="Código de Barra"
                    required
                    value={codigoBarras} 
                    onChange={(e) => setCodBarra(e.target.value)}
                />
                
                <textarea 
                    placeholder="Descrição"
                    required
                    value={descricao} 
                    onChange={(e) => setDescricao(e.target.value)}
                ></textarea>

                <select placeholder="Estado de Conservação" value={conservacao} 
                    onChange={(e) => setConversavacao(e.target.value)} >
                    <option value="" data-default disabled selected>Selecione o estado de Conservação</option>
                    <option>Bom</option>
                    <option>Ruim</option>
                </select>
                
                <input 
                    type="file" 
                    placeholder="imagem"
                    required
                    value={imagem} 
                    onChange={(e) => setImagem(e.target.value)}
                />

                <select                    value={local} 
                    onChange={(e) => setLocal(e.target.value)}>
                    <option value="" data-default disabled selected>Selecione o Local</option>
                    <option>Local 1</option>
                    <option>Local 2</option>
                </select>
                <button onClick={handleClick}>Salvar item</button>
            </form>
        </div>
    )
}
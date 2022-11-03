import './styles.css'
import Nav from '../../Components/NavBar'
import React, { useState, useEffect } from 'react'
import api from '../../service/api'
import Swal from 'sweetalert'
export default function ItemCreate(){
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [estadoConservacao, setConservacao] = useState('')
    const [imagem, setImagem] = useState('')
    const [idLocal, setIdLocal] = useState('')
    //todo - o botão OK do toastify vai pra direita em alguns casos
    const successToast = () => Swal({
        text: 'Sucesso ao cadastrar',
        position: 'center-end',
        toast:true
      });
    const [allIdLocais, setAllIdLocais] = useState('')

    const handleSubmit = async (e) => {
        //console.log(nome + ' - '+ matricula + ' - '+ email + ' - '+ senha);
        e.preventDefault();
        var item = {
            nome: nome,
            descricao: descricao,
            estadoConservacao: estadoConservacao,
            imagem: imagem,
            codigoBarras: 111221,
            idLocal: idLocal,
            idUsuario: 1,
        };
        await api.post('itemCreate', item)
        .then(successToast)
        .catch(err => {
            console.log(err)
        })
    }
    const fetchAllLocais = async (x) => {
        const locaisList = [];
        let data;
        x = await api.get('locais')
            .then((response) => {
                response.data.forEach((element) => {
                    locaisList.push(element.idLocal);
                })
            })
            .catch((err) => {
                console.log("itemCreate -> fetchAllLocais -> err", x);
                console.log(err);
            })
        setAllIdLocais(locaisList);  
    }

    useEffect(() => {
        fetchAllLocais();
    }, []);

    return(
        <div className="container-item-create">
            
           
            <Nav />
            <form className="form-item-create" onSubmit={handleSubmit}>
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
                    onChange={(e) => setConservacao(e.target.selected)}
                </select>
                
                <input 
                    type="text" 
                    placeholder="imagem"
                    required
                    value={imagem} 
                    onChange={(e) => setImagem(e.target.value)}
                />

                <select onChange={(e) => setIdLocal(e.target.value)} value={idLocal}>
                    <option value="" data-default disabled selected>Selecione o Local</option>
                    {
                    Array.from(allIdLocais).map((element, index) => {
                        return(<option key={index}>{element}</option>);
                        }
                    )}
                </select>
                <button type="submit">Criar item</button>
            </form>
        </div>
    )
}
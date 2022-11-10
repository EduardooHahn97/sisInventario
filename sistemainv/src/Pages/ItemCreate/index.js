import './styles.css'
import Nav from '../../Components/NavBar'
import React, { useState, useEffect } from 'react'
import api from '../../service/api'
import Swal from 'sweetalert';
import Scanner from '../BarCode/scanner'
import ImportArquivo from '../BarCode';

export default function ItemCreate(){
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [estadoConservacao, setConservacao] = useState('')
    const [imagem, setImagem] = useState('')
    const [idLocal, setIdLocal] = useState('')
    const [idUsuario, setIdUsuario] = useState('')
    const [codigoBarras, setCodBarra] = useState('')
    const [camera, setCamera] = useState(false)
    const [result, setResult] = useState(null)
  
    const onDetected = result => {
        console.log(result);
        setResult(result);
        setCodBarra(result);
    };
    //todo - o botão OK do toastify vai pra direita em alguns casos
    const successToast = () => {
        Swal({
            text: 'Sucesso ao cadastrar',
            position: 'center-end',
            toast:true
        })
        setNome('');
        setDescricao('');
        setConservacao('');
        setImagem('');
        setIdLocal('');
    };
    
    const [allIdLocais, setAllIdLocais] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        var item = {
            nome: nome,
            descricao: descricao,
            estadoConservacao: estadoConservacao,
            imagem: imagem,
            codigoBarras: codigoBarras,
            idLocal: idLocal,
            idUsuario: idUsuario,
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
    const fetchCurrentUser = async(x) => {
        const userInfo = localStorage.getItem("usuarioLogado");
        const userData = JSON.parse(userInfo);
        if(userData.id) {
            setIdUsuario(userData.id);
        }
    }
    useEffect(() => {
        fetchAllLocais();
        fetchCurrentUser();
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

                <select placeholder="Estado de Conservação" value={estadoConservacao} onChange={(e) => setConservacao(e.target.value)}>
                    <option value="" data-default disabled defaultValue={'Selecione o estado de Conservação'}>Selecione o estado de Conservação</option>
                    <option>Bom</option>
                    <option>Ruim</option>
                </select>
                
                <input 
                    type="file" 
                    placeholder="Anexar Imagem"
                    required
                    accept="image/png, image/jpeg, image/jpg"
                    value={imagem} 
                    onChange={(e) => setImagem(e.target.value)}
                />
                {
                    // Iniciando teste com código de barras
                    // Known issues: ao clicar em "Stop" o sistema tenta enviar o forms na mesma hora
                    // Estourando int
                }
                <div className="App">
                    <p>{result ? result : "Scanning..."}</p>
                    <button onClick={() => setCamera(!camera)}>
                        {camera ? "Stop" : "Start"}
                    </button>
                    <div className="container">
                        {camera && <Scanner onDetected={onDetected} />}
                    </div>
                </div>
                
                <select onChange={(e) => setIdLocal(e.target.value)} value={idLocal}>
                    <option value="" data-default disabled defaultValue={'Selecione o Local'}>Selecione o Local</option>
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
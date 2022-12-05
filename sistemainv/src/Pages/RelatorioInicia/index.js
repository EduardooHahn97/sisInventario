import './styles.css'
import Nav from '../../Components/NavBar'
import { useState, useEffect } from 'react'
import api from '../../service/api';
import Swal from 'sweetalert'
import Scanner from '../BarCode/scanner'

export default function RelatorioInicio(){
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
        setImagem('');
        setIdLocal('');
    };
    
    const [allIdLocais, setAllIdLocais] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        var item = {
            codigoBarras: codigoBarras,
            idLocal: idLocal,
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
        <div className="container-local-list">
            <Nav />
            <h1>Iniciar Relatório Cadastrados</h1>
            
            
            <select onChange={(e) => setIdLocal(e.target.value)} value={idLocal}>
                    <option value="" data-default disabled defaultValue={'Selecione o Local'}>Selecione o Local</option>
                    {
                    Array.from(allIdLocais).map((element, index) => {
                        return(<option key={index}>{element}</option>);
                        }
                    )}
                </select>

            <div className="App">
                    <p>{result ? result : "Scanning..."}</p>
                    <button onClick={() => setCamera(!camera)}>
                        {camera ? "Stop" : "Start"}
                    </button>
                    <div className="container">
                        {camera && <Scanner onDetected={onDetected} />}
                    </div>
                </div>
                
            <button>Add Item ao Relatorio</button>
        </div>
    )
}
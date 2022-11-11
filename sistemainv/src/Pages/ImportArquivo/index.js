import './style.css'
import Nav from '../../Components/NavBar'
import api from '../../service/api'
import { useState } from 'react'
import Swal from 'sweetalert';

export default function ImportArquivo(){

    const [arquivo, setArquivo] = useState([]);
    const [tipoArq, settipoArq] = useState(0);

    const successToast = () => {
        Swal({
            text: 'Sucesso ao cadastrar',
            position: 'center-end',
            toast:true
        })
        setArquivo('');
    };

    const handleSubmit = async (e) => {
        /*const reader = require('xlsx')
        // Reading our test file
        const file = reader.readFile(arquivo)
        let data = []
        const sheets = file.SheetNames
        for(let i = 0; i < sheets.length; i++)
        {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
                temp.forEach((res) => {
                data.push(res)
            })
        }
        // Printing data
        console.log(data)*/
        
        /*const dados = [{"arquivo":arquivo, "tipo": tipoArq}]; 
        await api.post('importArquivo', dados)
        .then(successToast)
        .catch(err => {
            console.log(err)
        })*/
    }

    console.log(arquivo);
    return(
        <div className='container-import-arquivo'>
            <Nav/>
            <form className='form-import-arquivo' onSubmit={handleSubmit}>
                <h1>Importar Arquivo</h1>
                <input
                    type='file'
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    placeholder='Escolha o arquivo .CSV'
                    onChange={(e) => setArquivo(e.target.value)}
                />
                <div>
                    <p>Selecione o tipo do Arquivo:</p>
                    <input type="radio" id="prof" name="tipoArq" value="0" onClick={(e) => settipoArq(0)}/>
                    <label for="html">Professor</label>
                    <input type="radio" id="sala" name="tipoArq" value="1" onClick={(e) => settipoArq(1)}/>
                    <label for="css">Sala</label>
                </div>
                <button>Confirmar</button>
            </form>
        </div>
    )
}
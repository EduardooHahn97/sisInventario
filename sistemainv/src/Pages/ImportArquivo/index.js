import './style.css'
import Nav from '../../Components/NavBar'
import api from '../../service/api'
import { useState } from 'react'
import Swal from 'sweetalert';
import * as XLSX from 'xlsx';

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
        settipoArq(0);
    };

    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();
    
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          setArquivo(data);
        };
        reader.readAsBinaryString(file);
      };

    const handleSubmit = async (e) => {
        const dados = {'tipo':tipoArq, 'arquivo': arquivo};
        console.log(dados);
        await api.post('importArquivo', dados)
        .then(successToast)
        .catch(err => {
            console.log(err)
        })
    }

    console.log(arquivo);
    return(
        <div className='container-import-arquivo'>
            <Nav/>
            {/*<form className='form-import-arquivo'>*/}
            <div className='form-import-arquivo'>
                <h1>Importar Arquivo</h1>
                <input
                    type='file'
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    placeholder='Escolha o arquivo .XLSX'
                    onChange={onChange}
                />
                <div>
                    <p>Selecione o tipo do Arquivo:</p>
                    <input type="radio" id="prof" name="tipoArq" value="0" onClick={(e) => settipoArq(0)}/>
                    <label for="html">Professor</label>
                    <input type="radio" id="sala" name="tipoArq" value="1" onClick={(e) => settipoArq(1)}/>
                    <label for="css">Sala</label>
                </div>
                <button onClick={handleSubmit}>Confirmar</button>
            </div>
            {/*</form>*/}
        </div>
    )
}
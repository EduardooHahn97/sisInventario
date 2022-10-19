import './style.css'
import Nav from '../../Components/NavBar'

export default function ImportArquivo(){

    return(
        <div className='container-import-arquivo'>
            <Nav/>
            <form className='form-import-arquivo'>
                <h1>Importar Arquivo</h1>
                <input
                    type='file'
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    placeholder='Escolha o arquivo .CSV'
                />
                <button>Confirmar</button>
            </form>
        </div>
    )
}
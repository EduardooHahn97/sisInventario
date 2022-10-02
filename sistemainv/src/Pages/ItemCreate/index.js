import './styles.css'
import Nav from '../../Components/NavBar'

export default function ItemCreate(){

    return(
        <div className="container-item-create">
            <Nav />

            <form className="form-item-create">
                <h1>Criar Item</h1>
                <input 
                    type="text" 
                    placeholder="Nome do Produto"
                    required
                />
                
                <textarea 
                    placeholder="Descrição"
                    required
                ></textarea>

                <select placeholder="Estado de Conservação">
                    <option value="" data-default disabled selected>Selecione o estado de Conservação</option>
                    <option>Bom</option>
                    <option>Ruim</option>
                </select>
                
                <input 
                    type="file" 
                    placeholder="imagem"
                    required
                />

                <select>
                    <option value="" data-default disabled selected>Selecione o Local</option>
                    <option>Local 1</option>
                    <option>Local 2</option>
                </select>
                <button>Criar item</button>
            </form>
        </div>
    )
}
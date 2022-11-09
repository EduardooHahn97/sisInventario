import './styles.css'
import Nav from '../../Components/NavBar'

export default function FormEmprestimoCreate(){

    return(
        <div className="container-form-create">
            <Nav />

            <form className="form-emprestimo-create">
                <h1>Cadastrar Emprestimo</h1>
                
                <select placeholder="Nome do usuário">
                    <option value="" data-default disabled selected>Selecione um usuário</option>
                    <option>Jhennifer</option>
                    <option>Eduardo</option>
                    <option>Leandro</option>
                </select>
                
                <select placeholder="Item">
                    <option value="" data-default disabled selected>Selecione o item</option>
                    <option>Mouse</option>
                    <option>Teclado</option>
                </select>
                
                <input 
                    type="date" 
                    placeholder="Data de Empréstimo"
                    required
                />

                <textarea placeholder='Observação'></textarea>

                <button>Criar Emprestimo</button>
            </form>
        </div>
    )
}
import './styles.css'
export default function ItemCreate(){

    return(
        <div className="container-item-create">
            <form className="form-item-create">
                <label>Nome do Produto 123<input type="text" /></label>
                <label>Descrição<textarea></textarea></label>      
            </form>
        </div>
    )
}
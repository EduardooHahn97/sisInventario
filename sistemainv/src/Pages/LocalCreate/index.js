import './styles.css'
import Nav from '../../Components/NavBar'

export default function LocalCreate(){


    return(
        <div className="container-local-create">
            <Nav />

            <form className="form-local-create">
                <h1>Cadastrar Local</h1>
                <input 
                    
                    placeholder="Sala"
                    required
                />
                
                <input 
                    type="text" 
                    placeholder="Bloco"
                    required
                />

                <input 
                    type="text" 
                    placeholder="Campus"
                    required
                />
                <button>Criar Local</button>
            </form>
        </div>
    )
}
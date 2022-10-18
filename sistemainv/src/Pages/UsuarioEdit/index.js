import './styles.css'
import Nav from '../../Components/NavBar'

export default function UsuarioEdit(){


    return(
        <div className="container-item-create">
            <Nav />

            <form className="form-item-create">
                <h1>Editar Usuário</h1>
                <input 
                    
                    placeholder="Nome do Usuário"
                    required
                />
                
                <input 
                    type="text" 
                    placeholder="Matricula"
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email"
                    required
                />

                <input 
                    type="password" 
                    placeholder="Senha"
                    required
                />
                <button>Salvar alterações</button>
            </form>
        </div>
    )
}
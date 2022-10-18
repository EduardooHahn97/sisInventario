import './styles.css'
import Nav from '../../Components/NavBar'

export default function UsuarioEdit(){


    return(
        <div className="container-user-create">
            <Nav />

            <form className="form-user-create">
                <h1>Cadastrar Usuário</h1>
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
                <button>Criar Usuário</button>
            </form>
        </div>
    )
}
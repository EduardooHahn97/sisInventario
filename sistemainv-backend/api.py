from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import conexao

app = FastAPI()

api = APIRouter(prefix='/api')
app.include_router(api)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
'''json = [{
        "id": 1,
        "nome": "Mouse",
        "estado": "1",
        "local": 'Lab 110 - Jardim das Avenidas - Araranguá',
        "codBarras": '1212121',
        "descricao": 'teste 123',
        "imagem": 'link'
    }, {
        "id": 2,
        "nome": "Teclado",
        "estado": "0",
        "local": 'Lab 110 - Jardim das Avenidas - Araranguá',
        "codBarras": '1212121',
        "descricao": 'teste 123',
        "imagem": 'link'
    }, {
        "id": 3,
        "nome": "Monitor",
        "estado": "0",
        "local": 'Lab 110 - Jardim das Avenidas - Araranguá',
        "codBarras": '1212121',
        "descricao": 'teste 123',
        "imagem": 'link'
    }]'''

@app.get("/api/items")
def items():
    conexao.banco.execute('select * from item')
    itens = []
    for lin in conexao.banco.fetchall():
        print("itens", lin)
        itens.append({'id':lin[0], 'nome': lin[1], 'descricao':lin[2], 'estado':lin[3], 
                    'imagem':lin[4], 'codBarras':lin[5], 'local':lin[6], 'usuario':lin[7]})
    return itens


@app.get("/api/item")
def item(itemId):
    conexao.banco.execute('select * from item where item.id ='+itemId)
    itens = []
    for lin in conexao.banco.fetchall():
        print("itens", lin)
        itens.append({'id':lin[0], 'nome': lin[1], 'descricao':lin[2], 'estado':lin[3], 
                    'imagem':lin[4], 'codBarras':lin[5], 'local':lin[6], 'usuario':lin[7]})
    return itens
    
@app.get("/api/users")
def usuarios():
    conexao.banco.execute('select * from usuario')
    usuarios = []
    for lin in conexao.banco.fetchall():
        usuarios.append({'id':lin[0], 'nome': lin[2], 'matricula':lin[1], 'email':lin[3]})
    return usuarios

@app.get("/api/user")
def usuarios(userId):
    conexao.banco.execute('select * from usuario where usuario.id ='+userId)
    usuarios = []
    for lin in conexao.banco.fetchall():
        usuarios.append({'id':lin[0], 'nome': lin[2], 'matricula':lin[1], 'email':lin[3]})
    return usuarios

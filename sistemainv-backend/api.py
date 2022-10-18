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

@app.get("/api/items")
def items():
    json = [{
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
    }]
    return json


@app.get("/api/item")
def item(itemId):
    json = {
        "id": 1,
        "nome": "Mouse",
        "estado": "1",
        "local": 'Lab 110 - Jardim das Avenidas - Araranguá',
        "codBarras": '1212121',
        "descricao": 'teste 123',
        "imagem": 'link'
    }
    
    return json
    
@app.get("/api/users")
def usuarios():
    conexao.banco.execute('select * from usuario')
    teste = []
    for lin in conexao.banco.fetchall():
        print("users", lin)
        teste.append({'id':lin[0], 'nome': lin[2], 'matricula':lin[1], 'email':lin[3]})
    return teste


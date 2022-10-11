from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/items")
def item():
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
    }]
    return json
from pydantic import BaseModel, Field

class Item(BaseModel):
    nome: str
    descricao: str
    estadoConservacao:str
    imagem: str
    codigoBarras: str
    idLocal: str
    idUsuario: str

class User(BaseModel):
    nome: str
    email: str
    senha:str
    matricula: str
    token: str 

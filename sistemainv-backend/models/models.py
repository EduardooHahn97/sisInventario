from pydantic import BaseModel, Field
from  typing import Optional

class Item(BaseModel):
    nome: str
    descricao: str
    estadoConservacao:str
    imagem: Optional[str] = None
    codigoBarras: str
    idLocal: int
    idUsuario: int


class ItemId(BaseModel):
    nome: str
    descricao: str
    estadoConservacao:str
    imagem: Optional[str] = None
    codigoBarras: Optional[str] = None
    idLocal: str
    idUsuario: Optional[int]
    idItem: str

class User(BaseModel):
    nome: str
    email: str
    senha:str
    matricula: str
    token: str 

class UserId(BaseModel):
    nome: str
    email: str
    senha: Optional[str]
    matricula: str
    token: Optional[str] 
    idUsuario: int


class Login(BaseModel):
    email: str
    senha: str
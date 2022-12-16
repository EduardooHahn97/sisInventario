from pydantic import BaseModel, Field
from  typing import Optional
from datetime import datetime

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


class Local(BaseModel):
    sala: str
    bloco: str
    campus: str


class LocalId(BaseModel):
    sala: str
    bloco: str
    campus: str
    idLocal: int


class Emprestimo(BaseModel):
    idUsuario: int
    idItem: int
    dataRetirada: datetime
    observacao: str

class arquivo(BaseModel):
    tipo: Optional[str]
    arquivo: Optional[str]

class Conferencia(BaseModel):
    codigoBarras: str
    idLocal: int
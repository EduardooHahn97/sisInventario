from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import conexao
import pandas as pd
import numpy as np

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


def importArquivos(arq):
    print(arq)
    '''colunas = ['idItem', 'prefixo', 'patrimonio', 'codBarras', 'controle', 'material', 'situacao', 'valor', 'nada', 'nada2']

    arquivo = pd.read_excel('inv.xlsx',header = None, names=colunas)
    
    obj = []
    local = 'teste'
    for i in range(len(arquivo)):
        linha = arquivo.loc[i]
        x = str(linha['material']).split('-')
        desc = ''
        for i in range(len(x)-1):
            desc = desc +'-' +x[i+1] 
        
        if(type(linha['idItem']) == str):
            if 'Orgao:' in linha['idItem']:
                p = str(linha['idItem']).split('Orgao:')
                l = str(p[1]).split('Funcionario:')
                
            if 'Setor:' in linha['idItem'] and ('Edificac;ao:' in linha['idItem'] or 'Edificac,ao:' in linha['idItem'] ) and 'Ambiente:' in linha['idItem']:
                j = str(linha['idItem']).split('Setor:')
                seto = str(j[1]).split('Edificac;ao:')
                if len(seto) < 2:
                    seto = str(j[1]).split('Edificac,ao:')
                setor = seto[0]
                e = str(linha['idItem']).split('Edificac;ao:')
                if len(e) < 2:
                    e = str(linha['idItem']).split('Edificac,ao:')
                edifica = str(e[1]).split('Ambiente:')
                edificacao = edifica[0]
                a = str(linha['idItem']).split('Ambiente:')
                amb = a[1]
                
                local = setor + ' - ' +edificacao + ' - ' + amb  
        
        if(type(linha['idItem']) == int):
            obj.append({'nome':x[0], 'descricao': desc,'codigoBarras': linha['codBarras'], 
                    'local':local, 'valor':linha['valor'],'patrimonio':linha['patrimonio']})

    print(obj)'''
    
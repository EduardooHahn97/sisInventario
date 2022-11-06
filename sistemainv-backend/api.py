from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
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
    conexao.banco.execute('select * from item')
    itens = []
    for lin in conexao.banco.fetchall():
        print("itens", lin)
        itens.append({'id':lin[0], 'nome': lin[1], 'descricao':lin[2], 'estado':lin[3], 
                    'imagem':lin[4], 'codBarras':lin[5], 'local':lin[6], 'usuario':lin[7]})
    return itens


@app.get("/api/item")
def item(itemId):
    conexao.banco.execute('select * from item where item.idItem ='+itemId)
    itens = []
    for lin in conexao.banco.fetchall():
        print("itens", lin)
        itens.append({'id':lin[0], 'nome': lin[1], 'descricao':lin[2], 'estado':lin[3], 
                    'imagem':lin[4], 'codBarras':lin[5], 'local':lin[6], 'usuario':lin[7]})
    return itens


@app.delete("/api/item")
def item_delete(itemId):
    conexao.banco.execute('delete from item where item.idItem ='+itemId)
    conexao.conn.commit()
    ## fazer verificacao de erro 
    return True

class Item(BaseModel):
    nome: str
    descricao: str
    estadoConservacao:str
    imagem: str
    codigoBarras: str
    idLocal: str
    idUsuario: str

@app.post("/api/itemCreate")
def itemCreate(item: Item):
    sql = 'insert into item (nome, descricao, estadoConservacao, imagem, codigoBarras, idLocal, idUsuario) values (%s, %s, %s, %s, %s, %s, %s)'
    print(item.nome)
    valores = (item.nome,
                item.descricao,
                item.estadoConservacao,
                item.imagem,
                item.codigoBarras,
                item.idLocal,
                item.idUsuario)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "item inserido.")
    return True


@app.put("/api/item")
def itemUpdate(item):
    sql = 'update item set nome=%s, descricao=%s, estadoConservacao=%s, imagem=%s, codigoBarras=%s, idLocal=%s, idUsuario=%s where idItem = %s'
    #sql = 'insert into item (nome, descricao, estadoConservacao, imagem, codigoBarras, idLocal, idUsuario) values (%s, %s, %s, %s, %s, %s, %s)'
    valores = (item.nome,
                item.descricao,
                item.estadoConservacao,
                item.imagem,
                item.codigoBarras,
                item.idLocal,
                item.idUsuario,
                item.idItem)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "item atualizado.")
    return True
    
@app.get("/api/users")
def usuarios():
    conexao.banco.execute('select * from usuario')
    usuarios = []
    for lin in conexao.banco.fetchall():
        usuarios.append({'id':lin[0], 'nome': lin[2], 'matricula':lin[1], 'email':lin[3]})
    return usuarios

@app.get("/api/user")
def usuario(userId):
    conexao.banco.execute('select * from usuario where usuario.id ='+userId)
    usuarios = []
    for lin in conexao.banco.fetchall():
        usuarios.append({'id':lin[0], 'nome': lin[2], 'matricula':lin[1], 'email':lin[3]})
    return usuarios

@app.post("/api/user")
def userCreate(user):
    print(user)
    sql = 'insert into usuario (matricula, nome, email, senha, token) values (%s, %s, %s, %s, %s)'
    valores = (user.matricula,
                user.nome,
                user.email,
                user.senha,
                user.token)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "user inserido.")
    return True


@app.put("/api/user")
def userUpdate(user):
    print(user)
    sql = 'update usuario set matricula=%s, nome=%s, email=%s, senha=%s, token=%s where idUsuario=%s'
    #sql = 'insert into usuario (matricula, nome, email, senha, token) values (%s, %s, %s, %s, %s)'
    valores = (user.matricula,
                user.nome,
                user.email,
                user.senha,
                user.token,
                user.idUsuario)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "user atualizado.")
    return True


@app.get("/api/locais")
def locais():
    conexao.banco.execute('select * from local')
    locais = []
    for lin in conexao.banco.fetchall():
        locais.append({'idLocal':lin[0], 'sala': lin[1], 'bloco':lin[2], 'campus':lin[3]})
    return locais

@app.get("/api/local")
def local(localId):
    conexao.banco.execute('select * from local where local.id ='+localId)
    locais = []
    for lin in conexao.banco.fetchall():
        locais.append({'id':lin[0], 'sala': lin[1], 'blobo':lin[2], 'campus':lin[3]})
    return locais

@app.post("/api/local")
def localCreate(local):
    sql = 'insert into local (sala, bloco, campus) values (%s, %s, %s, %s, %s)'
    valores = (local.sala,
                local.bloco,
                local.campus)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "local inserido.")
    return True


@app.put("/api/local")
def localUpdate(local):
    sql = 'update local set sala=%s, bloco=%s, campus=%s where idLocal=%s'
    #sql = 'insert into local (sala, bloco, campus) values (%s, %s, %s, %s, %s)'
    valores = (local.sala,
                local.bloco,
                local.campus,
                local.idLocal)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "local atualizado.")
    return True

@app.post("/api/importArquivo")
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
    
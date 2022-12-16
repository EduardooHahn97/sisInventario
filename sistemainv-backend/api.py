from fastapi import FastAPI, APIRouter, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import conexao
from models.models import Item, User, ItemId, UserId, Login, Local, LocalId, Emprestimo, arquivo, Conferencia
from datetime import datetime
import pandas as pd
import numpy as np
from io import StringIO ## for Python 3

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
        itens.append({'id':lin[0], 'nome': lin[1], 'descricao':lin[2], 'estado':lin[3], 
                    'imagem':lin[4], 'codBarras':lin[5], 'local':lin[6], 'usuario':lin[7]})
    return itens

@app.get("/api/item")
def item(itemId):
    conexao.banco.execute('select * from item where item.idItem ='+itemId)
    itens = []
    for lin in conexao.banco.fetchall():
        itens.append({'id':lin[0], 'nome': lin[1], 'descricao':lin[2], 'estado':lin[3], 
                    'imagem':lin[4], 'codBarras':lin[5], 'local':lin[6], 'usuario':lin[7]})
    return itens


@app.delete("/api/item")
def item_delete(itemId):
    conexao.banco.execute('delete from item where item.idItem ='+itemId)
    conexao.conn.commit()
    ## fazer verificacao de erro 
    return True

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
def itemUpdate(item: ItemId):
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
    conexao.banco.execute('select * from usuario where usuario.idUsuario ='+userId)
    usuarios = []
    for lin in conexao.banco.fetchall():
        usuarios.append({'id':lin[0], 'nome': lin[2], 'matricula':lin[1], 'email':lin[3]})
    return usuarios


@app.post("/api/user")
def userCreate(user: User):
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
def userUpdate(user: UserId):
    print(user)
    sql = 'update usuario set matricula=%s, nome=%s, email=%s where usuario.idUsuario=%s'
    valores = (user.matricula,
                user.nome,
                user.email,
                user.idUsuario)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "user atualizado.")
    return True

@app.delete("/api/user")
def user_delete(userId):
    conexao.banco.execute('delete from usuario where usuario.idUsuario ='+userId)
    conexao.conn.commit()
    ## fazer verificacao de erro 
    return True

@app.post("/api/login")
def login(login:Login):
    query = 'select * from usuario where email ="'+login.email + '" and senha ="' + login.senha + '"'
    print(query)
    conexao.banco.execute(query)
    usuarios = []
    for lin in conexao.banco.fetchall():
        usuarios.append({'id':lin[0], 'nome': lin[2], 'matricula':lin[1], 'email':lin[3]})
    
    if usuarios == []: 
        raise HTTPException(status_code=404, detail="Item not found")

    return usuarios
    
@app.get("/api/locais")
def locais():
    conexao.banco.execute('select * from local')
    locais = []
    for lin in conexao.banco.fetchall():
        locais.append({'idLocal':lin[0], 'sala': lin[1], 'bloco':lin[2], 'campus':lin[3]})
    return locais

@app.get("/api/local")
def local(localId):
    conexao.banco.execute('select * from local where local.idLocal ='+localId)
    locais = []
    for lin in conexao.banco.fetchall():
        locais.append({'id':lin[0], 'sala': lin[1], 'bloco':lin[2], 'campus':lin[3]})
    return locais

@app.post("/api/local")
def localCreate(local: Local):
    sql = 'insert into local (sala, bloco, campus) values (%s, %s, %s)'
    valores = (local.sala,
                local.bloco,
                local.campus)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "local inserido.")
    return True


@app.put("/api/local")
def localUpdate(local:LocalId):
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


@app.delete("/api/local")
def local_delete(localId):
    conexao.banco.execute('delete from local where local.idLocal =' + localId)
    conexao.conn.commit()
    ## fazer verificacao de erro 
    return True

@app.get("/api/emprestimos")
def emprestimo():
    conexao.banco.execute('select * from emprestimo')
    locais = []
    for lin in conexao.banco.fetchall():
        conexao.banco.execute('select * from item where idItem= ' +str(lin[2]))
        item = conexao.banco.fetchone()
        conexao.banco.execute('select * from usuario where idUsuario= ' +str(lin[1]))
        usuario = conexao.banco.fetchone()
        locais.append({'idEmprestimo':lin[0], 'usuarioInfos':usuario, 'itemInfos': item, 'dataRetirada':lin[3], 'dataDevolucao':lin[4], 'observacao':lin[5]})
    return locais


@app.post("/api/emprestimo")
def emprestimoCreate(emprestimo: Emprestimo):
    sql = 'insert into emprestimo (idUsuario, idItem, dataRetirada, observacao) values (%s, %s, %s, %s)'
    valores = (emprestimo.idUsuario,
                emprestimo.idItem,
                datetime.now(),
                emprestimo.observacao)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "emprestimo inserido.")
    return True

@app.delete("/api/emprestimo")
def emprestimo_delete(EmprestimoId):
    conexao.banco.execute('delete from emprestimo where idEmprestimo =' + EmprestimoId)
    conexao.conn.commit()
    ## fazer verificacao de erro 
    return True


@app.post("/api/conferencia")
def conferencia_create(conferencia: Conferencia):
    print(conferencia)
    conexao.banco.execute('select * from item where item.codigoBarras =' + conferencia.codigoBarras)
    item = conexao.banco.fetchone()
    print(item)
    sql = 'insert into conferencia (idLocal, idItem, quantidade) values (%s, %s, %s)'
    valores = (emprestimo.idUsuario,
                emprestimo.idItem,
                datetime.now(),
                emprestimo.observacao)
    conexao.banco.execute(sql, valores)

    conexao.conn.commit()

    print(conexao.banco.rowcount, "emprestimo inserido.")
    return True

@app.post("/api/importArquivo")
def importArquivos(dados:arquivo):
    #tipoArquivo 0 - arquivo de professor(varios locias) 
    #tipoArquivo 1 - arquivo de um local 
    #print(dados)
    tipoArquivo = dados.tipo
    StringArquivo = dados.arquivo
    if (tipoArquivo == '0'):
        colunas = ['idItem', 'prefixo', 'patrimonio', 'codBarras', 'controle', 'material', 'situacao', 'valor', 'nada', 'nada2', 'nada3']

        #arquivo = pd.read_excel('inv.xlsx',header = None, names=colunas)
        
        obj = []
        local = 'teste'
        csvArquivo = StringIO(StringArquivo)

        arquivo = pd.read_csv(csvArquivo, sep=",", header = None, names=colunas)
        for i in range(len(arquivo)):
            x = str(arquivo['material'][i]).split('-')
            desc = ''
            for j in range(len(x)-1):
                desc = desc +'-' +x[j+1] 
            
            print('tipo IDITEM:' , type(arquivo['idItem'][i]), 'ID: ', i)
            if(type(arquivo['idItem'][i]) == str):
                if 'Funcionario:' in arquivo['idItem'][i]:
                    func = str(arquivo['idItem'][i]).split('Funcionario:')
                    div = str(func[1]).split('-')
                    nomeFunc = div[1]

                if 'Orgao:' in arquivo['idItem'][i]:
                    p = str(arquivo['idItem'][i]).split('Orgao:')
                    l = str(p[1]).split('Funcionario:')
                    
                if 'Setor:' in arquivo['idItem'][i] and ('Edificac;ao:' in arquivo['idItem'][i] or 'Edificac,ao:' in arquivo['idItem'][i] ) and 'Ambiente:' in arquivo['idItem'][i]:
                    j = str(arquivo['idItem'][i]).split('Setor:')
                    seto = str(j[1]).split('Edificac;ao:')
                    if len(seto) < 2:
                        seto = str(j[1]).split('Edificac,ao:')
                    setor = seto[0]
                    e = str(arquivo['idItem'][i]).split('Edificac;ao:')
                    if len(e) < 2:
                        e = str(arquivo['idItem'][i]).split('Edificac,ao:')
                    edifica = str(e[1]).split('Ambiente:')
                    edificacao = edifica[0]
                    a = str(arquivo['idItem'][i]).split('Ambiente:')
                    amb = a[1]
                    
                    local = setor + ' - ' +edificacao + ' - ' + amb  
            print(arquivo['idItem'][i][0])

            listaInteiros = ["0","1","2","3","4","5","6","7","8","9"]

            if (str(arquivo['idItem'][i][0]) in listaInteiros):
                obj.append({'nome':x[0], 'descricao': desc,'codigoBarras': arquivo['codBarras'][i], 
                        'local':local, 'valor':arquivo['valor'][i],'patrimonio':arquivo['patrimonio'][i]})

        print(obj)

        for item in obj:
            sql = 'select * from item where codigoBarras= ' + str(item['codigoBarras'])
            conexao.banco.execute(sql)
            itemBanco = conexao.banco.fetchone()
            if itemBanco:
                print("Item ja esta cadastrado: ", item['nome'])
            else:
                ix = item['local'].split(' - ')
                #print(ix) 
                campus = ix[2]
                bloco = ix[1]
                sala = ix[4]  
                #print('c: ', campus, ' - ','b: ', bloco, ' - ','s: ', sala)
                  
                sql = "select * from local where sala='"+str(sala).strip()+"' and bloco='"+str(bloco).strip()+"'"
                conexao.banco.execute(sql)
                localItem = conexao.banco.fetchone()
                #print("local busca BANCO:", localItem)
                localBancoItem = 1
                if localItem == None:
                    sql = "insert into local (campus, bloco, sala) values (%s, %s, %s)"
                    valores = (str(campus).strip(),
                                str(bloco).strip(),
                                str(sala).strip())    
                        
                        
                        #'"+str(campus).strip()+"','"+str(bloco).strip()+"','"+str(sala).strip()+"')"
                    conexao.banco.execute(sql, valores)
                    conexao.conn.commit()
                    print(conexao.banco.rowcount, "local inserido.")
                else:
                    #print("->", localItem[0])
                    sql1 = "select * from usuario where nome = '"+str(nomeFunc).strip()+"'"
                    print(sql1)
                    conexao.banco.execute(sql1)
                    idFunc = conexao.banco.fetchone()

                    if idFunc == None:
                        sql = 'insert into usuario (nome, email, senha, token) values (%s, %s, %s, %s)'
                        #print(sql)
                        valores = (str(nomeFunc).strip(),
                                    str(nomeFunc).strip()+'@ufsc.com.br',
                                    '123',
                                    '123')
                        #print(valores)
                        conexao.banco.execute(sql, valores)
                        conexao.conn.commit()
                        print(conexao.banco.rowcount, "Item inserido.")



                    sql = "select * from item where codigoBarras = "+item['codigoBarras']
                    #print(sql)
                    conexao.banco.execute(sql)
                    itemBanco = conexao.banco.fetchone()
                    #print("ITEM busca BANCO:", itemBanco)
                    if itemBanco == None:
                        sql = 'insert into item (nome, descricao, codigoBarras, idLocal, idUsuario) values (%s, %s, %s, %s, %s)'
                        #print(sql)
                        valores = (item['nome'],
                                    item['descricao'],
                                    item['codigoBarras'],
                                    localItem[0], 
                                    idFunc[0])
                        #print(valores)
                        conexao.banco.execute(sql, valores)
                        conexao.conn.commit()
                        print(conexao.banco.rowcount, "Item inserido.")

    elif (tipoArquivo == '1'):
        colunas = ['patrimonio', 'controle', 'codBarras', 'serie', 'descricao', 'conservacao', 'incorporacao', 'transferencia','nan', 'valor', 'situacao']

        #arquivo = pd.read_excel('ivent.xlsx',header = None, names=colunas)

        #arquivo.pop('nan')
        obj = []
        local = 'teste'
        csvArquivo = StringIO(StringArquivo)

        arquivo = pd.read_csv(csvArquivo, sep=",", header = None, names=colunas)
        for i in range(len(arquivo)):
            #linha = arquivo.loc[i]
            print('tipo PATRIMONIO:' , type(arquivo['patrimonio'][i]) )
            if(type(arquivo['patrimonio'][i]) == str):
                if('Edificac;ao:' in arquivo['patrimonio'][i] or 'Edificac,ao:' in arquivo['patrimonio'][i] or 'Edificação:' in arquivo['patrimonio'][i]):
                    x = str(arquivo['patrimonio'][i]).split('Edificação:')
                    edificacao = str(x[1]).split('Setor:')
                    setor = str(y[1]).split('Ambiente:')
                    ambiente = str(z[1]).split('Situação:')
                    local = setor[0] + ' - ' +edificacao[0] + ' - ' + ambiente[0]
                    print(local)
                    
                
            #['patrimonio', 'controle', 'codBarras', 'serie', 'descricao', 'conservacao', 
            #'incorporacao', 'transferencia','nan', 'valor', 'situacao']
            if(type(arquivo['patrimonio'][i]) == int):
                x = str(arquivo['descricao'][i]).split('-')
                obj.append({'nome':x[0], 'descricao': arquivo['descricao'][i],'codigoBarras': arquivo['codBarras'][i], 
                        'local':local, 'valor':arquivo['valor'][i],'patrimonio':arquivo['patrimonio'][i]})

        print(obj) 

        '''for item in obj:
            conexao.banco.execute('select * from item where codigoBarras= ',str(item['codBarras']))
            itemBanco = conexao.banco.fetchone()
            if itemBanco:
                print("Item ja esta cadastrado: ", item['nome'])
            else:
                ix = item.local.split(' - ')
                isetor = x[0]
                iedificacao = x[1]
                iambiente = x[2]     
                
                conexao.banco.execute('select * from local where sala= ',iambiente,'and bloco= ',iedificacao)
                localItem = conexao.banco.fetchone()
                localBancoItem = 1
                if localItem:
                    localBancoItem = localItem['idLocal']

                sql = 'insert into item (nome, descricao, codigoBarras, local, valor, patrimonio) values (%s, %s, %s, %s, %s, %s)'
                valores = (item.nome,
                            item.descricao,
                            item.codigoBarras,
                            localBancoItem,
                            item.valor,
                            item.patrimonio)
                conexao.banco.execute(sql, valores)

                conexao.conn.commit()

                print(conexao.banco.rowcount, "Item inserido.")'''
    else:
        print("Tipo do arquivo nao identificado")


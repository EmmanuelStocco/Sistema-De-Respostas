const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const connection = require('./database/database') //recebendo a conexão 
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database (utilizando a importação do sequelize com a função authenticate)
connection
    .authenticate()
    .then(()=> {
        console.log("Conexão feita com o banco de dados")
    })
    .catch((msgErro)=> {
        console.log(msgErro)
    })

//Esxpress de view engine
app.set('view engine', 'ejs'); 
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false})) //acionando bodyParser para decodificar dados de um formulario
app.use(bodyParser.json()) //traduzindo dados de formularios enviados via json quando for necessario

//rotas
app.get("/", (req, res)=> { 
    //pergando dados da tabela Perguntas == SELECT * FROM perguntas
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC']
    ] }).then(perguntas => { //apos listar mande as perguntas para o then 
        res.render("index", {
            perguntas: perguntas //pega as perguntas e joga em uma array pra views
        })
    }) 
})

app.get("/perguntar", (req, res)=> { 
    res.render("perguntar") //renderieze a view perguntar
})

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo
    var descricao = req.body.descricao

    //inserindo dados na tabela sql
    Pergunta.create({  
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/") //função do express que redireciona o user para onde quisermos - no caso para pag principal
    })
})

app.get("/pergunta/:id", (req, res)=>{ //parametroid
    var id = req.params.id //pegando o id(parametro)
    //buscar pelo id q o usuer digito -> na tabela 
    Pergunta.findOne({ //findOne é um metodo do sequelize que busca 1 dado com a condição que for passada
        where: {id: id} //uma pergunta que tenha o id igual o id que digitei na url {titulo: 'tres porquinhos'}
    }).then(pergunta =>{ //quando achar, vai chamar o then e passar a pergunta que foi achada (se n achar vai dar null)
        if(pergunta != undefined) { //Pergunta achada
            //encontrando respostas que tenham a coluna/campo perguntaid igual ao da pergunta
            Resposta.findAll({
                where: {PerguntaId: pergunta.id},
                order: [
                     ['id', 'DESC'] 
                        ]
            }).then(respostas =>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
 
        }else{ //não encontrada
            res.redirect('/')
        }
    })
})

app.post("/responder", (req, res)=>{
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId 
    }).then(()=> {
        res.redirect("/pergunta/" + perguntaId)
    })
})

////
app.listen(3000, ()=>{console.log("App rodondo!")})
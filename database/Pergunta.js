const Sequelize = require("sequelize")
const connection = require("./database")

//use define para criar model(tabela), pergunta é nome da tabela
//nome do campo e o titulo dele (titulo e o valor)
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING, //textos curtos STRING
        allowNull: false //não permite q o campo receba valores nulos
    },
    descricao: {
        type: Sequelize.TEXT, //textos longos TEXT
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{
    console.log("tabela Pergunta criada")
})

module.exports = Pergunta;

//Pergunta.sync vai conectar com o BD e caso não exista uma tabela com esse nome (pergunta) vai criar
//force: false, esta ordenando que não force a criação dessa tabela caso já exista uma com o mesmo nome
const express = require("express")
const server = express()

// configuracao de arquivos estaticos (css scripts)

server.use(express.static("public"))

server.use(express.urlencoded ({ extended:true }))

// configuracao nunjucks

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

const db = require("./db")

// criacao da rota /
// captura do pedido
let lastideas = []
server.get("/", function(req, res){


    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log(err)

        const reversedIdeas = [...rows].reverse()

        for (let idea of reversedIdeas) {
            if(lastideas.length < 2) {
                lastideas.push(idea)
            }
        }

    })

    return res.render("index.html", { ideas: lastideas })
})

server.get("/ideas", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) return console.log(err)

        const reversedIdeas = [...rows].reverse()

        return res.render("ideas.html", {ideas: reversedIdeas})
    })
})

server.post("/", function(req, res){
    
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        )VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,

    ]

    db.run(query, values, function(err){
        if (err) return Console.log(err)

        return res.redirect("/ideas")
    })
})

server.listen(3000) 
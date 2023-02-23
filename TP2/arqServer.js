let http = require("http")
let fs = require("fs")
let url = require("url")


http.createServer(function(req,res){
    let q2 = url.parse(req.url,true);
    console.log(q2.pathname)
    let content='text/html;charset=utf-8'
    if (q2.pathname == "/"){
        fileName = "RPCW2023/TP2/index.html"
        
    }
    else {
        let regex = /\d+/g
        let matches = q2.pathname.match(regex)
        let number = matches[0]
        fileName =`RPCW2023/TP2/Arq Files/arq${number}.html`
        content = 'text/html;charset=utf-8'
    }

    fs.readFile(fileName, (err,data)=>{
        res.writeHead(200,{'Content-Type':content})
        if (err)
            res.write("Erro: " + err)
        else 
            res.write(data)
        res.end()
    })
}).listen(7777)


console.log("Servidor ligado!")

        
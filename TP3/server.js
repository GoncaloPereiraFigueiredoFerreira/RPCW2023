let http = require("http");
let url = require("url");
let fs = require("fs");
let indexMaker = require("./indexMaker")



function requestHandler(req,res){

    var dicURL = url.parse(req.url,true);
    let data = fs.readFileSync("TP3/dataset-result.json")
    data = JSON.parse(data);

    if (dicURL.pathname == "/"){
        res.writeHead(200,{'Content-Type':'text/html; charset=uft-8'})
        res.end(indexMaker.mainIndex(data))
    }
    else if (/p(\d+)$/g.test(dicURL.pathname)){
        let match = dicURL.pathname.match(/\/p(\d+)$/)
        let pageN = parseInt(match[1])
        if (pageN>0 && pageN<2002){
            res.writeHead(200,{'Content-Type':'text/html; charset=uft-8'})
            res.end(fs.readFileSync(`TP3/pessoas/p${pageN}.html`))
        }
    }
    else if (dicURL.pathname == "/sex"){
        let q = dicURL.query
        res.writeHead(200,{'Content-Type':'text/html; charset=uft-8'})
        res.end(indexMaker.sexIndex(data,q.s))
    }
    else if (dicURL.pathname == "/job"){
        let q = dicURL.query
        res.writeHead(200,{'Content-Type':'text/html; charset=uft-8'})
        res.end(indexMaker.jobIndex(data,q.j))
    }
    else if (dicURL.pathname == "/sport"){
        let q = dicURL.query
        res.writeHead(200,{'Content-Type':'text/html; charset=uft-8'})
        res.end(indexMaker.sportIndex(data,q.s))
    }
}





let myserver = http.createServer(requestHandler);
myserver.listen(7777);
console.log("Servidor a correr!!!")







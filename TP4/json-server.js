var http = require('http')
const { parse } = require('querystring');
var templates = require('./templates');



function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

completed = []
todos =[]


// Server creation

var todoServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    switch(req.method){
            case "GET": 
                // GET / todo --------------------------------------------------------------------
                if(req.url == "/") {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(templates.todoPage(todos,completed))    
                }
                else if(/complete(\d+)$/g.test(req.url)){
                    let match = req.url.match(/complete(\d+)$/)
                    let pageN = parseInt(match[1])
                    d = new Date().toISOString().substring(0, 16)
                    completed.push({
                        "id":todos[pageN].id,
                        "deadline":todos[pageN].deadline,
                        "worker":todos[pageN].worker,
                        "task":todos[pageN].task,
                        "type":todos[pageN].type,     
                        "completion": d                  
                    })
                    todos.splice(0,1)
                    console.log(todos)
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.end(`<head>
                    <meta http-equiv="Refresh" content="0; URL=http://localhost:7777/" />
                  </head>
                  `) 
                }
                break;
                
            case "POST":
                if(req.url == '/add'){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    let a = res.data
                    collectRequestBodyData(req,(result)=>{
                        if(result){
                            console.dir(result)
                            
                            todos.push(
                                {
                                    "id":todos.length,
                                    "deadline":result.deadline,
                                    "worker":result.worker,
                                    "task":result.task,
                                    "type":result.type                           
                                })
                        }
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("");
                        res.end(`<head>
                        <meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/>
                      </head>
                      `)
                    })
                }
                
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
)

todoServer.listen(7777, ()=>{
    console.log("Servidor à escuta no URL: http://localhost:7777/")
})




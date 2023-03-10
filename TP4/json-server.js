var http = require('http')
const { parse } = require('querystring');
var templates = require('./templates');
var axios = require("axios");



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

let edit = []

let counter=0
// Server creation

var todoServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    switch(req.method){
            case "GET": 
                // GET / todoList --------------------------------------------------------------------
                if(req.url == "/") {
                        axios.get("http://localhost:3000/completed").then((completed)=>{
                            axios.get("http://localhost:3000/todos").then((todos)=>{
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                counter=completed.data.length + todos.data.length
                                
                                res.end(templates.todoPage(todos.data,completed.data,edit))  
                            })
                        }).catch((error)=>console.log(error.message))
                }
                
                // GET / complete --------------------------------------------------------------------
                else if(/complete(\d+)$/g.test(req.url)){
                    let match = req.url.match(/complete(\d+)$/)
                    let id = parseInt(match[1])
                    d = new Date().toISOString().substring(0, 16)
                    axios.get("http://localhost:3000/todos/"+id).then((todo)=>{
                        axios.post("http://localhost:3000/completed",
                        {
                            "id":todo.data.id,
                            "deadline":todo.data.deadline,
                            "worker":todo.data.worker,
                            "task":todo.data.task,
                            "type":todo.data.type,     
                            "completion": d                  
                        }).then(()=>{
                            axios.delete(`http://localhost:3000/todos/${todo.data.id}`
                            ).then(()=>{
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(`<head>
                                <meta http-equiv="Refresh" content="0; URL=http://localhost:7777/" />
                              </head>`) 
                            })
                        })
                    })
                    
                }
                break;
                
                case "POST":  
                    if(req.url == '/add'){                    
                    collectRequestBodyData(req,(result)=>{
                        if(result){
                            axios.post("http://localhost:3000/todos",
                                {
                                    "id": counter+1,
                                    "deadline": result.deadline,
                                    "worker":result.worker,
                                    "task":result.task,
                                    "type":result.type,                      
                                }).then(()=>{
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end(`<head>
                                    <meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/>
                                  </head>
                                  `)
                                })
                        }
                    })
                }
                else if(/removeTD(\d+)$/g.test(req.url)){
                    let match = req.url.match(/removeTD(\d+)$/)
                    let id = parseInt(match[1])
                    axios.delete(`http://localhost:3000/todos/${id}`
                    ).then(()=>{
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(`<head>
                        <meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/>
                      </head>
                      `)
                    })

                }
                else if(/removeCM(\d+)$/g.test(req.url)){
                    let match = req.url.match(/removeCM(\d+)$/)
                    let id = parseInt(match[1])
                    axios.delete(`http://localhost:3000/completed/${id}`
                    ).then(()=>{
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(`<head>
                        <meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/>
                      </head>
                      `)
                    })
                }
                else if(/edit(\d+)$/g.test(req.url)){
                    let match = req.url.match(/edit(\d+)$/)
                    let id = parseInt(match[1])
                    collectRequestBodyData(req,(result)=>{
                        if(result){
                            if (result.deadline==undefined){
                                edit.push(id);
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.end(`<head>
                                        <meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/>
                                    </head>
                                    `)
                            }
                            else{
                                axios.put(`http://localhost:3000/todos/${id}`,
                                    {
                                        "id": id,
                                        "deadline": result.deadline,
                                        "worker":result.worker,
                                        "task":result.task,
                                        "type":result.type,

                                    }).then(()=>{
                                        edit.splice(edit.indexOf(id),1);
                                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.end(`<head>
                                        <meta http-equiv="Refresh" content="0;URL=http://localhost:7777/"/>
                                    </head>
                                    `)
                                })
                            }
                        }
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




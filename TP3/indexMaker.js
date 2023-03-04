let fs = require("fs");


let baseIndex =` <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title> Pessoas </title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    </head>
    <body class="w3-light-grey">
        <!-- Page Container -->
        <div class="w3-content w3-margin-top" style="max-width:1800px;">
            <!-- The Grid -->
            <div class="w3-row-padding">
                
                <div class="w3-quarter" >
                    <div class="w3-white w3-text-grey w3-card-4" >
                            <div class="w3-display-container">
                                <div class="w3-container w3-teal">
                                    <h2>Pessoas</h2>
                                </div>
                            </div>
                            <div class="w3-container">
                                <p><a href="http://localhost:7777/"> Listagem de todas as pessoas</a></p>
                                
                                <p><a href="http://localhost:7777/sex?s=masculino"> Listagem de Pessoas por Sexo </a> </p>

                                <p><a href="http://localhost:7777/sport?s=Futebol"> Listagem de Pessoas por Desporto</a></p>
                                
                                <p><a href="http://localhost:7777/job?j=Coreógrafo">Top 10 de profissões</a></p>
                                <p></p>
                            </div>
`

secondCol=`
                    </div>
                </div>

                <div class="w3-threequarter w3-align-left" style="display: flex;">
                    <table border=1 class="w3-table w3-striped w3-centered w3-hoverable">                
                    <tr class="w3-teal">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>Cidade</th>
                    </tr>
`
footer =  `                     
                    </table>
                <script>
                    document.addEventListener("DOMContentLoaded", ()=>{
                        const rows = document.querySelectorAll("tr[data-href]");
                        console.log(rows);
                        rows.forEach( row=>{
                            row.addEventListener("click",()=>{
                                window.location.href=row.dataset.href;
                            });
                        });
                    });
                </script>
                    
                </div>
            </div>
        </div> 
    </body>
</html>
`


exports.mainIndex = function mainIndex(json){
    let rows = ""


    let counter=1;
    for (let pessoa of json["pessoas"]){
        rows+=`
        <tr data-href="http://localhost:7777/p${counter}">
            <td>${pessoa.id}</td><td>${pessoa.nome}</td><td>${pessoa.idade}</td><td>${pessoa.sexo}</td><td>${pessoa.morada? pessoa.morada.cidade : "Não definido"}</td>
        </tr>
        `
        counter+=1;
    }
    return baseIndex + secondCol + rows + footer
}





exports.sexIndex = function sexIndex(json,sex){

    let counter=1;
    let sexCounter = {}
    let rows=""
    sexCounter["masculino"]=0
    sexCounter["feminino"]=0
    sexCounter["outro"]=0
    for (let pessoa of json["pessoas"]){
        sexCounter[pessoa.sexo]+=1
        if (pessoa.sexo == sex){
            rows+=`
            <tr data-href="http://localhost:7777/p${counter}">
                <td>${pessoa.id}</td><td>${pessoa.nome}</td><td>${pessoa.idade}</td><td>${pessoa.sexo}</td><td>${pessoa.morada? pessoa.morada.cidade : "Não definido"}</td>
            </tr>
            `
        }
        counter+=1;
    }
    sexInfo = `
    <div class="w3-container">
        <p>Distribuição por Sexo:</p>
        <p><a href="http://localhost:7777/sex?s=masculino"> Masculino</a>: ${sexCounter["masculino"]} </p>
        <p><a href="http://localhost:7777/sex?s=feminino"> Feminino</a>: ${sexCounter["feminino"]} </p>
        <p><a href="http://localhost:7777/sex?s=outro"> Outro</a>: ${sexCounter["outro"]} </p>
    </div>
    `
    return baseIndex + sexInfo + secondCol +  rows + footer
}



exports.sportIndex = function sportIndex(json,sport){

    let counter=1;
    let sportCounter = {}
    let rows=""
    for (let pessoa of json["pessoas"]){
        if ("desportos" in pessoa){
            let sports = pessoa["desportos"]
            for (let s of sports){
                if (!(s in sportCounter)) sportCounter[s]= 1
                else{
                    sportCounter[s]+=1
                }
            }
            if (sports.includes(sport)){
                rows+=`
                <tr data-href="http://localhost:7777/p${counter}">
                    <td>${pessoa.id}</td><td>${pessoa.nome}</td><td>${pessoa.idade}</td><td>${pessoa.sexo}</td><td>${pessoa.morada? pessoa.morada.cidade : "Não definido"}</td>
                </tr>
                `
            }
            counter+=1;
        }
    }
    sportsHTML = ""
    for (let s of Object.keys(sportCounter)){
        sportsHTML += `<li><a href="http://localhost:7777/sport?s=${s}">${s}</a>: ${sportCounter[s]} </li>\n`
    }

    sportsInfo = `
    <div class="w3-container">
        <p>Desportos:</p>
        <ul>
            ${sportsHTML}
        </ul>        
    </div>
    `
    return baseIndex + sportsInfo + secondCol +  rows + footer
}



exports.jobIndex = function jobIndex(json,job){
    let counter=1;
    let jobCounter = {}
    let rows=""
    for (let pessoa of json["pessoas"]){
        if ("profissao" in pessoa){
            let j = pessoa["profissao"]
            if (!(j in jobCounter)) jobCounter[j]= 1
            else{
                jobCounter[j]+=1
            }
            
            if (j == job){
                rows+=`
                <tr data-href="http://localhost:7777/p${counter}">
                    <td>${pessoa.id}</td><td>${pessoa.nome}</td><td>${pessoa.idade}</td><td>${pessoa.sexo}</td><td>${pessoa.morada? pessoa.morada.cidade : "Não definido"}</td>
                </tr>
                `
            }
            counter+=1;
        }
    }

    let topJobs = Object.keys(jobCounter).sort((a,b)=> jobCounter[b] - jobCounter[a]).slice(0,10)

    jobsHTML = ""
    for (let j of topJobs){
        jobsHTML += `<li><a href="http://localhost:7777/job?j=${j}">${j}</a>: ${jobCounter[j]} </li>\n`
    }

    jobsInfo = `
    <div class="w3-container">
        <p>Top 10 de Profissões:</p>
        <ol>
            ${jobsHTML}
        </ol>        
    </div>
    `
    return baseIndex + jobsInfo + secondCol +  rows + footer
}
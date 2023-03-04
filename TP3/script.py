import json


dataset = open("TP3/dataset-result.json","r",encoding="utf-8")

dataset =json.load(dataset)

pessoas = dataset["pessoas"]

path = "TP3/pessoas/"

pagHTML ="""
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title> Perfil de {Nome} </title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> 
    </head>
    <body>
    <div class="w3-content w3-margin" style="max-width:1200px;">
        <h1>Perfil: {Nome}</h1>
        <p> <b>Idade:</b> {Age}</p>
        <p> <b>Sexo:</b> {Sex}</p>
        <p> <b>Morada:</b> {Adress} </p>
        <p> <b>BI :</b> {BI} </p>
        <p> <b>Profissão:</b> {work}</p>
        <p> <b>Partido Político:</b> {party} </p>
        <p> <b>Religião :</b> {fe} </p>
        <p> <b>Marca do carro:</b> {car}</p>
        <hr class="w3-dark-grey" align="left" width="80%"/>

        <p> <b>Desportos Preferidos:</b> {sport} </p>
        <p> <b>Animais Preferidos:</b> {animal} </p>
        <p> <b>Figuras Publicas :</b> {fp} </p>
        <p> <b>Destinos Preferidos :</b> {destinos} </p>
        <hr class="w3-dark-grey" align="left" width="80%"/>
        <!--  Tabela com os atributos-->
        <ul>
            {attr}
        </ul>
        <hr class="w3-dark-grey" align="left" width="80%"/>
        <p> <a href="http://localhost:7777/">Voltar ao index</a></p>
    </div>

    </body>


</html>
"""



def atributos(pessoa):
    html = ""
    for key in pessoa["atributos"]:
        if isinstance(pessoa["atributos"][key],bool):
            if pessoa["atributos"][key]:
                html+= "<li><b>{key}</b>: &#9989; </li>\n".format(key=key)
            else:
                html+= "<li><b>{key}</b>: &#10060; </li>\n".format(key=key)
        elif isinstance(pessoa["atributos"][key],str):
            html+= "<li><b>{key}</b>: {value}; </li>\n".format(key=key,value=pessoa["atributos"][key])
    return html




newPage = ""

for pessoa in pessoas:
    newPage = pagHTML.format(
        Nome=pessoa["nome"],
        Age=pessoa["idade"],
        Sex= pessoa["sexo"] if "sexo" in pessoa else "Não disponível",
        Adress=pessoa["morada"]["cidade"] + ", " + pessoa["morada"]["distrito"] if "morada" in pessoa else "Não disponível",
        BI= pessoa["BI"] if "BI" in pessoa else "Não disponível",
        work=pessoa["profissao"] if "profissao" in pessoa else "Não disponível",
        party=pessoa["partido_politico"]["party_name"] if "partido_politico" in pessoa else "Não disponível",
        fe=pessoa["religiao"] if "religiao" in pessoa else "Não disponível",
        car=pessoa["marca_carro"] if "marca_carro" in pessoa else "Não disponível",

        sport=", ".join(pessoa["desportos"]) if "desportos" in pessoa else "Não disponível",
        animal=", ".join(pessoa["animais"]) if "animais" in pessoa else "Não disponível",
        fp=", ".join(pessoa["figura_publica_pt"]) if "figura_publica_pt" in pessoa else "Não disponível",
        destinos=", ".join(pessoa["destinos_favoritos"])  if "destinos_favoritos" in pessoa else "Não disponível",
        attr=atributos(pessoa) if "atributos" in pessoa else "Não disponível"
    )


    f = open(path+pessoa["id"]+".html","w",encoding="utf-8")
    f.write(newPage)
    f.close()
    









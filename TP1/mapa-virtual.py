import json

f = open("TP1/mapa-virtual.json")

data = json.load(f)


# Templates

htmlResult = ""


htmlHeader = """
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Mapa virtual</title>
    </head>
    <body>
        <h1> Mapa virtual</h1>
"""

htmlFooter = """
    </body>
</html>
"""

htmlIndexFormat = """<li> <a href="#{id}">{nome}</a> </li>\n"""


htmlBodyFormat = """        
        <table>
            <tr>
                <td width="30%" valign="top">
                    <h3>Index</h3>
                    <!-- Lista com o index-->
                    <ul>
                    {index}
                    </ul>
                </td>
                <td width="70%">
                    {cities}                   
                </td>   
            </tr>
        </table>
""" 

htmlCityFormat = """
                <a name="{id}"/>
                <h3>{nome}</h3>
                <p><b>População:</b>{pop}</p>
                <p><b>Descrição:</b>{descript}</p>
                <p><b>Distrito:</b>{district}</p>
                <p><b>Ligações:</b><ul>{conection}</ul></p>
                <center>
                    <hr width="80%"/>
                </center>\n

"""

htmlConnectionsFormat = """<li><a href="#{id}">{nome}:</a> {dist}</li>\n"""



# Code to generate HTML

connectionsMap = {}

# Organize conections into a MAP (bidirectional entries)
for connection in data["ligações"]:
    if not connection["origem"] in connectionsMap:
        connectionsMap[connection["origem"]] = {}
    if not connection["destino"] in connectionsMap:
        connectionsMap[connection["destino"]] = {}
    
    connectionsMap[connection["origem"]][connection["destino"]] = connection["distância"]
    connectionsMap[connection["destino"]][connection["origem"]] = connection["distância"]

cities= {}    
cityIds={}


# Organize citys by name and relate ID to a name and relate a name to a pos in the array
for i in range(len(data["cidades"])):
    city = data["cidades"][i]
    cities[city["nome"]] = i
    cityIds[city["id"]] =city["nome"]


orderedCities = list(cities.keys())
orderedCities.sort()

indexHTML = ""
cityListHTML =""

# Funct to sort distances
def myFunc(e):
  return e['dist']

#Compose all the entries
for name in orderedCities:
    city = data["cidades"][cities[name]]
    indexHTML += htmlIndexFormat.format(id=city["id"],nome=city["nome"])

    conectionsListHTML=""
    dist = []
    
    for destination in connectionsMap[city["id"]].keys():
        distEntry = {}
        distEntry["dist"] = connectionsMap[city["id"]][destination]
        distEntry["html"] = htmlConnectionsFormat.format(id=destination,
                                                         nome= cityIds[destination],
                                                         dist= connectionsMap[city["id"]][destination])
        dist.append(distEntry)
    
    
    dist.sort(key=myFunc)
    
    for entry in dist:
        conectionsListHTML+=entry["html"]
                          

    cityListHTML += htmlCityFormat.format(id=city["id"],
                                      nome=city["nome"],
                                      pop=city["população"],
                                      descript=city["descrição"],
                                      district= city["distrito"],
                                      conection=conectionsListHTML)

htmlResult += htmlHeader

htmlResult += htmlBodyFormat.format(index=indexHTML,cities=cityListHTML)

htmlResult += htmlFooter

print(htmlResult)

f.close()
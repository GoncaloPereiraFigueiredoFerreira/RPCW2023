from bs4 import BeautifulSoup as bs

headerHTML ="""<!DOCTYPE html>
<html>
    <head>
        <title>Arqueosítios: {nome} </title>
        <meta charset="iso-8859-1"/>
    </head>
    <body>
        <h1>{nome}</h1>
        """


"""
        <p><b>Descrição: </b></p>
        <p><b>Lugar: </b></p>
        <p><b>Concelho: </b></p>
        <p><b>Freguesia: </b></p>
        <p><b>Latitude: </b></p>
        <p><b>Longitude: </b></p>
        <p><b>Altitude: </b></p>
        <hr align="left" width="60%"/>
        <p><b>Acesso: </b></p>
        <p><b>Quadro: </b></p>
        <p><b>Desenho Arquitetural: </b></p>
    </body>
    <footer align="bottom">
        Autor:      Data:
    </footer>
</html>"""



def toHTML(xml,counter):
    finalHTML=""
    finalHTML +=headerHTML.format(nome=xml.find("IDENTI").text)
    finalHTML +="<p><b>Descrição </b>: {key}</p>\n".format(key=xml.find("DESCRI").text)
    finalHTML +="<p><b>Lugar:</b> {key}</p>\n".format(key=xml.find("LUGAR").text)
    finalHTML +="<p><b>Concelho </b>: {key}</p>\n".format(key=xml.find("CONCEL").text)
    finalHTML +="<p><b>Freguesia </b>: {key}</p>\n".format(key=xml.find("FREGUE").text)
    if xml.find("LATITU") !=None:
        finalHTML +="<p><b>Latitude </b>: {key}</p>\n".format(key=xml.find("LATITU").text)
    if xml.find("LONGIT") !=None: 
        finalHTML +="<p><b>Longitude </b>: {key}</p>\n".format(key=xml.find("LONGIT").text)
    if xml.find("ALTITU") !=None: 
        finalHTML +="<p><b>Altitude </b>: {key}</p>\n".format(key=xml.find("ALTITU").text)
    finalHTML +="""<hr align="left" width="60%"/>\n"""
    if xml.find("ACESSO") !=None: 
         finalHTML +="<p><b>Acesso </b>: {key}</p>\n".format(key=xml.find("ACESSO").text)
    if xml.find("QUADRO") !=None: 
        finalHTML +="<p><b>Quadro </b>: {key}</p>\n".format(key=xml.find("QUADRO").text)
    finalHTML +="<p><b>Desenho Arquitetural </b>: {key}</p>\n".format(key=xml.find("DESARQ").text)
    finalHTML +="""
    <br></br>
    <br></br>    
    <div align="left">
     <a href=http://localhost:7777/> <b> Voltar ao Inicio </b></a>>
    </div>
    <div align="right">
     <a href=http://localhost:7777/{counter}> Próximo </b></a>>
    </div>
    </body>
    <footer align="bottom">
    
            <br></br>
        <br></br>

        
        <br></br>
        <br></br>
        Autor:  {autor}\t\t\tData: {data}
    </footer>
</html>""".format(counter=counter+1,autor=xml.find("AUTOR").text,data=xml.find("DATA").text)
    return finalHTML

# Import BeautifulSoup
from bs4 import BeautifulSoup as bs
from xmlTohtml import toHTML
content = []

# Read the XML file
with open("RPCW2023/TP2/arq.xml", "rb") as file:
    # Read each line in the file, readlines() returns a list of lines
    content = file.read()


# Combine the lines in the list into a string
bs_content = bs(content,features="lxml-xml",from_encoding="utf-8")

result = bs_content.find_all("ARQELEM")
counter=1


indexHTML ="""<!DOCTYPE html>
<html>
    <head>
        <meta charset="iso-8859-1"/>
        <title> Arqueosítios Portugueses </title>
    </head>
   
    <body>
        <h1>Arqueosítios</h1>
        <ul>
"""

arqFormatHTML = """\t\t<li><a href="http://localhost:7777/{counter}"> {nome}</li>\n"""


for xml in result:
    f = open("RPCW2023/TP2/Arq Files/arq{counter}.html".format(counter=counter),"w",encoding="utf-8")
    f.write(str(toHTML(xml,counter)))
    f1 = open("RPCW2023/TP2/Arq Files/arq{counter}.xml".format(counter=counter),"w",encoding="utf-8")
    f1.write(str(xml))
    indexHTML+=arqFormatHTML.format(counter=counter,nome=xml.find("IDENTI").text)

    f.close()
    
    
    counter+=1


indexHTML+="""</ul>
    </body>
</html>
"""
    
f = open("RPCW2023/TP2/index.html","w",encoding="utf-8")
f.write(indexHTML)
f.close()





from astroquery.simbad import Simbad
import json
import requests

# Some fews clarifications are needed here. I was basically trying to to a large query.objects() , but
# for some reasons it didn't work , so I asked chatgpt after finding nothing and tried to resolve the issue with
# him because the code was good so the issue wasn't there. Still could'nt figure it out so I asked him another method and 
# he gave me this... If someone have an idea please tell me.

# Disclamer : I still did figured out everything below and recoded it myself to make sure , the idea here is simply to 
# avoid the using of query.objects because a step in the chain of this query is broke for me , something about my pc using "long" and
# the other thing using "C long"

#gathering the reference names of the wanted celestial objects
with open("C:/Users/Rukka/Desktop/moon/a.HTML/Projects/webappLookUp/js/services/datas.js", "r" ,encoding="utf-8" ) as datasfile:
    codelines = [
        line.strip().replace(": { //#" , "")
        for line in datasfile
        if line.strip() and line.strip().endswith("#")
    ]

names = []

for obj in codelines:
    obj = obj.replace("'", "''")
    names.append(f"'{obj}'")


names_sql = ", ".join(names)

#In there you can put ident.id for the CHERCHED name that got throught .txt
query = f"""
SELECT
    ident.id,
    basic.main_id,
    basic.ra,
    basic.dec,
    basic.otype,
    allfluxes.V,
    allfluxes.B,
    allfluxes.G
FROM basic
JOIN ident ON basic.oid = ident.oidref
LEFT JOIN allfluxes ON basic.oid = allfluxes.oidref
WHERE ident.id IN ({names_sql})
"""

response = requests.post(
    "https://simbad.cds.unistra.fr/simbad/sim-tap/sync",
    data={
        "request": "doQuery",
        "lang": "ADQL",
        "format": "json",
        "query": query
    }
)


response.raise_for_status()
results = response.json()

theobjects = {}


for row in results['data']:
    thename = row[0]
    #Add-on for a cleaner output in the .txt (ex : NAME Vega --> Vega)
    if "NAME" in thename:
        thename = str(thename).replace("NAME ", "")

    if thename not in theobjects:
        theobjects[thename] = {
            "name": thename,
            "main-id" : row[1],
            "ra": row[2],
            "dec": row[3],
            "type": [],
            "magnitude V": row[5],
            "magnitude B": row[6]
        }

    #Used Chatgpt here to go faster about converging the otypes into simple type
    if row[4] in ["*", "dS*", "s*r", "s*b", "SB*", "PM*", "Be*", "bC*", "RG*", "sg*", "cC*"]:
        theobjects[thename]["type"] = "stars"

    elif row[4] in ["OpC", "GlC", "Cl*", "ClG"]:
        theobjects[thename]["type"] = "clusters"

    elif row[4] in ["HII", "SNR", "PN", "ISM", "SFR"]:
        theobjects[thename]["type"] = "nebulae"

    elif row[4] in ["G", "LIN", "AGN", "Sy1", "Sy2"]:
        theobjects[thename]["type"] = "galaxies"
        


data = list(theobjects.values())

with open ("C:/Users/Rukka/Desktop/moon/a.HTML/Projects/webappLookUp/js/services/jsonastroquerysimbad.txt" , "w") as file:
    json.dump(data, file, indent=2, ensure_ascii=False)

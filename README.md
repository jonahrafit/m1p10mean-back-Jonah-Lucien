# API 
/auth/register      POST        nom, prenom, mail ,motDePasse, role         inscription
/auth/login         POST        email , motDePasse                          login
/auth/users         GET                                                     liste users

# Insription
## role 
    manager
    employee
    client

## authentification
### Client
    seul le mail confirmer peut se connecter
### employe
    seul le mail confirmé
    et mail validé par le manager
    
# Horaire de travail
un emploi doit avoir au moins un jour de travail 
exemple d'horaire de travail:
    monday : 09 - 12 , 13 - 17
    tuesday : 09 - 17
    ...

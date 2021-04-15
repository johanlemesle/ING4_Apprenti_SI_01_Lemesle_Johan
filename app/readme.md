# Lab 7

## 1 : JWT

Vous allez devoir construire une API /login qui permet à un utilisateur de se "connecter" à l'application.

L'utilisateur se connecte avec son email/mot de passe.

N'oubliez pas le blindage des erreurs (identifiants incorrects, ...)

Test :
> curl --header "Content-Type: application/json" --request POST --data '{"id":"1","email":"admin@ece.fr","password":"pwd123"}' http://localhost:8000/login


L'api retourne :
> {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlY2UuZnIiLCJpYXQiOjE2MTg1MTcxOTEsImV4cCI6MTYxODUyNzk5MX0.ANsR8KITcRcKgOy-ZhlpnTTSz7IcbDGwMnrBQ5gzq-4"}

Blindage :
> curl --header "Content-Type: application/json" --request POST --data '{"id":"1","email":"admin@ece.fr","password":"pwd13"}' http://localhost:8000/login

Output :
>{"message":"Error. Wrong login or password"}

## 2 : Middlewares

L'ensemble des routes du projet doivent être protegées.

On va mettre en place un middleware qui permet de vérifier si le JWT passé dans la requete est valide. Ce middleware devra retourner un message d'erreur dans le cas où le middleware est invalide.

Creation de users avec le JWT valide :
>curl --header "Content-Type: application/json" --request POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlY2UuZnIiLCJpYXQiOjE2MTg1MTcxOTEsImV4cCI6MTYxODUyNzk5MX0.ANsR8KITcRcKgOy-ZhlpnTTSz7IcbDGwMnrBQ5gzq-4' --data '{"name":"johan","email":"test@ece.fr","password":"password13333"}' http://localhost:8000/api/v1/users

Output :
> {"id":"ab2e9169-4d6c-4069-9810-dc49610bf06a","name":"johan","email":"test@ece.fr","password":"password13333"}

Test token invalide :
> curl --header "Content-Type: application/json" --request POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlY2UuZnIiLCJpYXQiOjE2MTg1MTcxOTEsImV4cCI6MTYxODUyNzk5MX0.ANsR8KITcRcKgOy-Zhaaaaaaaaaaaaaaaaaaaaaaaaa' --data '{"name":"johan","email":"test@ece.fr","password":"password13333"}' http://localhost:8000/api/v1/users

Message d'erreur en cas de token non valide :
> {"message":"Error. Bad token"}
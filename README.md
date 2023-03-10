# Pour la partie server
  > Exécuter les commandes suivantes dans un terminal:

  ```bash
      cd server
      npm install
  ```

  > Rénommer les deux fichiers **auth.config.example.js** et **database.config.example.js** dans le dossier *src/config/*
  > en **auth.config.js** et **database.config.js**

  > Définir les valeurs des constantes et variables dans ces 2 fichiers à votre guise.
  
  > Exécuter 
  ```bash
      npm install -D nodemon
  ```

  > Pour démarrer le serveur de développement en local, lancez:
  ```bash
      cd server
      nodemon app.js
  ```

## Pour la partie client

  > Exécuter `npm install` à l'intérieur du repertoire **client**
  
  > Remplacer la constante `AUTH_API` dans `src/app/services/auth.service.ts` par la vôtre. Exemple : 'http://localhost:8080/api/auth/'
  
  > De même pour `API_URL` et `BASE_URL` dans `src/app/services/user.service.ts`

  > Exécuter `ng serve` pour le dev server


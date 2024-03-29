
# Projet-IoT

Le projet consiste à mettre en place une tour hydroponique dans une logique d'economie d'energie. Il fallait mettre en oeuvre une tour qui enverra ses données dans une base de donnée logée dans le cloud.
Ces données seront ensuite visualisées sur une application web ou android.
Il a deux parties principales à savoir la partie materielle et la partie logicielle.

# Partie materielle
  - un capteur DHT22 pour mesurer la temperature et l'humidité
  - une pompe à eau pour arroser les plantes
  - un tuyau pour faire circuler l'eau
  - un microcontrôlleur: ESP32
  - des fils pour connecter les composants electroniques
Ceux-ci sont nos choix materiels pour mettre en oeuvre la tour hydroponique.

# Partie logicielle

Pour mettre en place la partie logicielle, nous avons mené des choix des outils à utiliser.
Pour la visualisation des données, nous avons opté pour une application web. les points suivants detaillent nos choix.

   # Application web

   - HTML, CSS et Javascript pour la mise en oeuvre du site
   - Node.js pour servir de serveur
   - Expressjs pour la gestion des routes
   - Emailjs pour l'envoi de mail

   # Cloud

   - Firebase: nous avons utilisé sa fonctionnalité Database realtime pour l'envoi des données en temps réel

   # Logicielle pour la partie materielle

   - Serveur broker public emqx
   - Mqttx pour faciliter l'abonnement et la publication sur le serveur.

# Architecture
![Alt text](Architecture/architecture.png)

Les microcontrôlleurs sont connectés à un point d'accès WIFI, ils publient leurs données au travers du protocole mqtt sur un sujet correspondant au nom de leur tour.
Une fois sur le serveur, nous avons mis en oeuvre un code javascript qui est dans le dossier Application web et nommée firebase_abonne.js. Ce code permet à firebase de s'abonner au sujet d'une tour et donc de recevoir les données dans 
sa database realtime. Ces données sont ensuite envoyées pour être visualisées sur la page web.




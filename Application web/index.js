const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Ajout du bodyParser pour traiter les données POST
const app = express();
const port = 5000;

// Middleware pour servir des fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour le traitement des données POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Connection.html'));
});

app.get('/Visualiser', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/Visualiser.html'));
});

app.get('/accueil', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/accueil.html'));
});

// Route POST pour gérer la soumission du formulaire de connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vérifiez ici les identifiants (par exemple, dans une base de données)
    // Pour cet exemple, supposons que les bons identifiants sont 'admin' et '1234'
    if (username === 'admin' && password === '1234') {
        // Si les identifiants sont corrects, redirigez vers la page d'accueil
        res.redirect('/accueil');
    } else {
        // Sinon, affichez un message d'erreur ou redirigez vers une page d'erreur
        res.send('Identifiants incorrects');
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});

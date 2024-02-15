#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);
const char *ssid = "Nom_wifi";
const char *password = "Mot de passe";
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "esp32/temperature_humidity";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;
const int pumpPin = 5;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(pumpPin, OUTPUT);
  digitalWrite(pumpPin, LOW); // Assurez-vous que la pompe est éteinte au démarrage

  // Connexion au réseau WiFi
  Serial.println();
  Serial.println("Connexion au réseau WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connexion WiFi établie");

  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
    String client_id = "esp32-client-";
    client_id += String(WiFi.macAddress());
    Serial.printf("Le client %s se connecte au courtier mqtt public\n", client_id.c_str());
    if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("Courtier mqtt public emqx connecté");
    } else {
      Serial.print("échoué avec l'état ");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void loop() {
  // Lecture des données de température et d'humidité de la DHT
  float humidity = dht.readHumidity();
  float temperatureC = dht.readTemperature();
  float temperatureF = dht.readTemperature(true);

  // Vérification des lectures
  if (isnan(humidity) || isnan(temperatureC) || isnan(temperatureF)) {
    Serial.println("Échec de lecture du capteur DHT !");
    return;
  }

  // Création de la chaîne JSON
  String json = "{\"temperature_C\":" + String(temperatureC) + ", \"temperature_F\":" + String(temperatureF) + ", \"humidity\":" + String(humidity) + "}";

  // Conversion de la chaîne en tableau de caractères
  char messageBuffer[json.length() + 1];
  json.toCharArray(messageBuffer, json.length() + 1);

  // Publication du message JSON
  client.publish(topic, messageBuffer);

  // Début du transfert d'eau
  Serial.println("Début du transfert d'eau");
  digitalWrite(pumpPin, HIGH); // Activer la pompe
  delay(5000); // Laisser la pompe fonctionner pendant 5 secondes
  digitalWrite(pumpPin, LOW); // Désactiver la pompe
  Serial.println("Fin du transfert d'eau");

  // Attendre deux minutes avant de recommencer le transfert
  delay(10000);
}

void callback(char *topic, byte *message, unsigned int length) {
  // Gérer les messages MQTT si nécessaire
}

const mqtt = require('mqtt');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./cle_hy.json'); // Replace with your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://projet-hydroponique-default-rtdb.firebaseio.com' // Replace with your database URL
});
const db = admin.database();

// MQTT Broker
const mqtt_broker = 'mqtt://broker.emqx.io';
const topic = 'esp32/temperature_humidity';

// Connect to MQTT Broker
const client = mqtt.connect(mqtt_broker);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(topic, (err) => {
    if (err) {
      console.error('Error subscribing to topic:', err);
    } else {
      console.log('Subscribed to topic:', topic);
    }
  });
});

// Listen for incoming MQTT messages
client.on('message', (topic, message) => {
  console.log('Received message:', message.toString());
  const data = JSON.parse(message.toString()); // Parse the JSON string
  const temperature=data.temperature_C
  const humidity=data.humidity
  console.log(temperature)
  console.log(humidity)
  //const temperature_humidity = parseFloat(message.toString());
  //console.log(temperature_humidity)


  // Store distance in Firebase Realtime Database
  // Store distance in Firebase Realtime Database
  const humidityRef = db.ref('humidite');
  humidityRef.set(humidity)
    .then(() => {
      console.log('temperature stored in Firebase:', humidity);
    })
    .catch((error) => {
      console.error('Error storing distance in Firebase:', error);
    }); 

  const temperatureRef = db.ref('temperature');
  temperatureRef.set(temperature)
    .then(() => {
      console.log('temperature stored in Firebase:', temperature);
    })
    .catch((error) => {
      console.error('Error storing distance in Firebase:', error);
    }); 

});
 

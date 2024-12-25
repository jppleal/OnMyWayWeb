/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendNotificationOnAlert = functions.database
    .ref("/alerts/{alertId}")
    .onCreate(async (snapshot, context) => {
        const alert = snapshot.val();

        const message = {
            notification: {
                title: alert.title || "Novo Alerta",
                body: alert.message || "Por favor, verifique o alerta.",
            },
            topic: "alerts", // Tópico usado no app
        };

        try {
            await admin.messaging().send(message);
            console.log("Notificação enviada com sucesso para o tópico 'alerts'.");
        } catch (error) {
            console.error("Erro ao enviar notificação:", error);
        }
    });

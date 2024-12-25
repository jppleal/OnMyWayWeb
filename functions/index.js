const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

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
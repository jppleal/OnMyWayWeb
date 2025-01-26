import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();

interface NotificationData {
  title: string;
  body: string;
  topic: string;
}

exports.sendNotification = functions.https.onCall(
  async (request: functions.https.CallableRequest<NotificationData>,
    _context: any) => {
    const {title, body, topic} = request.data;

    if (!title || !body || !topic) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with 'title'a,",
        "'body', and 'topic' arguments."
      );
    }

    const message = {
      notification: {
        title,
        body,
      },
      topic,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Notification sent successfully:", response);
      return {success: true, response};
    } catch (error) {
      console.error("Error sending notification:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to send notification."
      );
    }
  });

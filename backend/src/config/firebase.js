import admin from 'firebase-admin';
import serviceAccount from './mern-thinkboard-firebase-adminsdk-fbsvc-1cf49ae3a1.json' with { type: "json" }

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
export default admin;

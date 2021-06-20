import admin from 'firebase-admin';
import serviceAccount from '../cgv-cinemas-1cbd9-firebase-adminsdk-rbpt3-3848a90f94.json';

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'cgv-cinemas-1cbd9.appspot.com',
});
// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};

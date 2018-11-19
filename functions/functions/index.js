const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
const db = admin.firestore();

exports.onViewWrite = functions.firestore
  .document('views/{viewId}')
  .onWrite((snap, context) => {    
    return db.collection('views').doc(snap.params.viewId).get().then(doc => {
      // { film_id: 1, timestamp: 2987685768979 }
      const view = doc.data();
      if (view) {
        return updateFilm(view.film_id)
      }
      return false;
    });
  })

function updateFilm(film_id) {
  return db.collection('views').where('film_id', '==', film_id).get().then(doc => {
    const total_views = doc.size || 0
    console.log('updating total views of film ' + film_id + ': ' + total_views);
    return db.collection('films').doc(film_id).update({
      total_views
    });
  });
}

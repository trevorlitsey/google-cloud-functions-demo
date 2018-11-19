const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

exports.onViewCreate = functions.firestore
  .document('views/{viewId}')
  .onCreate((snap, context) => {
    const { film_id } = snap.data();
    return updateFilm(film_id);
  });

exports.onViewDelete = functions.firestore
  .document('views/{viewId}')
  .onDelete((snap, context) => {
    const { film_id } = snap.data();
    return updateFilm(film_id);
  });

function updateFilm(film_id) {
  return db
    .collection('views')
    .where('film_id', '==', film_id)
    .get()
    .then(doc => {
      const total_views = doc.size || 0;
      console.log(
        'updating total views of film ' + film_id + ': ' + total_views
      );
      return db
        .collection('films')
        .doc(film_id)
        .update({
          total_views,
        });
    });
}

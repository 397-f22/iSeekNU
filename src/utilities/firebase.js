import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, child, get, update, ref, remove } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBRRmxzqO-vWcUfg815V52XTZVCiyySFq8",
    authDomain: "iseeknu.firebaseapp.com",
    databaseURL: "https://iseeknu-default-rtdb.firebaseio.com",
    projectId: "iseeknu",
    storageBucket: "iseeknu.appspot.com",
    messagingSenderId: "315002326175",
    appId: "1:315002326175:web:903f76841958fa07c266aa",
    measurementId: "G-1STG6PGX2T"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};



export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const useDbRead = (roomID, date) => {
  return ref(database, `/user/${roomID}/${date}`);
};

export const useDbDelete = (roomID, m_key) => {
  const taskRef = ref(database, `/user/${roomID}/hider/${m_key}`);
  remove(taskRef);
};

export const useDbDeleteRoom = (roomID) => {
  const taskRef = ref(database, `/user/${roomID}`);
  remove(taskRef);
};

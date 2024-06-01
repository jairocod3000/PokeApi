import { db } from './firebase-config';
import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";

const scoresCollectionRef = collection(db, "scores");

export const addScore = async (userId, userEmail, score) => {
  
  if (score === undefined) {
    console.error('Score is undefined');
    return; 
  }
  try {
    await addDoc(scoresCollectionRef, {
      userId: userId,
      userEmail: userEmail, 
      score: score,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getTopScores = async () => {
  const q = query(scoresCollectionRef, orderBy("timestamp", "desc")); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    userEmail: doc.data().userEmail,
    score: doc.data().score
  }));
};

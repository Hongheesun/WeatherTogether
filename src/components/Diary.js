import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/analytics";

import Modal from "./Modal";

firebase.initializeApp({
  apiKey: "AIzaSyDKGlrQWKVZm8OzSQBO8jQ3sAegfeooE8c",
  authDomain: "weathertogether-f0922.firebaseapp.com",
  projectId: "weathertogether-f0922",
  storageBucket: "weathertogether-f0922.appspot.com",
  messagingSenderId: "393268972611",
  appId: "1:393268972611:web:fdb5a919af69448cb718f6",
  measurementId: "G-E5X2NET7D3",
});

const firestore = firebase.firestore();

function Diary(props) {
  const dummy = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diary, setDiary] = useState([]);

  const getDiaries = async () => {
    const dbDiaries = await firestore.collection("diary").get();
    dbDiaries.forEach((document) => {
      const diariesObj = {
        id: document.id,
        ...document.data(),
      };
      // 최근의 document와 이전의 document를 붙여서 setChats 으로 다시 할당
      setDiary((prev) => [diariesObj, ...prev]);
    });
  };

  useEffect(() => {
    getDiaries();
  }, []);
  return (
    <div>
      <div>
        <nav>
          <button type="button" onClick={() => setIsModalOpen(true)}>
            추가
          </button>
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

          {diary &&
            diary.map((diary) => (
              <div key={diary.id} className="diary">
                <h4>{diary.diary}</h4>
              </div>
            ))}
          <span ref={dummy}></span>
        </nav>
      </div>
    </div>
  );
}

export default Diary;

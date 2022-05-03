import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

function DiaryRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dummy = useRef();
  const diaryRef = firestore.collection("diaries");
  const query = diaryRef.orderBy("createdAt").limit(25);

  const [diaries] = useCollectionData(query, { idField: "id" });

  const [feelingValue, setFeelingValue] = useState("");
  const [diaryValue, setDiaryValue] = useState("");

  const inputDiaries = async (e) => {
    e.preventDefault();

    await diaryRef.add({
      feeling: feelingValue,
      text: diaryValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setFeelingValue("");
    setDiaryValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {diaries && diaries.map((d) => <DiaryMemo key={d.id} diary={d} />)}
        <span ref={dummy}></span>
      </main>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        추가
      </button>
      <Modal
        inputDiaries={inputDiaries}
        setFeelingValue={setFeelingValue}
        feelingValue={feelingValue}
        diaryValue={diaryValue}
        setDiaryValue={setDiaryValue}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></Modal>
    </>
  );
}

function DiaryMemo(props) {
  const { feeling, text } = props.diary;

  return (
    <>
      <ul className="diaryUl">
        <li className="diaryBox">
          {feeling}
          {text}
        </li>
      </ul>
    </>
  );
}

export default DiaryRoom;

// import { useState } from "react";
import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
function Modal({ handleAddItem, isModalOpen, setIsModalOpen }) {
  const [diary, setDiary] = useState("");
  const dummy = useRef();
  const diaryRef = firestore.collection("diary");
  const query = diaryRef.orderBy("createdAt").limit(25);
  const [diaryMemo] = useCollectionData(query, { idField: "id" });

  const onSubmit = async (e) => {
    e.preventDefault();
    await diaryRef.add({
      diary,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // db 에 등록한 후, 다시 초기화 함
    setDiary("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setDiary(value);
  };

  return (
    <div className="modal-background" hidden={!isModalOpen}>
      <form className="modal" onSubmit={onSubmit}>
        <span className="modal-close" onClick={() => setIsModalOpen(false)}>
          X
        </span>
        <input
          id="name"
          type={diary}
          placeholder="오늘의 하루를 입력하세요"
          className="input"
          required
          value={diary}
          onChange={(e) => setDiary(e.target.value)}
        />

        <button
          type="submit"
          className="submit-button"
          value="diary"
          disabled={!diary}
        >
          저장
        </button>
      </form>
    </div>
  );
}
export default Modal;

import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import DiaryRoom from "./components/DiaryRoom";

firebase.initializeApp({
  apiKey: "AIzaSyDKGlrQWKVZm8OzSQBO8jQ3sAegfeooE8c",
  authDomain: "weathertogether-f0922.firebaseapp.com",
  projectId: "weathertogether-f0922",
  storageBucket: "weathertogether-f0922.appspot.com",
  messagingSenderId: "393268972611",
  appId: "1:393268972611:web:fdb5a919af69448cb718f6",
  measurementId: "G-E5X2NET7D3",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

let now = new Date();
let todayMonth = now.getMonth() + 1;
let todayDate = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

const weatherCases = {
  Rain: {
    colors: ["#00C6FB", "#005BEA"],
    title: "Raining",
    subtitle: "우산 챙기세요",
    icon: "🌞",
  },
  Clear: {
    colors: ["#FEF253", "#FF7300"],
    title: "Sunny",
    subtitle: "구름 한 점 없는 맑은 날씨!",
    icon: "🌞",
  },
  Thunderstorm: {
    colors: ["#00ECBC", "#007ADF"],
    title: "Thunderstrom",
    subtitle: "천둥이쳐요!",
    icon: "ios-thunderstorm",
  },
  Clouds: {
    colors: ["#D7D2CC", "#304352"],
    title: "Clouds",
    subtitle: "구름이 꼈어요",
    icon: "ios-cloudy",
  },
  Snow: {
    colors: ["#7DE2FC", "#B9B6E5"],
    title: "Snow",
    subtitle: "눈이와요!",
    icon: "ios-snow",
  },
  Drizzle: {
    colors: ["#89F7FE", "#66A6FF"],
    title: "Drizzle",
    subtitle: "이슬비가 내려요",
    icon: "ios-rainy-outline",
  },
  Haze: {
    colors: ["#89F7FE", "#66A6FF"],
    title: "Haze",
    subtitle: "이슬비가 내려요",
    icon: "ios-rainy-outline",
  },
  Mist: {
    colors: ["#89F7FE", "#66A6FF"],
    title: "Mist",
    subtitle: "이슬비가 내려요",
    icon: "ios-rainy-outline",
  },
};

function App() {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [error, setError] = useState(false);

  const API_KEY = "edc5c244d49a15ae2af9307cbbd804fe";
  const latitude = 38;
  const longitude = 128;

  const getWeather = async (latitude, longitude) => {
    const resWeather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    let _main = resWeather.data.weather[0].main;
    let _temp = resWeather.data.main.temp;
    let _;

    setCurrentWeather(_main);
    setTemp(_temp);
  };

  useEffect(() => {
    getWeather(latitude, longitude);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Menu></Menu>
          <h1>WeatherTogether</h1>
          <SignOut />
        </header>
        <section>
          <Routes>
            {user ? (
              <Route
                exact
                path="/"
                element={
                  <Home currentWeather={currentWeather} temp={temp}></Home>
                }
              />
            ) : (
              // </Route>
              <Route exact path="/" element={<SignIn />} />
            )}
            <Route exact path="/messages" element={<ChatRoom />} />
            <Route exact path="/diary" element={<DiaryRoom />} />
            <Route
              exact
              path="/weekly"
              element={
                <WeeklyInfo currentWeather={currentWeather} temp={temp} />
              }
            />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

function getSeason(lat, month) {
  if (month >= 3 && month <= 5) {
    return lat > 0 ? "spring" : "winter";
  } else if (month >= 6 && month <= 8) {
    return lat > 0 ? "summer" : "winter";
  } else if (month >= 9 && month <= 10) {
    return lat > 0 ? "autumn" : "summer";
  } else {
    return lat > 0 ? "winter" : "summer";
  }
}

function Home({ currentWeather, temp, lat }) {
  //setSunny({ temp } > 20 ? true : false);
  const season = getSeason(lat, new Date().getMonth() + 1);
  return (
    <div className="home">
      <div className="weatherInfo">
        <span className="Celsius">{Math.round(temp)}°</span>
        <span className="weather">{currentWeather}</span>
        <span className="date">
          {todayMonth}월 {todayDate}일 {hours}시 {minutes}분
        </span>
      </div>
      <button className="rightBtn">
        <Link to="/weekly">▶</Link>
      </button>
      {weatherCases[currentWeather].icon}
      {weatherCases[currentWeather].subtitle}
      <div className="footer">
        <span className="dailyMemo">
          <span>오늘 나의 상태는?</span>

          <span>
            <button>
              <Link to="/diary">🌞</Link>
            </button>
            <button>👕</button>
          </span>
        </span>

        <button class="bottomBtn">
          <Link to="/messages">▼</Link>
        </button>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="ham">
      <input className="burger-check" type="checkbox" id="burger-check" />
      <label className="burger-icon" for="burger-check">
        <span className="burger-sticks"></span>
      </label>
      <div className="menu1">
        <div></div>
      </div>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        구글 로그인
      </button>
      <p>댓글을 쓰려면 로그인이 필요합니다!</p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="메시지를 입력해주세요"
        />

        <button type="submit" disabled={!formValue}>
          전송
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p className="messagesP">{text}</p>
      </div>
    </>
  );
}

function WeeklyInfo({ currentWeather, temp }) {
  // if (currentWeather === "Clear") {
  //   return "🌞";
  // }
  return (
    <>
      <div>
        <p>시간대별 날씨</p>
        <ul className="hourlyWeather">
          <li>
            <p>지금</p>
            <p>{currentWeather}</p>
            <p>{Math.round(temp)}°</p>
          </li>
          <li>
            <p>{hours + 3}시</p>
            <p></p>
            <p>{Math.round(temp)}°</p>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div>
        <p>주간 날씨</p>
        <ul className="weeklyWeather">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div>
        <p>주간 나의 기분</p>
        <ul className="weeklyMood">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div>
        <p>주간 나의 옷차림</p>
        <ul className="weeklyClothes">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default App;

import React from "react";

function Modal({
  inputDiaries,
  setFeelingValue,
  feelingValue,
  diaryValue,
  setDiaryValue,
  isModalOpen,
  setIsModalOpen,
}) {
  return (
    <div className="modal-background" hidden={!isModalOpen}>
      <form onSubmit={inputDiaries}>
        <span className="modal-close" onClick={() => setIsModalOpen(false)}>
          X
        </span>
        <input
          value={feelingValue}
          required
          onChange={(e) => setFeelingValue(e.target.value)}
          placeholder="오늘의 기분을 입력해주세요"
        />
        <input
          value={diaryValue}
          required
          onChange={(e) => setDiaryValue(e.target.value)}
          placeholder="일기를 입력해주세요"
        />

        <button type="submit" className="submit-button" value="diary">
          저장
        </button>
      </form>
    </div>
  );
}

export default Modal;

import React, { useState, useEffect } from "react";
import { useTodo } from "./TodoContext";
import deleteLogo from "../img/assets/habitDeletelogo.svg";
import "./TodoModal.css";

const TodoModal = ({ onClose }) => {
  const { todos, setTodos } = useTodo(); // todos와 직접 설정 가능한 setTodos 가져오기
  const [localTodos, setLocalTodos] = useState([...todos]); // 임시 상태

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setLocalTodos([...todos]); // 모달이 열릴 때 todos 상태를 복사
  }, [todos]);

  const handleAdd = () => {
    if (inputText.trim()) {
      const newTodo = { id: Date.now(), text: inputText.trim() };
      setLocalTodos((prev) => [...prev, newTodo]);
      setInputText(""); // 입력값 초기화
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd(); // Enter 키를 누르면 handleAdd 호출
      e.preventDefault(); // 기본 동작 방지 (폼 제출 방지)
    }
  };

  const handleDelete = (id) => {
    setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleCancel = () => {
    setLocalTodos([...todos]); // 수정 전 상태로 복구
    onClose();
  };

  const handleSave = () => {
    setTodos(localTodos); // 컨텍스트에 상태 반영
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>습관 목록</h2>
        <ul>
          {localTodos.map((todo) => (
            <li key={todo.id} className="modal-item">
              <div className="todo-text">{todo.text}</div>
              <button id="delHabit" onClick={() => handleDelete(todo.id)}>
                <img src={deleteLogo} alt="삭제"></img>
              </button>
            </li>
          ))}
        </ul>
        <div className="modal-add">
          <input
            className="input-text"
            type="text"
            placeholder="추가할 습관 입력"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
          />
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" id="cancel" onClick={handleCancel}>
            취소
          </button>{" "}
          {/* 취소 버튼 */}
          <button id="save" onClick={handleSave}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;

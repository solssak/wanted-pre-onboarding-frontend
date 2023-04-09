import React, { useState } from "react";

function Edit({ todo, getTodo, setEdit }) {
  const [inputValue, setInputValue] = useState(todo);

  const BASE_URL = (id) =>
    `https://www.pre-onboarding-selection-task.shop/todos/${id}`;

  return (
    <form>
      <input
        type="text"
        value={inputValue.todo}
        data-testid="modify-input"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button
        data-testid="submit-button"
        onClick={(e) => {
          e.preventDefault();
          fetch(BASE_URL(todo.id), {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              todo: inputValue,
              isCompleted: todo.isCompleted,
            }),
          }).then((resp) => {
            if (resp.ok) {
              setEdit(false);
              getTodo();
            }
          });
        }}
      >
        제출
      </button>
      <button
        data-testid="cancel-button"
        onClick={(e) => {
          e.preventDefault();
          setEdit(false);
        }}
      >
        취소
      </button>
    </form>
  );
}

export default Edit;

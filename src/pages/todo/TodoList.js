import React, { useState } from "react";
import Edit from "./edit";

const TodoList = ({ todo, getTodo }) => {
  const [edit, setEdit] = useState(false);
  const BASE_URL = (id) =>
    `https://www.pre-onboarding-selection-task.shop/todos/${id}`;

  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          defaultChecked={todo?.isCompleted}
          onChange={() => {
            fetch(BASE_URL(todo.id), {
              method: "PUT",
              headers: {
                Authorization: ` Bearer ${localStorage.getItem(
                  "access_token"
                )}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                todo: todo?.todo,
                isCompleted: !todo?.isCompleted,
              }),
            });
          }}
        />
        {edit ? (
          <Edit setEdit={setEdit} todo={todo} getTodo={getTodo}></Edit>
        ) : (
          <div>
            <span>{todo?.todo}</span>
            <button
              data-testid="modify-button"
              onClick={(e) => {
                e.preventDefault();
                setEdit(true);
              }}
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              onClick={(e) => {
                e.preventDefault();
                fetch(BASE_URL(todo?.id), {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "access_token"
                    )}`,
                  },
                }).then((resp) => {
                  if (resp.ok) {
                    getTodo();
                  }
                });
              }}
            >
              삭제
            </button>
          </div>
        )}
      </label>
    </li>
  );
};

export default TodoList;

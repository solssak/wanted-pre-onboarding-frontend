import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();
  const [todoModify, setTodoModify] = useState("");
  const [todoInput, setTodoInput] = useState([]);

  const BASE_URL = () =>
    `https://www.pre-onboarding-selection-task.shop/todos/`;

  const getTodo = () => {
    fetch(BASE_URL(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodoInput([...data]);
      });
  };

  useEffect(getTodo, []);

  useEffect(() => {
    const isToken = localStorage.getItem("access_token");
    if (!isToken) {
      navigate("/signup", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <form
        className="todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetch(BASE_URL(), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
              todo: todoModify,
            }),
          }).then((res) => {
            if (res.ok) {
              console.log(res);
              getTodo();
              setTodoModify("");
            }
          });
        }}
      >
        <h1>Wanted todo</h1>
        <input
          data-testid="new-todo-input"
          placeholder="할 일을 입력하세요"
          value={todoModify}
          onChange={(e) => {
            setTodoModify(e.target.value);
          }}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      <ol>
        {todoInput.map((todo) => {
          return <TodoList todo={todo} key={todo.id} getTodo={getTodo} />;
        })}
      </ol>
    </div>
  );
};

export default Todo;

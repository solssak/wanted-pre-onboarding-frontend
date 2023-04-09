import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Todo from "./pages/todo/Todo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;

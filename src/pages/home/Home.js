import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="main-auth">
        <Link to={"/signin"}>
          <button className="main-signin">로그인</button>
        </Link>
        <Link to={"/signup"}>
          <button className="main-signup">회원가입</button>
        </Link>
        <Link to={"/todo"}>
          <button className="main-signin">투두리스트</button>
        </Link>
      </div>
    </>
  );
};
export default Home;

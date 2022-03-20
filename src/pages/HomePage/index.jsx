import queryString from "query-string";
import { useEffect, useState } from "react";
import BetterClock from "../../components/BetterClock";
import Clock from "../../components/Clock";
import ColorBox from "../../components/ColorBox";
import Pagination from "../../components/Pagination";
import PostFilterForm from "../../components/PostFilterForm";
import PostList from "../../components/PostList";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import "./HomePage.scss";

function HomePage() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love PN" },
    { id: 2, title: "We love PN" },
    { id: 3, title: "K love PN" },
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
    title_like: "",
  });

  useEffect(() => {
    async function fetchPostList() {
      const paramString = queryString.stringify(filters);
      const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();

      const { data, pagination } = responseJSON;
      setPostList(data);
      setPagination(pagination);
    }

    fetchPostList();
  }, [filters]);

  function handleTodoListClick(todo) {
    const index = todoList.findIndex((x) => (x.id = todo.id));
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = { id: todoList.length + 1, ...formValues };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  }

  function handlePaginationChange(newPage) {
    setFilters({ ...filters, _page: newPage });
  }

  function handlePostFilterFormSubmit(newFilters) {
    setFilters({
      ...filters,
      title_like: newFilters.title,
      _page: 1,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="home-page">
      {/* {showClock && <Clock></Clock>} */}
      {/* <BetterClock></BetterClock> */}
      {/* <button
        onClick={() => {
          setShowClock(false);
        }}
      >
        Hide Clock
      </button>

      <ColorBox></ColorBox> */}

      <PostFilterForm onSubmit={handlePostFilterFormSubmit}></PostFilterForm>
      <PostList posts={postList}></PostList>
      <Pagination
        pagination={pagination}
        onPageChange={handlePaginationChange}
      ></Pagination>
      {/* <TodoForm onSubmit={handleTodoFormSubmit}></TodoForm>
      <TodoList
        todos={todoList}
        onTodoListClick={handleTodoListClick}
      ></TodoList> */}
    </div>
  );
}

export default HomePage;

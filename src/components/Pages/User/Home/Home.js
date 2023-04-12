import React, { useEffect, useState } from "react";
import Posts from "../../../Posts/Posts";
import Form from "../../../Form/Form";

import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../../../actions/posts";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const posts = useSelector((state) => state.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      navigate(`/posts/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/posts");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <>
      <div className="flex justify-end mr-12 mt-10">
        <div className="flex space-x-1">
          <input
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            type="text"
            className="block w-full px-4 py-2 text-slate-500 bg-slate-900 border rounded-full border-none focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
          />
          <button
            onClick={searchPost}
            className="px-4 text-slate-400 bg-slate-900 rounded-full "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <Posts setCurrentId={setCurrentId} />

      <Form currentId={currentId} setCurrentId={setCurrentId} />
    </>
  );
}

export default Home;

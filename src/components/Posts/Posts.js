import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import Shimmer from "../Shimmer/Shimmer";
import Container from "../Container/Container";

function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (
    <Shimmer />
  ) : (
    <Container>
      {posts.map((post) => {
        return <Post setCurrentId={setCurrentId} post={post} key={post._id} />;
      })}
    </Container>
  );
}

export default Posts;

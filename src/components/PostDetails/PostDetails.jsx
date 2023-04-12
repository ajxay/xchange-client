import React, { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../actions/posts";

import CommentSection from "./CommentSection";

const PostDetails = () => {
  const [loading, setLoading] = useState(false);

  const post = useSelector((state) => state.posts);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) {
    setLoading(true);
    return (
      <div className="h-screen flex items-center justify-center">
        <ClimbingBoxLoader
          className="h-5"
          color={"yellow"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full bg-slate-900 m-5  text-slate-400 rounded">
      <div className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src={post?.selectedFile}
        />
      </div>

      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {post.creator}
        </h3>
        <h2 className="text-grey-400 title-font text-lg font-medium">
          {post.message}
        </h2>
        <p className="mt-1">{moment(post.createdAt).fromNow()}</p>
      </div>
      <CommentSection post={post} />
    </div>
  );
};

export default PostDetails;

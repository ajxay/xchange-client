import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import React, { useRef, useState } from "react";
import moment from "moment";
import {
  MdFavorite,
  MdMoreHoriz,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [likes, setLikes] = useState(post?.likes);

  const hasLikedpost = likes.find(
    (like) => like === (user?.result?.sub || user?.result?._id)
  );

  const userId = user?.result.sub || user?.result?._id;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (event) => {
    event.preventDefault();
    setMenuOpen(!menuOpen);
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedpost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <>
          <MdFavorite className="text-red-500 text-2xl" />
        </>
      ) : (
        <>
          <MdOutlineFavoriteBorder className="text-gray-600 text-2xl" />
        </>
      );
    }
    return (
      <>
        <MdOutlineFavoriteBorder className="text-gray-600 text-2xl" />
      </>
    );
  };

  return (
    <div className="lg:w-1/5 md:w-1/4 sm:w-1/3 ss:w-1/2 sm:m-4  p-4 w-full relative bg-white m-2 rounded-lg shadow-lg hover:drop-shadow-2xl transition-all duration-200">
      {/* {menuOpen && (
            <div
              className="fixed rounded-md inset-0 bg-black opacity-25 z-40"
              onClick={handleMenuClick}
            >
              hii
            </div>
          )} */}
      {/* {menuOpen && (
        <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
          <div className="bg-white rounded-lg shadow-md flex flex-col divide-y divide-gray-300">
            <button className="px-4 py-2 hover:bg-gray-100">Edit</button>
            <button className="px-4 py-2 hover:bg-gray-100">Delete</button>
          </div>
        </div>
      )} */}

      <div
        onClick={openPost}
        className="block relative h-48 mt-8  rounded overflow-hidden cursor-pointer"
      >
        <img
          alt="image"
          className="object-cover w-full h-48 transform hover:scale-105 transition duration-300 ease-in-out"
          src={post.selectedFile}
        />
        {/* <div className="absolute top-0 left-0 mt-3 ml-3">
          <span className="bg-black px-3 py-1 text-white rounded-full text-xs uppercase">
            {post.tags[0]}
          </span>
        </div> */}

        <div className="absolute top-0 right-0 mt-3 mr-3">
          <span className="bg-black px-3 py-1 text-white rounded-full text-xs uppercase">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
      </div>

      <div className="absolute top-0 right-0 mr-2 mt-2">
        <div className="relative inline-block text-left">
          <div>
            {/* //DropDown *************************************************************************/}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50">
                  <MdMoreHoriz />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {(user?.result?.sub === post?.creator ||
                      user?.result?._id === post?.creator) && (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              setCurrentId(post._id);
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                    )}

                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Duplicate
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Archive
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Move
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Share
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Add to favorites
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    {(user?.result?.sub === post?.creator ||
                      user?.result?._id === post?.creator) && (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              dispatch(deletePost(post._id));
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Delete
                          </a>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      <div className="px-1 py-4">
        <p className="font-bold text-lg mb-2">{post.creator}</p>
        <p className="text-gray-700 text-base">{post.message}</p>
      </div>

      <div className="flex items-center">
        <button
          disabled={!user?.result}
          onClick={handleLike}
          className="flex items-center mr-4"
        >
          <Likes />
        </button>
      </div>
    </div>
  );
}

export default Post;

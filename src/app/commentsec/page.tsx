"use client";
import React, { useState, useEffect } from "react";

const CommentSec = () => {
  const [comments, setComments] = useState<
    { username: string; comment: string; rating: number }[]
  >([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  // Save comments to localStorage whenever the comments state changes
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  const handleAddComment = () => {
    if (username && comment && rating > 0) {
      const newComment = { username, comment, rating };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setUsername("");
      setComment("");
      setRating(0);
    }
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 py-10">
      <div className="w-full max-w-2xl p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-5">
          Comment Section
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rate your review:</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-2 rounded-full border ${
                  star <= rating ? "bg-blue-500 text-white" : "bg-gray-200"
                } hover:bg-blue-400 transition-all`}
              >
                {star} ⭐
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddComment}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all"
        >
          Post Comment
        </button>
      </div>

      <div className="w-full max-w-2xl mt-10">
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Comments
        </h3>
        <div className="space-y-4">
          {comments.map((commentData, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-blue-500">
                  {commentData.username}:
                </p>
                <button
                  onClick={() => handleDeleteComment(index)}
                  className="text-blue-500 hover:text-blue-700 transition-all"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-gray-800">{commentData.comment}</p>
              <p className="mt-2 text-yellow-500">
                Rating: {commentData.rating} ⭐
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSec;

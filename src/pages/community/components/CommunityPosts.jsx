// src/components/CommunityPosts.jsx
import React, { useState } from "react";
import "./CommunityPosts.css";

const CommunityPosts = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Auther name",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
      date: "2025-07-15T10:31:32.000Z",
      comments: [
        {
          id: 1,
          name: "Commenter name",
          text: "Lorem Ipsum is simply dummy text of the printing...",
          date: "2025-07-15T11:00:00.000Z",
        },
      ],
    },
  ]);

  const [newPost, setNewPost] = useState({ author: "", content: "" });
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleAddPost = () => {
    const newEntry = {
      id: posts.length + 1,
      author: newPost.author,
      content: newPost.content,
      date: new Date().toISOString(),
      comments: [],
    };
    setPosts([newEntry, ...posts]);
    setNewPost({ author: "", content: "" });
    setShowPostModal(false);
  };

  const handleAddComment = () => {
    const updatedPosts = posts.map((post) => {
      if (post.id === selectedPostId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              name: newComment.name,
              text: newComment.text,
              date: new Date().toISOString(),
            },
          ],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setNewComment({ name: "", text: "" });
    setShowCommentModal(false);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="community-posts-container container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Qubit Community Posts</h3>
        <button
          onClick={() => setShowPostModal(true)}
          className="community-posts-add-btn"
        >
          Add Post ➕
        </button>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="community-posts-card">
          <div className="d-flex align-items-start gap-3">
            <div className="community-posts-avatar">👤</div>
            <div>
              <strong>{post.author}</strong>
              <p>{post.content}</p>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <span>💬 Comments {post.comments.length}</span>
                  <button
                    className="community-posts-comment-btn"
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setShowCommentModal(true);
                    }}
                  >
                    Add Comments ➕
                  </button>
                </div>
                <small>{formatDate(post.date)}</small>
              </div>

              {post.comments
                .slice(0, showAllComments ? post.comments.length : 1)
                .map((comment) => (
                  <div key={comment.id} className="community-posts-comment">
                    <strong>{comment.name}</strong>
                    <p>{comment.text}</p>
                    <small>{formatDate(comment.date)}</small>
                  </div>
                ))}

              {post.comments.length > 1 && (
                <button
                  className="community-posts-toggle-btn"
                  onClick={() => setShowAllComments(!showAllComments)}
                >
                  {showAllComments ? "Show Less" : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {showPostModal && (
        <div className="community-posts-modal">
          <div className="community-posts-modal-content">
            <h5>New Post</h5>
            <input
              type="text"
              placeholder="Author Name"
              value={newPost.author}
              onChange={(e) =>
                setNewPost({ ...newPost, author: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            ></textarea>
            <div className="d-flex justify-content-between">
              <button onClick={handleAddPost}>Submit</button>
              <button onClick={() => setShowPostModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showCommentModal && (
        <div className="community-posts-modal">
          <div className="community-posts-modal-content">
            <h5>New Comment</h5>
            <input
              type="text"
              placeholder="Your Name"
              value={newComment.name}
              onChange={(e) =>
                setNewComment({ ...newComment, name: e.target.value })
              }
            />
            <textarea
              placeholder="Comment"
              value={newComment.text}
              onChange={(e) =>
                setNewComment({ ...newComment, text: e.target.value })
              }
            ></textarea>
            <div className="d-flex justify-content-between">
              <button onClick={handleAddComment}>Submit</button>
              <button onClick={() => setShowCommentModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPosts;

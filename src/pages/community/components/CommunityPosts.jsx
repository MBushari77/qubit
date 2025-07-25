import React, { useEffect, useState } from "react";
import "./CommunityPosts.css";
import API from "../../../utils/API";

const CommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ author: "", content: "" });
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showAllComments, setShowAllComments] = useState(false);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get("/communityposts/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);

  // Add new post
  const handleAddPost = async () => {
    try {
      console.log({
        author_name: newPost.author,
        content: newPost.content,
      });
      const response = await API.post("/communityposts/posts", {
        author_name: newPost.author,
        content: newPost.content,
      });

      setPosts([
        {
          ...response.data,
          comments: [],
          created_at: new Date().toISOString(),
        },
        ...posts,
      ]);
      setNewPost({ author: "", content: "" });
      setShowPostModal(false);
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  // Add new comment
  const handleAddComment = async () => {
    try {
      const response = await API.post(
        `/communityposts/posts/${selectedPostId}/comments`,
        {
          commenter_name: newComment.name,
          text: newComment.text,
        }
      );

      const updatedPosts = posts.map((post) =>
        post.id === selectedPostId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  ...response.data,
                  created_at: new Date().toISOString(),
                },
              ],
            }
          : post
      );

      setPosts(updatedPosts);
      setNewComment({ name: "", text: "" });
      setShowCommentModal(false);
    } catch (error) {
      console.error("Failed to add comment", error);
    }
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
    <div className="community-posts-container container comuunity_posts_continer">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Community Posts</h3>
        <button
          onClick={() => setShowPostModal(true)}
          className="community-posts-add-btn"
        >
          Add Post <span className="bi bi-chat" />
        </button>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="community-posts-card">
          <div className="d-flex align-items-start gap-3">
            <div className="community-posts-avatar">
              <span className="bi bi-person-fill" />
            </div>
            <div>
              <strong>{post.author_name}</strong>
              <p>{post.content}</p>
              <div className="d-flex justify-content-between comuunity_posts_continer_grid">
                <div className="d-flex align-items-center gap-3">
                  <span>
                    <span className="bi bi-chat-right-text" /> Comments{" "}
                    {post.comments.length}
                  </span>
                  <button
                    className="community-posts-comment-btn"
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setShowCommentModal(true);
                    }}
                  >
                    Add Comments <span className="bi bi-chat-dots" />
                  </button>
                </div>
                <div>
                  <small>{formatDate(post.created_at)}</small>
                </div>
              </div>

              {post.comments
                .slice(0, showAllComments ? post.comments.length : 1)
                .map((comment) => (
                  <div key={comment.id} className="community-posts-comment">
                    <strong>{comment.commenter_name}</strong>
                    <p>{comment.text}</p>
                    <small>{formatDate(comment.created_at)}</small>
                  </div>
                ))}

              {post.comments.length > 1 && (
                <button
                  className="community-posts-toggle-btn"
                  onClick={() => setShowAllComments(!showAllComments)}
                >
                  {showAllComments ? "Show Less" : "Show More"}
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

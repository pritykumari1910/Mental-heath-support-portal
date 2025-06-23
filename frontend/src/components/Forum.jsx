import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import './form.css';

function ForumPost() {
  const [content, setContent] = useState('');
  const [postedBy, setPostedBy] = useState('Anonymous');
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const navigate = useNavigate(); // Use for navigation after submitting the post

  // Fetch all forum posts on component load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/forum');
      setPosts(res.data);
    } catch (err) {
      alert('Error fetching posts');
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return alert('Write something!');
    try {
      await axios.post('/api/forum', { content, postedBy });
      setContent('');
      fetchPosts();
      navigate('/dashboard'); // Redirect to the dashboard after submitting the post
    } catch (err) {
      alert('Error submitting post');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/forum/${id}`, { data: { postedBy } });
      fetchPosts();
    } catch (err) {
      alert('Delete failed: You can only delete your own posts.');
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(`/api/forum/${id}`, { content: editContent, postedBy });
      setEditId(null);
      setEditContent('');
      fetchPosts();
    } catch (err) {
      alert('Update failed: You can only edit your own posts.');
    }
  };

  const handleBack = () => {
    navigate('/dashboard'); // Redirect to dashboard if user clicks the back arrow
  };

  return (
    <div className="form-box">
      <h2>Community Forum</h2>

      {/* Back to Dashboard Button */}
      <div className="back-to-dashboard" onClick={handleBack}>
        <span>&larr; Back to Dashboard</span> {/* Arrow symbol */}
      </div>

      {/* Poster Name Input */}
      <input
        type="text"
        placeholder="Your name (or leave Anonymous)"
        value={postedBy}
        onChange={(e) => setPostedBy(e.target.value || 'Anonymous')}
      />

      {/* Textarea to Write New Post */}
      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit Post</button>

      {/* Display Posts */}
      <div style={{ marginTop: '20px' }}>
        <h3>Forum Posts:</h3>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post">
              <p>
                <strong>{post.postedBy}</strong>: {editId === post._id ? (
                  <>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button onClick={() => handleEdit(post._id)}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  post.content
                )}
              </p>
              {post.postedBy === postedBy && editId !== post._id && (
                <>
                  <button onClick={() => { setEditId(post._id); setEditContent(post.content); }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ForumPost;

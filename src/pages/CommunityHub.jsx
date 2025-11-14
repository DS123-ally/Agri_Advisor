/**
 * Community Hub Page
 * Local forum for adding, editing, and deleting posts
 */

import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { validation } from '../utils/validation';
import Card from '../components/Card';
import Button from '../components/Button';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const CommunityHub = ({ isDarkMode }) => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    content: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Load posts
    const saved = storage.get('communityPosts', []);
    setPosts(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!validation.isNotEmpty(formData.title) || !validation.isNotEmpty(formData.content)) {
      alert('Please fill all fields');
      return;
    }

    if (editingId) {
      // Update existing post
      const updated = posts.map(post =>
        post.id === editingId
          ? {
              ...post,
              name: formData.name || 'Anonymous',
              title: formData.title,
              content: formData.content,
              updatedAt: new Date().toLocaleString(),
            }
          : post
      );
      setPosts(updated);
      storage.set('communityPosts', updated);
      setEditingId(null);
    } else {
      // Create new post
      const newPost = {
        id: Date.now(),
        name: formData.name || 'Anonymous',
        title: formData.title,
        content: formData.content,
        createdAt: new Date().toLocaleString(),
        updatedAt: null,
      };
      const updated = [newPost, ...posts];
      setPosts(updated);
      storage.set('communityPosts', updated);
    }

    // Reset form
    setFormData({ name: '', title: '', content: '' });
    alert('Post saved successfully!');
  };

  const handleEdit = (post) => {
    setFormData({
      name: post.name,
      title: post.title,
      content: post.content,
    });
    setEditingId(post.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this post?')) {
      const updated = posts.filter(post => post.id !== id);
      setPosts(updated);
      storage.set('communityPosts', updated);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-primary">👥 Community Hub</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Connect with other farmers and share your experiences
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* New Post Form */}
          <Card
            title={editingId ? 'Edit Post' : 'Create New Post'}
            isDarkMode={isDarkMode}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name (optional)"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Post Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter post title"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Share your experience, question, or tip..."
                  rows="6"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit} size="lg" className="flex-1">
                  {editingId ? 'Update Post' : 'Post'}
                </Button>
                {editingId && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ name: '', title: '', content: '' });
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card title="Community Stats" isDarkMode={isDarkMode}>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <p className="text-sm font-semibold mb-1">Total Posts</p>
                <p className="text-3xl font-bold text-primary">{posts.length}</p>
              </div>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <p className="text-sm font-semibold mb-2">📋 Recent Activity</p>
                {posts.length === 0 ? (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    No posts yet. Be the first to post!
                  </p>
                ) : (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Last post: {posts[0].createdAt}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Posts List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">All Posts</h2>
          {posts.length === 0 ? (
            <Card isDarkMode={isDarkMode}>
              <p className="text-center py-8">
                No posts yet. Create the first post and start the conversation!
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} isDarkMode={isDarkMode}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-bold text-primary">{post.name}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.createdAt}
                        </p>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                      <p className={`text-sm mb-2 whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {post.content}
                      </p>
                      {post.updatedAt && (
                        <p className={`text-xs italic ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          Edited: {post.updatedAt}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;

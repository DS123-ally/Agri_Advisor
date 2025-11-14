/**
 * Record Manager Utility
 * Manages storage of all records (crops, water, weather, community posts, etc.)
 * Provides CRUD operations for all data types
 */

import { storage } from './storage';

// Storage keys
const STORAGE_KEYS = {
  CROP_RECOMMENDATIONS: 'cropRecommendations',
  WATER_USAGE_HISTORY: 'waterUsageHistory',
  COMMUNITY_POSTS: 'communityPosts',
  WEATHER_HISTORY: 'weatherHistory',
  FARM_SETTINGS: 'farmSettings',
  NOTIFICATIONS: 'notifications',
};

export const recordManager = {
  /**
   * Crop Recommendations Management
   */
  cropRecommendations: {
    add: (data) => {
      const id = Date.now().toString();
      const record = {
        id,
        ...data,
        createdAt: new Date().toISOString(),
      };
      const existing = storage.get(STORAGE_KEYS.CROP_RECOMMENDATIONS, []);
      existing.push(record);
      storage.set(STORAGE_KEYS.CROP_RECOMMENDATIONS, existing);
      return record;
    },

    getAll: () => {
      return storage.get(STORAGE_KEYS.CROP_RECOMMENDATIONS, []);
    },

    getById: (id) => {
      const records = recordManager.cropRecommendations.getAll();
      return records.find(r => r.id === id);
    },

    update: (id, data) => {
      const records = recordManager.cropRecommendations.getAll();
      const index = records.findIndex(r => r.id === id);
      if (index !== -1) {
        records[index] = { ...records[index], ...data, updatedAt: new Date().toISOString() };
        storage.set(STORAGE_KEYS.CROP_RECOMMENDATIONS, records);
        return records[index];
      }
      return null;
    },

    delete: (id) => {
      const records = recordManager.cropRecommendations.getAll();
      const filtered = records.filter(r => r.id !== id);
      storage.set(STORAGE_KEYS.CROP_RECOMMENDATIONS, filtered);
    },

    deleteAll: () => {
      storage.remove(STORAGE_KEYS.CROP_RECOMMENDATIONS);
    },
  },

  /**
   * Water Usage History Management
   */
  waterUsage: {
    add: (data) => {
      const id = Date.now().toString();
      const record = {
        id,
        ...data,
        createdAt: new Date().toISOString(),
      };
      const existing = storage.get(STORAGE_KEYS.WATER_USAGE_HISTORY, []);
      existing.push(record);
      storage.set(STORAGE_KEYS.WATER_USAGE_HISTORY, existing);
      return record;
    },

    getAll: () => {
      return storage.get(STORAGE_KEYS.WATER_USAGE_HISTORY, []);
    },

    getById: (id) => {
      const records = recordManager.waterUsage.getAll();
      return records.find(r => r.id === id);
    },

    update: (id, data) => {
      const records = recordManager.waterUsage.getAll();
      const index = records.findIndex(r => r.id === id);
      if (index !== -1) {
        records[index] = { ...records[index], ...data, updatedAt: new Date().toISOString() };
        storage.set(STORAGE_KEYS.WATER_USAGE_HISTORY, records);
        return records[index];
      }
      return null;
    },

    delete: (id) => {
      const records = recordManager.waterUsage.getAll();
      const filtered = records.filter(r => r.id !== id);
      storage.set(STORAGE_KEYS.WATER_USAGE_HISTORY, filtered);
    },

    deleteAll: () => {
      storage.remove(STORAGE_KEYS.WATER_USAGE_HISTORY);
    },
  },

  /**
   * Community Posts Management
   */
  communityPosts: {
    add: (data) => {
      const id = Date.now().toString();
      const record = {
        id,
        ...data,
        createdAt: new Date().toISOString(),
        likes: 0,
        replies: [],
      };
      const existing = storage.get(STORAGE_KEYS.COMMUNITY_POSTS, []);
      existing.push(record);
      storage.set(STORAGE_KEYS.COMMUNITY_POSTS, existing);
      return record;
    },

    getAll: () => {
      const posts = storage.get(STORAGE_KEYS.COMMUNITY_POSTS, []);
      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    getById: (id) => {
      const posts = recordManager.communityPosts.getAll();
      return posts.find(p => p.id === id);
    },

    update: (id, data) => {
      const posts = recordManager.communityPosts.getAll();
      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts[index] = { ...posts[index], ...data, updatedAt: new Date().toISOString() };
        storage.set(STORAGE_KEYS.COMMUNITY_POSTS, posts);
        return posts[index];
      }
      return null;
    },

    delete: (id) => {
      const posts = recordManager.communityPosts.getAll();
      const filtered = posts.filter(p => p.id !== id);
      storage.set(STORAGE_KEYS.COMMUNITY_POSTS, filtered);
    },

    addReply: (postId, reply) => {
      const posts = recordManager.communityPosts.getAll();
      const post = posts.find(p => p.id === postId);
      if (post) {
        if (!post.replies) post.replies = [];
        post.replies.push({
          id: Date.now().toString(),
          ...reply,
          createdAt: new Date().toISOString(),
        });
        storage.set(STORAGE_KEYS.COMMUNITY_POSTS, posts);
        return post;
      }
      return null;
    },

    deleteAll: () => {
      storage.remove(STORAGE_KEYS.COMMUNITY_POSTS);
    },
  },

  /**
   * Weather History Management
   */
  weatherHistory: {
    add: (data) => {
      const record = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      const existing = storage.get(STORAGE_KEYS.WEATHER_HISTORY, []);
      // Keep only last 100 weather records
      const limited = existing.slice(-99);
      limited.push(record);
      storage.set(STORAGE_KEYS.WEATHER_HISTORY, limited);
      return record;
    },

    getAll: () => {
      return storage.get(STORAGE_KEYS.WEATHER_HISTORY, []);
    },

    getByCity: (city) => {
      const history = recordManager.weatherHistory.getAll();
      return history.filter(h => h.name?.toLowerCase() === city.toLowerCase());
    },

    deleteAll: () => {
      storage.remove(STORAGE_KEYS.WEATHER_HISTORY);
    },
  },

  /**
   * Farm Settings Management
   */
  farmSettings: {
    get: () => {
      return storage.get(STORAGE_KEYS.FARM_SETTINGS, {
        farmName: '',
        location: '',
        area: '',
        soilType: '',
        language: 'en',
        theme: 'light',
        notifications: true,
        autoSync: false,
      });
    },

    update: (data) => {
      const current = recordManager.farmSettings.get();
      const updated = { ...current, ...data };
      storage.set(STORAGE_KEYS.FARM_SETTINGS, updated);
      return updated;
    },

    reset: () => {
      storage.remove(STORAGE_KEYS.FARM_SETTINGS);
    },
  },

  /**
   * Notifications Management
   */
  notifications: {
    add: (data) => {
      const record = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        read: false,
      };
      const existing = storage.get(STORAGE_KEYS.NOTIFICATIONS, []);
      existing.push(record);
      storage.set(STORAGE_KEYS.NOTIFICATIONS, existing);
      return record;
    },

    getAll: () => {
      return storage.get(STORAGE_KEYS.NOTIFICATIONS, []);
    },

    getUnread: () => {
      const notifications = recordManager.notifications.getAll();
      return notifications.filter(n => !n.read);
    },

    markAsRead: (id) => {
      const notifications = recordManager.notifications.getAll();
      const notification = notifications.find(n => n.id === id);
      if (notification) {
        notification.read = true;
        storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
      }
    },

    delete: (id) => {
      const notifications = recordManager.notifications.getAll();
      const filtered = notifications.filter(n => n.id !== id);
      storage.set(STORAGE_KEYS.NOTIFICATIONS, filtered);
    },

    deleteAll: () => {
      storage.remove(STORAGE_KEYS.NOTIFICATIONS);
    },
  },

  /**
   * Bulk Operations
   */
  exportAll: () => {
    return {
      cropRecommendations: recordManager.cropRecommendations.getAll(),
      waterUsage: recordManager.waterUsage.getAll(),
      communityPosts: recordManager.communityPosts.getAll(),
      weatherHistory: recordManager.weatherHistory.getAll(),
      farmSettings: recordManager.farmSettings.get(),
      notifications: recordManager.notifications.getAll(),
      exportedAt: new Date().toISOString(),
    };
  },

  importAll: (data) => {
    try {
      if (data.cropRecommendations) storage.set(STORAGE_KEYS.CROP_RECOMMENDATIONS, data.cropRecommendations);
      if (data.waterUsage) storage.set(STORAGE_KEYS.WATER_USAGE_HISTORY, data.waterUsage);
      if (data.communityPosts) storage.set(STORAGE_KEYS.COMMUNITY_POSTS, data.communityPosts);
      if (data.weatherHistory) storage.set(STORAGE_KEYS.WEATHER_HISTORY, data.weatherHistory);
      if (data.farmSettings) storage.set(STORAGE_KEYS.FARM_SETTINGS, data.farmSettings);
      if (data.notifications) storage.set(STORAGE_KEYS.NOTIFICATIONS, data.notifications);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },

  getStatistics: () => {
    return {
      totalCropRecommendations: recordManager.cropRecommendations.getAll().length,
      totalWaterRecords: recordManager.waterUsage.getAll().length,
      totalCommunityPosts: recordManager.communityPosts.getAll().length,
      totalWeatherRecords: recordManager.weatherHistory.getAll().length,
      totalNotifications: recordManager.notifications.getAll().length,
      unreadNotifications: recordManager.notifications.getUnread().length,
    };
  },

  deleteAllData: () => {
    recordManager.cropRecommendations.deleteAll();
    recordManager.waterUsage.deleteAll();
    recordManager.communityPosts.deleteAll();
    recordManager.weatherHistory.deleteAll();
    recordManager.farmSettings.reset();
    recordManager.notifications.deleteAll();
  },
};

export default recordManager;

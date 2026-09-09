const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Content = sequelize.define('Content', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.ENUM('movie', 'series', 'documentary', 'short'),
    allowNull: false,
  },
  genre: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  releaseYear: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-MA'),
  },
  duration: {
    type: DataTypes.INTEGER,
    comment: 'Duration in minutes',
  },
  posterUrl: {
    type: DataTypes.STRING,
  },
  bannerUrl: {
    type: DataTypes.STRING,
  },
  trailerUrl: {
    type: DataTypes.STRING,
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  hlsUrl: {
    type: DataTypes.STRING,
  },
  dashUrl: {
    type: DataTypes.STRING,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  cast: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  director: {
    type: DataTypes.STRING,
  },
  languages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['en'],
  },
  subtitles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ['en'],
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
}, {
  timestamps: true,
});

Content.associate = (models) => {
  Content.belongsToMany(models.User, {
    through: 'WatchHistory',
    foreignKey: 'contentId',
    as: 'viewers',
  });
};

module.exports = Content;
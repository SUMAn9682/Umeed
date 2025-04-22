import mongoose from 'mongoose';

const ChatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: function() {
      return `Chat ${new Date().toLocaleString()}`;
    }
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    // Update attachment to use Cloudinary
    attachment: {
      type: {
        type: String,
        enum: ['image', 'document', null],
        default: null
      },
      url: String,
      public_id: String,
      originalName: String
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const ChatSession = mongoose.model('ChatSession', ChatSessionSchema);
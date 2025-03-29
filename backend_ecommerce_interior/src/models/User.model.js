import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
    },

    address: {
      type: String,
    },

    image: {
      type: String,
    },

    role: {
      type: String,
      default: "USER",
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    codeId: {
      type: String,
    },
    codeExpired: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

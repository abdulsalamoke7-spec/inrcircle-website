import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    eventImage: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      default: "",
    },

    eventDate: {
      type: String,
      default: "",
    },

    eventTime: {
      type: String,
      default: "",
    },

    comingSoon: {
      type: Boolean,
      default: false,
    },

    ticketLink: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model(
  "Event",
  eventSchema
);

export default Event;
import Event from "../models/Event.js";

export const createEvent = async (
  req,
  res
) => {
  try {
    const event = await Event.create(
      req.body
    );

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getEvents = async (
  req,
  res
) => {
  try {
    const events =
      await Event.find().sort({
        createdAt: -1,
      });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEvent = async (
  req,
  res
) => {
  try {
    await Event.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Event deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
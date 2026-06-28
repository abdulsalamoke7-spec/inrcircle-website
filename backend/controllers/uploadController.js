import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (
  req,
  res
) => {
  try {
    console.log(
      "IMAGE EXISTS:",
      !!req.body.image
    );

    console.log(
      "IMAGE TYPE:",
      typeof req.body.image
    );

    console.log(
      "IMAGE LENGTH:",
      req.body.image?.length
    );

    const result =
      await cloudinary.uploader.upload(
        req.body.image
      );

    console.log(
      "UPLOAD SUCCESS:",
      result.secure_url
    );

    res.json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.log(
      "FULL CLOUDINARY ERROR:"
    );

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
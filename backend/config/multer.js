const multer = require("multer");
const supabase = require("./supabase");
const { decode } = require("base64-arraybuffer");

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to upload image to Supabase
const uploadImageToSupabase = async (file) => {
  const uniqueFilename = `public/${Date.now()}_${file.originalname}`;
  const fileBase64 = decode(file.buffer.toString("base64"));

  const { data, error } = await supabase.storage
    .from("medium") // Ensure this is your actual bucket name
    .upload(uniqueFilename, fileBase64, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error("Error uploading file: " + error.message);
  }

  const { data: image } = supabase.storage
    .from("medium")
    .getPublicUrl(data.path);
  return image.publicUrl;
};

// Export the upload middleware and the function
module.exports = {
  upload,
  uploadImageToSupabase,
};

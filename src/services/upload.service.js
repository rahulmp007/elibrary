const admin = require("firebase-admin");
const { getFirebaseApp } = require("../config/firebase");
const { logger } = require("../utils/logger");

class UploadService {
  async uploadToFirebase(file) {
    if (!file) return null;

    try {
      const app = getFirebaseApp();
      if (!app) {
        throw new Error("Firebase not initialized");
      }

      const bucket = admin.storage().bucket();
      const fileName = `book-covers/${Date.now()}-${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      return new Promise((resolve, reject) => {
        stream.on("error", (error) => {
          logger.error("Firebase upload error:", error);
          reject(error);
        });

        stream.on("finish", async () => {
          try {
            await fileUpload.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            resolve(publicUrl);
          } catch (error) {
            logger.error("Firebase make public error:", error);
            reject(error);
          }
        });

        stream.end(file.buffer);
      });
    } catch (error) {
      logger.error("Upload service error:", error);
      throw error;
    }
  }

  async deleteFromFirebase(imageUrl) {
    if (!imageUrl) return;

    try {
      const app = getFirebaseApp();
      if (!app) return;

      const bucket = admin.storage().bucket();
      const fileName = imageUrl.split("/").pop();

      if (fileName) {
        await bucket.file(`book-covers/${fileName}`).delete();
      }
    } catch (error) {
      logger.error("Firebase delete error:", error);
    }
  }
}

module.exports = new UploadService();

import dummybooks from "@/dummybooks.json";
import ImageKit from "imagekit";
import { books } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({
  path: ".env.local",
});

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql);

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  console.log(`Uploading ${fileName} to ${folder}...`);
  try {
    const response = await imageKit.upload({
      file: url,
      fileName,
      folder,
    });
    console.log(`✅ Successfully uploaded ${fileName} to ImageKit`);
    return response.filePath;
  } catch (error) {
    console.log(`❌ Failed to upload ${fileName} to ImageKit:`, error);
    return "";
  }
};

const seed = async () => {
  console.log("Seeding...");
  console.log(`Found ${dummybooks.length} books to seed`);

  try {
    for (let i = 0; i < dummybooks.length; i++) {
      const book = dummybooks[i];
      console.log(`Processing book ${i + 1}/${dummybooks.length}: "${book.title}"`);

      console.log(`Uploading cover image for "${book.title}"...`);
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      );

      console.log(`Uploading video for "${book.title}"...`);
      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      );

      console.log(`Inserting "${book.title}" into database...`);
      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
      console.log(`✅ Successfully added "${book.title}" to database`);
    }

    console.log("✅ Seeding complete!");
  } catch (error) {
    console.log("❌ Seeding failed with error:", error);
  }
};

seed();

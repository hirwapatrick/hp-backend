import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contacts.js";
import postRoutes from "./routes/posts.js";
import galleryRoutes from "./routes/gallery.js";
import skillRoutes from "./routes/skills.js";
import experienceRoutes from "./routes/experiences.js";
import testimonialRoutes from "./routes/testimonials.js";
import siteSettingRoutes from "./routes/siteSettings.js";
import assistantRoutes from "./routes/assistant.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://hirwapatrick.vercel.app"
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/settings", siteSettingRoutes);
app.use("/api/assistant", assistantRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

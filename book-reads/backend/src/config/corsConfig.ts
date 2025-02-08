import cors from "cors";

const corsConfig = cors({
  origin: [
    "https://frontend-bu9mn4qgc-basmas-projects-c8197bc0.vercel.app", 
  ],
  credentials: true, 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization", // ✅ Allow necessary headers
});

export default corsConfig;

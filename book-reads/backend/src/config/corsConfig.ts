import cors from "cors";

const corsOptions = {
  origin: ["https://frontend-82wwns96k-basmas-projects-c8197bc0.vercel.app"], // Update this with your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

export default cors(corsOptions);

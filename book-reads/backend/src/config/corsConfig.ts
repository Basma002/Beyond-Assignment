import cors from "cors";

const corsOptions = {
  origin: ["https://frontend-cfansw7m2-basmas-projects-c8197bc0.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export default cors(corsOptions);

import cors from "cors";

const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Use environment variable
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export default cors(corsOptions);


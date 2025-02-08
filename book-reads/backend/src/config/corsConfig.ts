import cors from "cors";

const corsOptions = {
  origin: "*", // Allow all origins (not recommended for production)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

export default cors(corsOptions);

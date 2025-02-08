import cors from "cors";

const corsOptions = {
  origin: "*", // Allow all origins (not recommended for production)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true, 
};

export default cors(corsOptions);

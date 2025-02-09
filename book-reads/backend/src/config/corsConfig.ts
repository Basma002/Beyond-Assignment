import cors from "cors";

const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true, 
};

export default cors(corsOptions);

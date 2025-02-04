import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3000", // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export default cors(corsOptions);

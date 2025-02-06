import cors from "cors";

const corsOptions = {
  origin: ["https://frontend-five-omega-89.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export default cors(corsOptions);

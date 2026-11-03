import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import academyRoutes from "./routes/academyRoutes.js";
import visaEnquiryRoutes from "./routes/visaEnquiryRoutes.js";

dotenv.config();
connectDB();

const app = express();

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow all origins dynamically to support dynamic deployments
//       callback(null, true);
//     },
//     credentials: true
//   })
// );
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/academy", academyRoutes);
app.use("/api/visa", visaEnquiryRoutes);
app.use("/api/enquiry", visaEnquiryRoutes);


app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

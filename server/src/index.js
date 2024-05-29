import express from "express";
import cors from "cors";
import genreRouter from "./routers/genre.js";
import userRouter from "./routers/user.js";
import movieRouter from "./routers/movie.js";
import watchlistRouter from "./routers/watchlist.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/watchlists", watchlistRouter);

app.use(function (err, req, res) {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

// Завантаження змінних середовища з файлу .env
dotenv.config();

const {DB_HOST, PORT = 3000} = process.env;



mongoose.connect(DB_HOST)
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });



  // Консолит отключение от базы
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

// Отключение от базы при событии SIGINT (ctrl + C)
process.on('SIGINT', () => {
  console.info(
    '\x1b[36m%s\x1b[0m',
    'Connection for DB disconnected and app terminated',
  );
  process.exit(1);
});
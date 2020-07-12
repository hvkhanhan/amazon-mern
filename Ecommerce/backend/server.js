import express from 'express';
import data from './data.js';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';


dotenv.config();

// Khai báo đường dẫn đến mongodb
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch((error) => console.log(error.reason));


// sử dụng express
const app = express();

// Route ở server được cấu hình là "/api/users" rồi nên bỏ "/api/users" ở userRoute đi
app.use("/api/users", userRoute);

// Get all Products
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

// Get products by Id
app.get("/api/products/:id", (req, res) => {
  // Nhận dạng id là từ view của người dùng khi bấm vào từng sản phẩm
  const productId = req.params.id;
  // Gán cái số id đó cho product qua find từ data.js
  const product = data.products.find(x => x._id === productId);
  if (product) {
    // Nếu có thì trả dữ liệu
    // Trả về product
    res.send(product);
  }
  else
    // không thì báo lỗi
    res.status(404).send({ msg: "Product not found." })
});

// Chỗ port 5000 bị lỗi báo là có ứng dụng đang xài, mình chưa biết là thằng nào đang xài port 5000 nên tạm đổi qua 5001 vậy
// Đã biết tại sao nó đang dùng port trên, vì mình mở lại nhiều tab terminal quá mà chưa tắt dẫn đến các cổng đã cấu hình vẫn đang được sử dụng
// Bà mẹ nó chỗ này port 5000 đã được cấu hình proxy bên package.js của phía frontend(react) nhưng ở đây lại ghi nhầm là port 500, cái dis nó báo lỗi=)))
app.listen(5000, () => {
  console.log('Server started at http://localhost:5000')
})

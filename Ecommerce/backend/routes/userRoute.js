import express from 'express';
import User from '../models/userModel';

const router = express.Router();

// Hàm đăng ký admin mới
// Dữ liệu sẽ được lưu trong mongoDB
router.get('/createadmin', async (req, res) => {
    try {
        const user = new User({
            name: 'An',
            email: 'hvkhanhan@gmail.com',
            password: '1234',
            isAdmin: true,
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message });
    }
});


export default router;

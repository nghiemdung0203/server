const pool = require('../../database');
const cloudinary = require("../../cloudinary");

module.exports.AddDrink = async(req, res) => {
    const { Drink_name, Drink_size, Drink_category, Drinks_price } = req.body;
    const AvatarPath = req.file.path
    const Avatar = await cloudinary.uploader.upload(AvatarPath, {
      resource_type: "image",
      folder: 'Drink'
    });
    pool.query(
        'INSERT INTO drinks (Drink_name, Drink_size, Drink_category, Drink_price, Avatar) VALUES (?, ?, ?, ?, ?)',
        [Drink_name, Drink_size, Drink_category, Drinks_price, Avatar.secure_url],
        (error, result) => {
            if (error) {
                return res.status(400).send({ error });
            } else {
                return res.status(200).send(`Add ${Drink_name} successfully`);
            }
        },
    );
};

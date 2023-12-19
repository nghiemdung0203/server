const pool = require('../../database');
const cloudinary = require("../../cloudinary");

module.exports.AddDrink = async(req, res) => {
    const { Drink_name, Drinks_price, Drink_Description } = req.body;
    const AvatarPath = req.file.path
    const Avatar = await cloudinary.uploader.upload(AvatarPath, {
      resource_type: "image",
      folder: 'Drink'
    });
    pool.query(
        'INSERT INTO drinks (Drink_name, Drink_price, Avatar, Drink_Description) VALUES (?, ?, ?, ?)',
        [Drink_name, Drinks_price, Avatar.url, Drink_Description],
        (error, result) => {
            if (error) {
                return res.status(400).send({ error });
            } else {
                return res.status(200).send(`Add ${Drink_name} successfully`);
            }
        },
    );
};

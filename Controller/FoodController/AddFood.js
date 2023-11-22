const cloudinary = require("../../cloudinary");
const pool = require("../../database");

module.exports.AddFood = async (req, res) => {
  const { Name, DescribeFood, Expiry, Price } = req.body;
  const AvatarPath = req.file.path
  const Avatar = await cloudinary.uploader.upload(AvatarPath, {
    resource_type: "image",
    folder: 'Food'
  });
  pool.query("INSERT INTO food (Name, DescribeFood, Expiry, Food_Price, Avatar) VALUES (?, ?, ?, ?, ?)", [Name, DescribeFood, Expiry, Price, Avatar.secure_url], (error, result) => {
    if (error) {
      return res.status(400).send({error});
    } else {
      return res.status(200).send("Add food successfully");
    }
  })

};

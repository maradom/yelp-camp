const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//check if there is any errors or succesfully opened connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //Your user ID
      author: "6082b9c05ceecb2f80e91c35",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit, in consequatur cumque accusamus saepe facere cum temporibus ad quam esse illo suscipit aspernatur cupiditate sequi ut? Non alias recusandae libero.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/bauzis/image/upload/v1619526517/YelpCamp/aiqurc395j1dbrfj6rch.jpg",
          filename: "YelpCamp/aiqurc395j1dbrfj6rch",
        },
        {
          url:
            "https://res.cloudinary.com/bauzis/image/upload/v1619526519/YelpCamp/ux1v5a094zmaz7q6dapw.jpg",
          filename: "YelpCamp/ux1v5a094zmaz7q6dapw",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});

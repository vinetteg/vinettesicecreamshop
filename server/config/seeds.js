const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Classics" },
    { name: "Seasonal" },
    { name: "Bundles" },
    { name: "Recipe Books" },
    { name: "Merchandise" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Carmel Compel",
      description:
        "Delicious ice cream with a touch of sea salt and carmel swirls in one! ",
      image: "carmel.jpg",
      category: categories[0]._id,
      price: 13.99,
      quantity: 57,
    },
    {
      name: "Matcha Match",
      description:
        "Meet your Matcha Math,  made with real Matcha that will transport you to a peaceful moment and awaken your senses ",
      image: "greenCone.jpg",
      category: categories[0]._id,
      price: 13.99,
      quantity: 90,
    },
    {
      name: "Vanilla Dream",
      category: categories[0]._id,
      description:
        "A classic flavor that never disappoints. Made with a our perfect mix of fresh vanilla bean, that will make this your next go to flavor",
      image: "vanillaScoop.jpg",
      price: 13.99,
      quantity: 44,
    },
    {
      name: "Morning Mocha ",
      category: categories[0]._id,
      description:
        "A mocha ice cream that can be enjoyed anytime of the day. Really, it's that good",
      image: "mocha.jpg",
      price: 13.99,
      quantity: 20,
    },
    {
      name: "Very Berry Sorbet ",
      category: categories[0]._id,
      description:
        "Our sorbet made of mixed fresh berries. It's a juicy, refreshing taste the is berry good",
      image: "pinkRed.jpg",
      price: 13.99,
      quantity: 50,
    },
    {
      name: "Takes 2 to Mango ",
      category: categories[0]._id,
      description:
        "A tropical mango flavor that'll be the only thing you'll need in your life. Might as well order two. ",
      image: "strpes.jpg",
      price: 13.99,
      quantity: 70,
    },
    {
      name: "Cotton Candy",
      category: categories[1]._id,
      description:
        "A fun, blueberry cotton candy flavor. Enjoy for a limited time. ",
      image: "twoPink.jpg",
      price: 13.99,
      quantity: 30,
    },
    {
      name: "Summertime Strawberry",
      category: categories[1]._id,
      description:
        "Summer is strawberry season! Enjoy this limited summer special now!",
      image: "strawberryBeacj.jpg",
      price: 14.99,
      quantity: 20,
    },
    {
      name: "Chocolate Coconut Paradise",
      category: categories[1]._id,
      description:
        "A coconut flavored ice cream  you'll want to enjoy every summer!",
      image: "chocolateSpinkles.jpg",
      price: 14.99,
      quantity: 20,
    },
    {
      name: "Raspberry Cherry Delight",
      category: categories[1]._id,
      description:
        "Raspberry and cherry. The combo you didn't think you needed for summer.",
      image: "twoYellow.jpg",
      price: 14.99,
      quantity: 20,
    },
    {
      name: "Mystery One",
      category: categories[2]._id,
      description:
        "Can't decide which one to pick? Let us pick for you! A surprise to look forward to. ",
      image: "vanillaColor.jpg",
      price: 12.99,
      quantity: 30,
    },
    {
      name: "Double Mystery",
      category: categories[2]._id,
      description:
        "A two flavor special bundle. You'll receive one classic flavor and one seasonal flavor.",
      image: "twoScoops.jpg",
      price: 28.99,
      quantity: 10,
    },
    {
      name: "Triple Mystery",
      category: categories[2]._id,
      description:
        "Receive three assorted flavors. Either Classic or Seasonal flavors.",
      image: "threePick.jpg",
      price: 40.99,
      quantity: 20,
    },
    {
      name: "Mystery Pack Four",
      category: categories[2]._id,
      description: "Four delicious flavors picked and delivered just for you.",
      image: "fourCones.jpg",
      price: 60.99,
      quantity: 23,
    },
    {
      name: "VICS Recipe Book-Hardcover",
      category: categories[3]._id,
      description:
        "Find a collection of some our favorite ice cream flavors and how you can also make them at home. Available in hardcover",
      image: "hardCover.png",
      price: 25.99,
      quantity: 23,
    },
    {
      name: "VICS Recipe Book-Paperback",
      category: categories[3]._id,
      description:
        "Find a collection of some our favorite ice cream flavors and how you can also make them at home. Available in paperback.",
      image: "paperBack.png",
      price: 19.99,
      quantity: 23,
    },
    {
      name: "VICS Logo T-shirt",
      category: categories[4]._id,
      description:
        "Soft, pink shirt with our logo. Everyone looks good in pink",
      image: "pinkShirt.png",
      price: 22.99,
      quantity: 100,
    },
    {
      name: "VICS Logo Hoodie",
      category: categories[4]._id,
      description:
        "Relax and enjoy your ice cream in our exclusive VICS hoodie. ",
      image: "hoodieMerch.png",
      price: 39.99,
      quantity: 100,
    },
    {
      name: "VICS Tote Bag",
      category: categories[4]._id,
      description:
        "Get our special VICS tote bag. Great to carry your daily essentials.",
      image: "bagMerch.png",
      price: 19.99,
      quantity: 100,
    },
    {
      name: "VICS Bucket Hat",
      category: categories[4]._id,
      description:
        "Look cool while enjoying some of our ice cream in our bucket hat!",
      image: "bucketHatMerch.png",
      price: 19.99,
      quantity: 100,
    },
    {
      name: "VICS Hat",
      category: categories[4]._id,
      description: "Our classic VICS baseball hat. ",
      image: "bHat.png",
      price: 19.99,
      quantity: 100,
    },
    {
      name: "VICS Tote Bag",
      category: categories[4]._id,
      description:
        "Get our special VICS tote bag. Great to carry your daily essentials.",
      image: "bagMerch.png",
      price: 19.99,
      quantity: 100,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});

const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Ice Cream' },
    { name: 'Gelato' },
    { name: 'Frozen Yogurt' },
    { name: 'Recipe Books' },
    { name: 'Merchandise' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Banana Pudding',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'banana-pudding-icecream.jpg',
      category: categories[0]._id,
      price: 13.99,
      quantity: 500
    },
    {
      name: 'Strawberry',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'strawberry-ice-cream.jpg',
      category: categories[0]._id,
      price: 13.99,
      quantity: 500
    },
    {
      name: 'Vanilla',
      category: categories[0]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'vanilla-ice-cream.jpg',
      price: 13.99,
      quantity: 20
    },
    {
      name: 'Strawberry Gelato',
      category: categories[1]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'strawberry-gelato.jpg',
      price: 13.99,
      quantity: 50
    },
    {
      name: 'Mango Gelato',
      category: categories[1]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'mango-gelato.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Pumpkin Frozen Yogurt',
      category: categories[2]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'pumpkin-frozen-yogurt.jpg',
      price: 13.99,
      quantity: 30
    },
    {
      name: 'Green Tea Frozen Yogurt',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'green-tea-frozen-yogurt.jpg',
      price: 18.99,
      quantity: 30
    },
    {
      name: 'Ice Cream Recipe Book',
      category: categories[3]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'ice-creamirecipe-book.jpg',
      price: 59.99,
      quantity: 100
    },
    {
      name: 'Fanny pack',
      category: categories[4]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'ice-cream-fanny.jpg',
      price: 41.99,
      quantity: 1000
    },
    {
      name: 'Ice Cream Scoop',
      category: categories[4]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'scooper-ice.jpg',
      price: 22.99,
      quantity: 1000
    },
    {
      name: 'T-Shrit',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'ice-cream-tshirt.jpg',
      price: 39.99,
      quantity: 100
    },
    {
      name: 'Ice Cream Mug',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'ice-cream-coffee-cup.jpg',
      price: 19.99,
      quantity: 600
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });
  await User.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@testmail.com',
    password: 'password12345',
    role: 'admin',
  });

  console.log('users seeded');

  process.exit();
});

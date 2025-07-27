const mongoose = require('mongoose');
require('dotenv').config();

const Company = require('./models/Company');
const Warehouse = require('./models/Warehouse');
const Product = require('./models/Product');
const Inventory = require('./models/Inventory');
const Supplier = require('./models/Supplier');
const ProductSupplier = require('./models/ProductSupplier');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Optional: Clear old data
    await Company.deleteMany({});
    await Warehouse.deleteMany({});
    await Product.deleteMany({});
    await Inventory.deleteMany({});
    await Supplier.deleteMany({});
    await ProductSupplier.deleteMany({});

    // 1. Create a company
    const company = await Company.create({ name: 'Acme Corp' });

    // 2. Create two warehouses
    const warehouse1 = await Warehouse.create({
      companyId: company._id,
      name: 'Main Warehouse',
      location: 'Pune',
    });

    const warehouse2 = await Warehouse.create({
      companyId: company._id,
      name: 'Backup Warehouse',
      location: 'Mumbai',
    });

    // 3. Create a supplier
    const supplier = await Supplier.create({
      name: 'Supplier Corp',
      contactEmail: 'orders@supplier.com',
    });

    // 4. Create two products
    const product1 = await Product.create({
      name: 'Widget A',
      sku: 'WID-001',
      price: 120.5,
    });

    const product2 = await Product.create({
      name: 'Widget B',
      sku: 'WID-002',
      price: 80.0,
    });

    // 5. Create inventory (with 1 low-stock product for alert testing)
    await Inventory.create([
      {
        productId: product1._id,
        warehouseId: warehouse1._id,
        quantity: 5, // This should trigger alow-stock alert
      },
      {
        productId: product2._id,
        warehouseId: warehouse1._id,
        quantity: 25,
      },
      {
        productId: product2._id,
        warehouseId: warehouse2._id,
        quantity: 10,
      },
    ]);

    // 6. Link products with supplier
    await ProductSupplier.create([
      {
        productId: product1._id,
        supplierId: supplier._id,
      },
      {
        productId: product2._id,
        supplierId: supplier._id,
      },
    ]);

    
    console.log('\n Seed data inserted successfully\n');
    console.log('Company ID:     ', company._id.toString());
    console.log('Warehouse 1 ID: ', warehouse1._id.toString());
    console.log('Warehouse 2 ID: ', warehouse2._id.toString());
    console.log('Product 1 ID:   ', product1._id.toString());
    console.log('Product 2 ID:   ', product2._id.toString());
    console.log('Supplier ID:    ', supplier._id.toString());

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();

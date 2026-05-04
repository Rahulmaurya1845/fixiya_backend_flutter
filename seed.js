const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

const services = [
  {
    name: 'Plumbing Repair',
    category: 'plumbing',
    description: 'Expert plumbing services including leak repair, pipe installation, faucet replacement, and drainage solutions. Our certified plumbers ensure quality workmanship.',
    shortDescription: 'Leak repair, pipes, faucets & more',
    icon: 'plumbing',
    image: '',
    startingPrice: 299,
    visitCharge: 99,
    rating: 4.8,
    reviewCount: 1240,
    isActive: true,
    features: ['Leak detection & repair', 'Pipe installation', 'Faucet replacement', 'Drain cleaning', 'Water heater repair'],
    estimatedTime: '1-3 hours'
  },
  {
    name: 'Electrical Services',
    category: 'electrical',
    description: 'Professional electrical services for wiring, installations, repairs, and safety inspections. Licensed electricians for all your electrical needs.',
    shortDescription: 'Wiring, installations & repairs',
    icon: 'electrical_services',
    image: '',
    startingPrice: 249,
    visitCharge: 99,
    rating: 4.7,
    reviewCount: 980,
    isActive: true,
    features: ['Wiring repair', 'Switch installation', 'Fan installation', 'Circuit breaker repair', 'Safety inspection'],
    estimatedTime: '1-2 hours'
  },
  {
    name: 'AC Repair & Service',
    category: 'ac_repair',
    description: 'Complete AC solutions including installation, repair, gas refilling, and maintenance. Keep your home cool with our expert technicians.',
    shortDescription: 'Installation, repair & maintenance',
    icon: 'ac_unit',
    image: '',
    startingPrice: 399,
    visitCharge: 149,
    rating: 4.9,
    reviewCount: 1560,
    isActive: true,
    features: ['AC installation', 'Gas refilling', 'Cooling repair', 'Filter cleaning', 'Annual maintenance'],
    estimatedTime: '2-4 hours'
  },
  {
    name: 'Carpentry Work',
    category: 'carpentry',
    description: 'Skilled carpentry services for furniture repair, custom woodwork, door installations, and cabinetry. Quality craftsmanship guaranteed.',
    shortDescription: 'Furniture, doors & custom work',
    icon: 'carpenter',
    image: '',
    startingPrice: 349,
    visitCharge: 99,
    rating: 4.6,
    reviewCount: 750,
    isActive: true,
    features: ['Furniture repair', 'Door installation', 'Custom cabinets', 'Wood polishing', 'Shelf installation'],
    estimatedTime: '2-5 hours'
  },
  {
    name: 'Painting Services',
    category: 'painting',
    description: 'Professional painting services for interiors and exteriors. Color consultation, wall preparation, and premium finishes for your home.',
    shortDescription: 'Interior & exterior painting',
    icon: 'format_paint',
    image: '',
    startingPrice: 1999,
    visitCharge: 0,
    rating: 4.8,
    reviewCount: 890,
    isActive: true,
    features: ['Interior painting', 'Exterior painting', 'Wall texture', 'Waterproofing', 'Color consultation'],
    estimatedTime: '1-3 days'
  },
  {
    name: 'Home Cleaning',
    category: 'cleaning',
    description: 'Professional home cleaning services including deep cleaning, sofa cleaning, bathroom cleaning, and kitchen cleaning.',
    shortDescription: 'Deep cleaning for your home',
    icon: 'cleaning_services',
    image: '',
    startingPrice: 499,
    visitCharge: 0,
    rating: 4.7,
    reviewCount: 2100,
    isActive: true,
    features: ['Deep cleaning', 'Sofa cleaning', 'Bathroom cleaning', 'Kitchen cleaning', 'Floor polishing'],
    estimatedTime: '3-5 hours'
  },
  {
    name: 'Appliance Repair',
    category: 'appliance',
    description: 'Expert repair services for all home appliances including refrigerators, washing machines, microwaves, and ovens.',
    shortDescription: 'Fridge, washing machine & more',
    icon: 'kitchen',
    image: '',
    startingPrice: 349,
    visitCharge: 149,
    rating: 4.5,
    reviewCount: 1120,
    isActive: true,
    features: ['Refrigerator repair', 'Washing machine repair', 'Microwave repair', 'Oven repair', 'Geyser repair'],
    estimatedTime: '1-3 hours'
  },
  {
    name: 'Pest Control',
    category: 'pest_control',
    description: 'Safe and effective pest control services for cockroaches, termites, rodents, and mosquitoes. Family-safe solutions.',
    shortDescription: 'Cockroach, termite & mosquito control',
    icon: 'pest_control',
    image: '',
    startingPrice: 599,
    visitCharge: 0,
    rating: 4.6,
    reviewCount: 680,
    isActive: true,
    features: ['Cockroach control', 'Termite treatment', 'Rodent control', 'Mosquito control', 'Bed bug treatment'],
    estimatedTime: '1-2 hours'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Service.deleteMany();
    console.log('🗑️  Cleared existing services');

    await Service.insertMany(services);
    console.log('✅ Seeded 8 services successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
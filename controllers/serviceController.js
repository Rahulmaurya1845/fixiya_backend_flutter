const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
exports.getAllServices = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const services = await Service.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: services.length,
      data: { services }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { service }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get service categories
// @route   GET /api/services/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Service.distinct('category');
    
    const categoryData = [
      { id: 'plumbing', name: 'Plumber', icon: 'plumbing', color: '#0D7377' },
      { id: 'electrical', name: 'Electrician', icon: 'electrical_services', color: '#F4A261' },
      { id: 'ac_repair', name: 'AC Repair', icon: 'ac_unit', color: '#2A9D8F' },
      { id: 'carpentry', name: 'Carpenter', icon: 'carpenter', color: '#E76F51' },
      { id: 'painting', name: 'Painter', icon: 'format_paint', color: '#9B5DE5' },
      { id: 'cleaning', name: 'Cleaning', icon: 'cleaning_services', color: '#00B4D8' },
      { id: 'appliance', name: 'Appliance', icon: 'kitchen', color: '#FB8500' },
      { id: 'pest_control', name: 'Pest Control', icon: 'pest_control', color: '#588157' }
    ];

    res.status(200).json({
      status: 'success',
      data: { categories: categoryData }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Create service (Admin only)
// @route   POST /api/services
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { service }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
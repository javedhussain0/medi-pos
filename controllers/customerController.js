import Customer from "../modules/Customer.js";

export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create customer", error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch customers", error: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch customer", error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update customer", error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete customer", error: error.message });
  }
};

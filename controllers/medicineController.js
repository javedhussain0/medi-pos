import Medicine from "../modules/Medicine.js";

export const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    return res.status(201).json(medicine);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create medicine", error: error.message });
  }
};

export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });
    return res.status(200).json(medicines);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch medicines", error: error.message });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    return res.status(200).json(medicine);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch medicine", error: error.message });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    return res.status(200).json(medicine);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update medicine", error: error.message });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    return res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete medicine", error: error.message });
  }
};

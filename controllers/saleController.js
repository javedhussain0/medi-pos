import Medicine from "../modules/Medicine.js";
import Sale from "../modules/Sale.js";

export const createSale = async (req, res) => {
  try {
    const { billNo, customerId, date, mobileNo, items = [], gst = 0 } = req.body;

    if (!billNo || !customerId || !mobileNo || items.length === 0) {
      return res.status(400).json({ message: "billNo, customerId, mobileNo and items are required" });
    }

    let totalAmount = 0;
    const normalizedItems = [];

    for (const soldItem of items) {
      const medicine = await Medicine.findById(soldItem.medicineId);
      if (!medicine) {
        return res.status(404).json({ message: `Medicine not found: ${soldItem.medicineId}` });
      }

      if (medicine.stock < soldItem.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${medicine.name}` });
      }

      const price = medicine.sellingPrice;
      const subtotal = soldItem.quantity * price;

      medicine.stock -= soldItem.quantity;
      await medicine.save();

      totalAmount += subtotal;
      normalizedItems.push({
        medicineId: medicine._id,
        quantity: soldItem.quantity,
        price,
        subtotal,
      });
    }

    const sale = await Sale.create({
      billNo,
      customerId,
      date,
      mobileNo,
      items: normalizedItems,
      totalAmount,
      gst,
    });

    return res.status(201).json(sale);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create sale", error: error.message });
  }
};

export const getSales = async (_req, res) => {
  try {
    const sales = await Sale.find()
      .populate("customerId", "name phone")
      .populate("items.medicineId", "name brand")
      .sort({ createdAt: -1 });

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch sales", error: error.message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate("customerId", "name phone")
      .populate("items.medicineId", "name brand");

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch sale", error: error.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    return res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete sale", error: error.message });
  }
};

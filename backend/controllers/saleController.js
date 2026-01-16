import Sale from "../modules/Sale";
import Medicine from "../modules/Medicine";
import Customer from "../modules/Customer";


export const createSale = async (req, res) => {
    try {
        const { billNo, CustomerId, date, mobileNo, item, totalAmount, gst } = req.body;
        const newSale = new Sale({
            billNo,
            CustomerId,
            date,
            mobileNo,
            item,
            totalAmount,
            gst
        });
        await newSale.save();
       totalAmount = 0;
      for (const soldItem of item){
        const medicines = await Medicine.findById(soldItem.medicineId);
        if(medicines){
            if(medicines.stock >= soldItem.quantity){
                medicines.stock -= soldItem.quantity;
                await medicines.save();
                totalAmount += soldItem.quantity * medicines.price;
            }else{
                return res.status(400).json({message : `Insufficient stock for medicine ID: ${soldItem.medicineId}`});  
            }

        }
        
      }
        
            
        res.status(201).json(newSale);
        res.status(200).json({message : "bill generate successfully"});
    }catch(error){
        res.status(500).json({message : error.message});
    }
};

export const getSales = async (req, res) => {
    try{
        const sales = await Sale.find();
        res.status(200).json(sales);


    }catch(error){
        res.status(500).json({message : error.message});
    }
}

export const getSaleById = async (req, res) => {
    try{
        const { id } = req.params;
        const sale = await Sale.find
        ById(id);;
        res.status(200).json(sale); 
    }catch(error){
        res.status(500).json({message : error.message});
        
    }
}
export const updateSale = async (req, res) => {
    try{
        const { id } = req.params;
        const { billNo, CustomerId, date, mobileNo, item, totalAmount, gst } = req.body;
        const updatedSale = await Sale.findByIdAndUpdate(id, {
            billNo,
            CustomerId,
            date,
            mobileNo,
            item,
            totalAmount,
            gst
        }, { new: true });
        res.status(200).json(updatedSale);


    }catch(error){
        res.status(500).json({message : error.message});
    }
}

export const deleteSale = async (req, res) => {
    try{
        const { id } = req.params;  
        await Sale.findByIdAndDelete(id);
    }catch(error){
        res.status(500).json({message : error.message});
    }
};
 export const Medicine = async (req, res) => {
    try{
        const medicines = await Medicine.find();
        res.status(200).json(medicines);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
};

const updateMedicineBIll = async (medicineId, quantitySold) => {
    try {
        const medicine = await Medicine.findById(medicineId);
        if (medicine) {
            if (medicine.stock >= quantitySold) {    
                medicine.stock -= quantitySold;
                await medicine.save();
            }
        }
    } catch (error) {
        console.error("Error updating medicine stock:", error);
    }
};
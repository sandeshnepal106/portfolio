import { Contact } from "../models/portfolioModel.js";

export const postContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();
        return res.json({ success: true, message: "Contact details save successfully." })

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
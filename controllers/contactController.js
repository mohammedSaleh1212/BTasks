const { Contact, validate } = require('../models/contact')
const _ = require('lodash')

const getAllContacts = async (req, res) => {
    const sortField = req.query.sortBy || 'name';
    const contactType = req.query.contactType;
    const sortOrder = req.query.order || 'asc';
    const searchQuery = req.query.q || '';

    try {
        const query = {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } }
            ]
        };

        if (contactType) {
            query.contactType = contactType;
        }

        const contacts = await Contact.find(query).sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 });

        if (!contacts.length) {
            return res.status(404).send('No contacts found');
        }
        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).send('Server error');
    }
}
const postContact = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const contact = new Contact(req.body)
    await contact.save()

    res.send(_.pick(contact, ['_id', 'subject', 'name', 'email', 'createdAt', 'type']))

}
const deleteContact = async(req,res) => {

    
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send('no contact matching')
    await Contact.deleteOne({ _id: req.params.id })
    return res.status(200).json({
        message: 'Contact deleted successfully',
        contact: contact
    })
}


exports.getAllContacts = getAllContacts
exports.postContact = postContact
exports.deleteContact = deleteContact
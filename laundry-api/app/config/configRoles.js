require('dotenv').config()

module.exports = {
    'secret': process.env.SECRET || '1234567890',
    ROLEs: ['USER', 'ADMIN', 'PM']
};
const Room = require('../models/room/Room');

const findAllNotDeleted = async () => {
    try {
        const rooms = await Room.find({ deletedAt: null });
        return rooms;
    } catch (err) {
        throw new Error('Erreur lors de la récupération des chambres disponibles : ' + err.message);
    }
}

const updateRoomAvailability = async (id, isAvailable) => {
    try {
        let status = {
            code: "AVAILABLE",
            label: "Disponible"
        }
        if(!isAvailable){
            status = {
                code: "RENTED",
                label: "Louée"
            }
        }
        await Room.findByIdAndUpdate(id, { status }, { new: true });
    }
    catch(err){
        throw new Error('Erreur lors de la mise à jour de la disponibilité de la chambre : ' + err.message);
    }
}

const findAvailableRooms = async () => {
    try {
        const rooms = await Room.find({ 
            deletedAt: null,
            'status.code': 'AVAILABLE'
        });
        return rooms;
    } catch (err) {
        throw new Error('Erreur lors de la récupération des chambres disponibles : ' + err.message);
    }
}

module.exports = { findAllNotDeleted, updateRoomAvailability, findAvailableRooms };
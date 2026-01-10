import User from "../models/User.model.js"

class DatabaseService {
    getUser(filter) {
        return User.findOne(filter);
    }
    createUser(data) {
        return User.create(data);
    }

    updateUserById(userId, updatedData) {
        return User.findByIdAndUpdate(userId, { $set: { ...updatedData } }, { new: true })
    }
}

const databaseService = new DatabaseService();

export default databaseService;
import User from "../models/User.model.js"

class DatabaseService {
    getUser(filter) {
        return User.findOne(filter);
    }
    createUser(data) {
        return User.create(data);
    }
}

const databaseService = new DatabaseService();

export default databaseService;
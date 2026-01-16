import FriendRequest from "../models/FriendRequest.model.js";
import User from "../models/User.model.js"

class DatabaseService {
    getUser(filter) {
        return User.findOne(filter);
    }
    createUser(data) {
        return User.create(data);
    }
    updateUserById(userId, filter) {
        return User.findByIdAndUpdate(userId, filter, { new: true });
    }
    getAllUsers(filter = {}) {
        return User.find(filter);
    }
    getFriendRequest(filter) {
        return FriendRequest.findOne(filter);
    }
    createFriendRequst(data) {
        return FriendRequest.create(data);
    }
    getAllFriendRequests(filter = {}) {
        return FriendRequest.find(filter);
    }
}

const databaseService = new DatabaseService();
export default databaseService;
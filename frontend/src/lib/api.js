import axiosInstance from "./axios";

export const register = async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
}

export const login = async (data) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
}

export const logout = async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
}

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        return error.response.data.success
    }
}

export const onBoardingMutationFn = async (data) => {
    const res = await axiosInstance.post("/auth/onboarding", data);
    return res.data;
}

export const getUserFriends = async () => {
    const response = await axiosInstance.get("/users/friends");
    return response.data;
}

export const getRecommendedUsers = async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
}

export const getOutgoingFriendReqs = async () => {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data;
}

export const sendFriendRequest = async (userId) => {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
}

export const getFriendRequests = async () => {
    const response = await axiosInstance.get(`/users/friend-requests/`);
    return response.data;
}

export const acceptFriendRequest = async (requestId) => {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data;
}

export const getStreamToken = async () => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
}
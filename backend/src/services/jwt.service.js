import jwt from "jsonwebtoken";

class JWTService {
    static createToken(payload, secret, options) {
        return jwt.sign(payload, secret, options);
    }
    static verifyToken(token, secret) {
        return jwt.verify(token, secret);
    }
}

export default JWTService;
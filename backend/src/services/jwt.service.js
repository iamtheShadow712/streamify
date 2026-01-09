import jwt from "jsonwebtoken";

class JWTService {
    static createToken(payload, secret, options) {
        return jwt.sign(payload, secret, options);
    }
}

export default JWTService;
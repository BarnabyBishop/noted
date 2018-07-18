import jwt from 'jsonwebtoken';

const expiryTime = 60 * 60 * 48; // 48 hours in seconds

export default (user, jwtOptions) => {
    const payload = { id: user.id };
    return jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: expiryTime });
};

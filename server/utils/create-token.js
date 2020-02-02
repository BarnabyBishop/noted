import jwt from 'jsonwebtoken';

const expiryTime = 60 * 60 * 24 * 7; // 7 days in seconds

export default (user, jwtOptions) => {
    const payload = { userId: user.id };
    return jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: expiryTime });
};

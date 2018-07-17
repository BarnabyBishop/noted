import jwt from 'jsonwebtoken';

const expiryTime = 10; // Seconds

export default (user, jwtOptions) => {
    const payload = { id: user.id };
    return jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: expiryTime });
};

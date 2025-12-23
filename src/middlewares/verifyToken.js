import jwt from 'jsonwebtoken';
import responseError from '../errors/responseError.js';

export function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        if (!token) {
            return next(new responseError('Token tidak ditemukan', 401, false));
        }
    
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                return next(new responseError('Token tidak valid', 403, false));
            }
            req.user = user;
            next();
        });
    } catch (error) {
        next(error);
    }
}

export function verifyAdmin(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return next(new responseError('Token tidak ditemukan', 401, false));
        }
    
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                return next(new responseError('Token tidak valid', 403, false));
            }
            if (user.role !== 'admin') {
                return next(new responseError('Anda tidak memiliki akses', 403, false));
            }
            req.user = user;
            next();
        });
    } catch (error) {
        next(error);
    }
}

export function verifyUser(req, res, next) {
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return next(new responseError('Token tidak ditemukan', 401, false));
        }
    
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                return next(new responseError('Token tidak valid', 403, false));
            }
            if (user.role !== 'user') {
                return next(new responseError('Anda tidak memiliki akses', 403, false));
            }
            req.user = user;
            next();
        });
    }catch(error){
        next(error);
    }
}
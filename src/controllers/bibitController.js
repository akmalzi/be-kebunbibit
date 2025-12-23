import { bibitServices } from "../services/bibitServices.js";
import responseError from "../errors/responseError.js";

async function getAllBibit(req, res, next) {
    try {
        const bibits = await bibitServices.getAllBibit();
        if(bibits.length === 0) {
            throw new responseError('Bibit tidak ditemukan', 404, false);
        } else {
            res.status(200).json({
                message: 'Bibit berhasil ditemukan',
                success: true,
                data: {
                    bibits
                }
            });
        }
    } catch (error) {
        next(error);
    }
};

async function getBibitById(req, res, next) {
    try {
        const id = req.params.id;
        const bibit = await bibitServices.getBibitById(id);
        if(!bibit) {
            throw new responseError('Bibit tidak ditemukan', 404, false);
        } else {
            res.status(200).json({
                message: 'Bibit berhasil ditemukan',
                success: true,
                data: {
                    bibit
                }
            });
        }
    } catch (error) {
        next(error);
    }
}

export const bibitController = {
    getAllBibit,
    getBibitById
}
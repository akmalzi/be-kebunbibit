import { ratingServices } from "../services/ratingServices.js";
import responseError from "../errors/responseError.js";

async function getAllRatings(req, res, next) {
    try {
        const ratings = await ratingServices.getAllRatings();
        if (!ratings) {
            throw new responseError('Rating tidak ditemukan', 404, false);
        } else {
            res.status(200).json({
                message: 'Rating berhasil ditemukan',
                success: true,
                data: {
                    ratings
                }
            });
        }
    } catch (error) {
        next(error);
    }
}

async function createRating(req, res, next) {
    try {
        const user_id = req.user.id;
        const { score, content } = req.body;

        if (!score || !content) {
            throw new responseError('Data tidak lengkap', 400, false);
        }

        const newRating = await ratingServices.createRating(user_id, score, content);

        res.status(201).json({
            message: 'Rating berhasil dibuat',
            success: true,
            data: {
                user_id: user_id,
                score: score,
                content: content
            }
        });
    } catch (error) {
        next(error);
    }
}

async function deleteRating(req, res, next) {
    try {
        const id = req.params.id;
        const user_id = req.user.id;

        if (!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }

        const result = await ratingServices.deleteRating(id, user_id);
        res.status(200).json({
            message: 'Rating berhasil dihapus',
            success: true,
            data: {
                id: id
            }
        });
    } catch (error) {
        if (error.message === 'Rating tidak ditemukan') {
            next(new responseError('Rating tidak ditemukan', 404, false));
        } else if (error.message === 'Anda tidak memiliki akses untuk menghapus rating ini') {
            next(new responseError('Anda tidak memiliki akses untuk menghapus rating ini', 403, false));
        } else {
            next(error);
        }
    }
}

export const ratingController = {
    getAllRatings,
    createRating,
    deleteRating
}
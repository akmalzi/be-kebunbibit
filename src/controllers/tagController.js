import { tagServices } from "../services/tagServices.js";
import responseError from "../errors/responseError.js";

async function getAllTags(req, res, next) {
    try {
        const tags = await tagServices.getAllTags();
        if(tags.length === 0) {
            throw new responseError('Tag tidak ditemukan', 404, false);
        } else {
            res.status(200).json({
                message: 'Tag berhasil ditemukan',
                success: true,
                data: {
                    tags
                }
            });
        }
    } catch (error) {
        next(error);
    }
}

async function getTagById(req, res, next) {
    try {
        const id = req.params;
        const tag = await tagServices.getTagById(id);
        if(!tag) {
            throw new responseError('Tag tidak ditemukan', 404, false);
        } else {
            res.status(200).json({
                message: 'Tag berhasil ditemukan',
                success: true,
                data: {
                    tag
                }
            });
        }
    } catch (error) {
        next(error);
    }
}

export const tagController = {
    getAllTags,
    getTagById
}
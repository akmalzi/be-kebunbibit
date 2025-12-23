import responseError from "../errors/responseError.js";
import { repliesServices } from "../services/repliesServices.js";
import { forumServices } from "../services/forumService.js";

async function getRepliesByForumId(req, res, next) {
    try {
        const forum_id = req.params.forum_id;
        const replies = await repliesServices.getRepliesByForumId(forum_id);

        if(replies.length === 0) {
            throw new responseError('Balasan tidak ditemukan', 404, false);
        }

        res.status(200).json({
            message: 'Balasan berhasil ditemukan',
            success: true,
            data: {
                replies
            }
        });
    } catch (error) {
        next(error);
    }
}

async function createReply(req, res, next) {
    try {
        const user_id = req.user.id;
        const { forum_id, reply } = req.body;

        if(!forum_id || !user_id || !reply) {
            throw new responseError('Data tidak lengkap', 400, false);
        }

        const forum = await forumServices.getForumById(forum_id);
        if(!forum) {
            throw new responseError('Forum tidak ditemukan', 404, false);
        }

        const newReply = await repliesServices.createReply(user_id, forum_id, reply);

        res.status(201).json({
            message: 'Balasan berhasil dibuat',
            success: true,
            data: {
                user_id: user_id,
                forum_id: forum_id,
                reply: reply
            }
        });
    } catch (error) {
        next(error);
    }
}

async function deleteReply(req, res, next) {
    try {
        const id = req.params.id;
        const user_id = req.user.id;

        if (!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }
        const result = await repliesServices.deleteReply(id, user_id);
        res.status(200).json({
            message: 'Balasan berhasil dihapus',
            success: true,
            data: {
                reply: result.reply
            }
        });
    } catch (error) {
        if (error.message === "Reply tidak ditemukan") {
            next(new responseError('Reply tidak ditemukan', 404, false));
        } else if (error.message === "Anda tidak memiliki akses") {
            next(new responseError('Anda tidak memiliki akses', 403, false));
        } else {
            next(error);
        }
    }
}

export const repliesController = {
    getRepliesByForumId,
    createReply,
    deleteReply
}
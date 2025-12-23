import responseError from "../errors/responseError.js";
import { forumServices } from "../services/forumService.js";

async function getAllForums(req, res, next) {
    try {
        const forums = await forumServices.getAllForums();
        if (!forums) {
            throw new responseError('Forum tidak ditemukan', 404, false);
        }
        res.status(200).json({
            message: 'Forum berhasil ditemukan',
            success: true,
            data: {
                forums
            }
        })
    } catch (error) {
        next(error);
    }
}

async function getForumById(req, res, next) {
    try {
        const { id } = req.params;
        const forum = await forumServices.getForumById(id);
        if (!forum) {
            throw new responseError('Forum tidak ditemukan', 404, false);
        }
        res.status(200).json({
            message: 'Forum berhasil ditemukan',
            success: true,
            data: {
                forum
            }
        });
    } catch (error) {
        next(error);
    }
}

async function createForum(req, res, next) {
    try {
        const user_id = req.user.id;
        const { title, content, tags } = req.body;

        if (!title || !content) {
            throw new responseError('Data tidak lengkap', 400, false);
        }

        const newForum = await forumServices.createForum(user_id, title, content, tags);

        res.status(201).json({
            message: 'Forum berhasil dibuat',
            success: true,
            data: {
                user_id: user_id,
                title: title,
                content: content,
                tags: newForum.tags
            },
        });

    } catch (error) {
        if (error.message === 'Tag tidak ditemukan') {
            next(new responseError('Tag tidak ditemukan', 400, false));
        } else {
            next(error);
        }
    }
}

async function deleteForum(req, res, next) {
    try {
        const id = req.params.id;
        const user_id = req.user.id;

        if (!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }
        const result = await forumServices.deleteForum(id, user_id);
        res.status(200).json({
            message: 'Forum berhasil dihapus',
            success: true,
            data: {
                forum: result.forum
            }
        });
    } catch (error) {
        if (error.message === 'Forum tidak ditemukan') {
            next(new responseError('Forum tidak ditemukan', 404, false));
        } else if (error.message === 'Anda tidak memiliki akses') {
            next(new responseError('Anda tidak memiliki akses', 403, false));
        } else {
            next(error);
        }
    }
}

export const forumController = {
    getAllForums,
    getForumById,
    createForum,
    deleteForum
}
import { userServices } from "../services/userServices.js";
import responseError from "../errors/responseError.js";

async function getUserById(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }

        const user = await userServices.getUserById(id);
        res.status(200).json({
            message: 'User berhasil ditemukan',
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        if (error.message === "User tidak ditemukan") {
            next(new responseError('User tidak ditemukan', 404, false));
        } else {
            next(error);
        }
    }
}

async function changePassword(req, res, next) {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }

        if (!oldPassword || !newPassword) {
            throw new responseError('Password salah', 400, false);
        }

        const user = await userServices.changePassword(id, oldPassword, newPassword);
        res.status(200).json({
            message: 'Password berhasil diubah',
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        if (error.message === 'User tidak ditemukan') {
            next(new responseError('User tidak ditemukan', 404, false));
        } else if (error.message === 'Password invalid') {
            next(new responseError('Password salah', 400, false));
        } else {
            next(error);
        }
    }
}

async function editProfiles(req, res, next) {
    try {
        const { id } = req.params;
        const { fname, lname, username } = req.body;
        const photo = req.file;

        if (!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }

        if (!fname || !username) {
            throw new responseError('Semua data harus diisi', 400, false);
        }

        const photoName = photo ? req.newPhotoName : null;

        const user = await userServices.editProfiles(id, fname, lname, username, photoName);

        res.status(200).json({
            message: 'Profile berhasil diubah',
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        if (error.message === 'User tidak ditemukan') {
            next(new responseError('User tidak ditemukan', 404, false));
        } else if (error.message === 'Semua data harus diisi') {
            next(new responseError('Semua data harus diisi', 400, false));
        } else if (error.code === 'ER_DUP_ENTRY') {
            next(new responseError('Username sudah digunakan', 400, false));
        } else {
            console.log(error);
            next(error);
        }
    }
}

async function deletePhoto(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new responseError('ID tidak ditemukan', 400, false);
        }

        const user = await userServices.deleteProfilePhoto(id);
        
        res.status(200).json({
            message: 'Photo berhasil dihapus',
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        if (error.message === 'User tidak ditemukan') {
            next(new responseError('User tidak ditemukan', 404, false));
        } else {
            next(error);
        }
    }
}

export const userController = {
    getUserById,
    changePassword,
    editProfiles,
    deletePhoto
}
import { pool } from "../config/configDB.js";

async function getAllForums() {
    const conn = await pool.getConnection();

    const [forums] = await conn.query(
        'SELECT f.id, CONCAT(u.fname, " ", u.lname) as fullname, u.photo, f.title, f.content, f.created_at, f.updated_at, IFNULL(COUNT(DISTINCT r.id),0) AS reply_count FROM forums f INNER JOIN users u ON f.user_id = u.id LEFT JOIN replies r ON f.id = r.forum_id GROUP BY f.id ORDER BY f.CREATED_AT DESC'
    );

    if (forums.length !== 0) {
        for (let forum of forums) {
            const [tags] = await conn.query(
                'SELECT t.id, t.slug, t.name FROM tags t INNER JOIN forum_tags ft WHERE t.id = ft.tag_id AND ft.forum_id = ?',
                [forum.id]
            );
            forum.tags = tags;
        }
    }

    pool.releaseConnection(conn);
    return forums;
}

async function getForumById(id) {
    const conn = await pool.getConnection();

    const [forum] = await conn.query(
        'SELECT f.id, CONCAT(u.fname, " ", u.lname) as fullname, u.photo, f.title, f.content, f.created_at, f.updated_at, IFNULL(COUNT(DISTINCT r.id), 0) AS reply_count FROM forums f INNER JOIN users u ON f.user_id = u.id LEFT JOIN replies r ON f.id = r.forum_id WHERE f.id = ? GROUP BY f.id',
        [id]
    );

    if (forum.length !== 0) {
        const [tags] = await conn.query(
            'SELECT t.id, t.slug, t.name FROM tags t INNER JOIN forum_tags ft WHERE t.id = ft.tag_id AND ft.forum_id = ?',
            [forum[0].id]
        );
        forum[0].tags = tags;
    }

    pool.releaseConnection(conn);
    return forum[0];
}

async function createForum(user_id, title, content, tags) {
    const conn = await pool.getConnection();

    const [result] = await conn.query(
        'INSERT INTO forums (user_id, title, content) VALUES (?, ?, ?)',
        [user_id, title, content]
    );

    if (tags.length !== 0) {
        for (let tag of tags) {
            const [tagId] = await conn.query(
                'SELECT id, name FROM tags WHERE id = ?',
                [tag]
            );

            if (tagId.length === 0) {
                throw new Error('Tag tidak ditemukan');
            }

            result.tags = tagId;
        }

        for (let tag of tags) {
            await conn.query(
                'INSERT INTO forum_tags (forum_id, tag_id) VALUES (?, ?)',
                [result.insertId, tag]
            );
        }
    }

    pool.releaseConnection(conn);
    return result;
}

async function deleteForum(id, user_id) {
    const conn = await pool.getConnection();
    const [forum] = await conn.query(
        'SELECT id, user_id FROM forums WHERE id = ?',
        [id]
    )

    if(forum.length === 0) {
        throw new Error('Forum tidak ditemukan');
    }

    if(forum[0].user_id !== user_id) {
        throw new Error('Anda tidak memiliki akses');
    }

    const [result] = await conn.query(
        'DELETE FROM forums WHERE id = ? AND user_id = ?',
        [id, user_id]
    );
    result.forum = forum[0];

    pool.releaseConnection(conn);
    return result;
}

export const forumServices = {
    getAllForums,
    getForumById,
    createForum,
    deleteForum
}
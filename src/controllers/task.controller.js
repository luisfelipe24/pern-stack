const pool = require('../postgres');

const getAlltasks = async(req, res, next) => {
    try {

        const alltasks = await pool.query('select * from libreta')
        res.json(alltasks.rows);

    } catch (error) {
        next(error);
    }

};

const gettask = async(req, res, next) => {

    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM libreta WHERE id = $1', [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Task not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createtask = async(req, res, next) => {
    const { title, description } = req.body;


    try {
        const result = await pool.query('INSERT INTO libreta (title, description) VALUES($1, $2) RETURNING *', [
            title,
            description,
        ]);
        res.json(result.rows[0]);

    } catch (error) {
        next(error);;
    }

}

const deletetask = async(req, res) => {

    try {
        const { id } = req.params

        const result = await pool.query("DELETE FROM libreta WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Task not found" });
        return res.sendStatus(204);
    } catch (error) {
        next(error);

    }
};

const updatetask = async(req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body;

        const result = await pool.query(
            "UPDATE libreta SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }

};

module.exports = {
    getAlltasks,
    gettask,
    createtask,
    deletetask,
    updatetask
}
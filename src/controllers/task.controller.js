const pool = require('../postgres');

const getAlltasks = async(req, res, next) => {
    try {

        const alltasks = await pool.query('select * from contactos')
        res.json(alltasks.rows);

    } catch (error) {
        next(error);
    }

};

const gettask = async(req, res, next) => {

    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM contactos WHERE id = $1', [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Not found" });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createtask = async(req, res, next) => {
    const { nombre, numero } = req.body;


    try {
        const result = await pool.query('INSERT INTO contactos (nombre, numero) VALUES($1, $2) RETURNING *', [
            nombre,
            numero,
        ]);
        res.json(result.rows[0]);

    } catch (error) {
        next(error);;
    }

}

const deletetask = async(req, res) => {

    try {
        const { id } = req.params

        const result = await pool.query("DELETE FROM contactos WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Not found" });
        return res.sendStatus(204);
    } catch (error) {
        next(error);

    }
};

const updatetask = async(req, res) => {
    try {
        const { id } = req.params
        const { nombre, numero } = req.body;

        const result = await pool.query(
            "UPDATE contactos SET nombre = $1, numero = $2 WHERE id = $3 RETURNING *", [nombre, numero, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Not found" });

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
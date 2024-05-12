const db = require("../db/dbConfig")

const getAllPies = async () => {
    const pies = await db.any("SELECT * FROM goodPies")
    return goodPies
}

const getPie = async (pieId) => {
    const pie = await db.oneOrNone("SELECT * FROM goodPies WHERE id=$1", [pieId])
    return pie
}

const createPie = async (body) => {
    const createdPie =  await db.oneOrNone("INSERT INTO pies (name) VALUES($1) RETURNING*", [body.name])
    return createdPie
}

const updatePie = async (body, pieId) => {
    const updatedPie = await db.oneOrNone("UPDATE goodPies SET name=$1 WHERE id=$4 RETURNING *[body.name]")
    return updatedPie
}

const deletePie = async (pieId) => {
    const deletedPie = await db.oneOrNone("DELETE FROM pies WHERE id=$1 RETURNING *", [pieId])
    return deletedPie
}
module.exports = {
    getAllPies, getPie, createPie, updatePie, deletePie
}
const pool = require('../db');

toDoItemsController = {};

toDoItemsController.getItems = async (req, res, next) => {
  try {
      const data = await pool.query(`SELECT * FROM "toDoApp" order by created_at`);
      console.log(JSON.stringify(data));
      res.locals.data = data.rows;
    }
  catch(err){
      return next(err);
  }
  return next();

  /**
   * pool.query('select * from "toDoApp"')
   *  .then((data) => data.rows)
   *  .then(data => {res.locals.data = data})
   *  .finally(() => next())
   *  .catch(e => next(e));
   * 
   * // return next();
   */
}

toDoItemsController.addItem = async (req, res, next) => {
    if(!req.body.item){
     return res.json(`Nothing to add.`);
    }
    const query = {
        text: `INSERT INTO "toDoApp"(item_description) 
        VALUES($1) RETURNING *`,
        values: [req.body.item]
    }
    try {
        const item = await pool.query(query);
        res.locals.items = item.rows[0];
        console.log(`item is ${JSON.stringify(res.locals.items)}`);
    }
    catch(err){
        return next(err);
    }
    return next();
}

toDoItemsController.updateStatus = async (req, res, next) => {
    if(!req.body.item){
     return res.json(`Nothing to update.`);
    }
    const query = {
        text: `UPDATE "toDoApp" SET 
        status = 'completed'
        WHERE item_description = $1`,
        values: [req.body.item]
    }
    try {
        await pool.query(query);
    }
    catch(err){
        return next(err);
    }
    console.log('Item is updated')
    return next();
}

module.exports = toDoItemsController;
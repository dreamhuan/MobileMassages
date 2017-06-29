const testSQL = {
    queryAll: 'SELECT * FROM todo',
    getById: 'SELECT * FROM todo WHERE id = ? ',
    insert: 'INSERT INTO todo(content) VALUES(?)',
    delete: 'DELETE FROM todo WHERE id = ? ',
    updateById: 'UPDATE todo SET content = ? where id = ?',

};
module.exports = testSQL;
'use strict';

const MySqlUtil = {
  async save(mysql, tableName, obj) {
    const firstById = await mysql.get(tableName, {
      id: obj.id,
    });
    if (firstById === null) {
      return await mysql.insert(tableName, obj);
    }
    return await mysql.update(tableName, obj);

  },
};

module.exports = MySqlUtil;

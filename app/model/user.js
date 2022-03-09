// app / model / user.js

'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;
  // 配置（重要：一定要配置详细，一定要！！！）
  const User = app.model.define('user', {
    id: { type: INTEGER(20).UNSIGNED, primaryKey: true, autoIncrement: true },
    username: { type: STRING(30), allowNull: false, defaultValue: '', comment: '用户名称', unique: true },
    password: {
      type: STRING(200),
      allowNull: false,
      defaultValue: '',
      // 修改器 可以很方便的处理数据
      set(val) {
        const hash = val + '123456';
        this.setDataValue('password', hash);
      },
    },
    avatar_url: { type: STRING(200), allowNull: true, defaultValue: '' },
    sex: { type: ENUM, values: [ '男', '女', '保密' ], allowNull: true, defaultValue: '男', comment: '用户性别' },
    created_at: DATE,
    updated_at: DATE,
  }, {
    timestamps: true, // 是否自动写入时间戳
    tableName: 'user', // 自定义数据表名称
  });

  return User;
};
// https://blog.csdn.net/ab15176142633/article/details/120064660

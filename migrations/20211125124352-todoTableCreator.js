'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('todos', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    user_id: {
      type: 'int',
      notNull: true
    },
    title: {
      type: 'string',
      notNull: true
    },
    content: {
      type: 'string',
      notNull: true
    },
    createdAt: {
      type: 'datetime',
      notNull: false
    },
    updatedAt: {
      type: 'datetime',
      notNull: false
    },
    deletedAt: {
      type: 'datetime',
      notNull: false
    }
  });
};

exports.down = function(db) {
  return db.dropTable('todos');
};

exports._meta = {
  "version": 1
};

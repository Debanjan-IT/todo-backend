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
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    fullname: {
      type: 'string',
      notNull: true
    },
    email: {
      type: 'string',
      notNull: true
    },
    password: {
      type: 'string',
      notNull: true
    },
    status: {
      type: 'string',
      notNull: true,
      default: "PENDING"
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
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};

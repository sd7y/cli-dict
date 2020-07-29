#!/usr/bin/env bash

RESULT=1
while [ $RESULT -ne 0 ] ; do
    echo "mongodb has not started yet, trying again in 3 sec..."
    sleep 3
    mongo --eval "db.stats()"
    RESULT=$?
done

echo "Mongo is up"

sleep 1


# javascript does not support environment variable, so we had to create js first
echo "
var conn = new Mongo();
var db = conn.getDB('admin');

if(db.getUsers().length==0){

var adminUser = '$MONGO_ADMIN_USER';
var adminPass = '$MONGO_ADMIN_PASS';

db.createUser(
    {
        user: adminUser,
        pwd: adminPass,
        roles: [{role: 'userAdminAnyDatabase', db: 'admin'}, {role: 'readWriteAnyDatabase', db: 'admin'}, {role: 'dbAdminAnyDatabase', db: 'admin'}, {role: 'clusterAdmin', db: 'admin'}, {role: 'clusterMonitor', db: 'admin'}]
    }
);

db.auth(adminUser, adminPass);

var user = '$MONGO_USER';
var pass = '$MONGO_PASS';

db.createUser(
    {
        user: user,
        pwd: pass,
        roles: [{role: 'readWriteAnyDatabase', db: 'admin'}]
    }
);
}
" > init-user.js

mongo init-user.js
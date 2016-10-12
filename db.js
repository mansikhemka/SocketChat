/**
 * Created by mansikhemka on 12/10/16.
 */

const mysql = require('mysql');

var getConnection = ()=>
{
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'finley',
        password: 'some_pass',
        database: 'newdatabase'
    })
    connection.connect();
    return connection;
}

module.exports ={
    save: (name, message, cb)=>{
        let connection = getConnection();

        let queryS='INSERT INTO chat (user, message) VALUES("'+name+'","'+message+'")'
        connection.query(queryS, (data)=>{
            cb(data);
        })

},
    show: (cb)=>{
        let connection = getConnection();

        let queryS='select * from chat';
        connection.query(queryS, (err, results, fields)=>{
            if(err) throw err;
            cb(results);
            console.log(results);
        })
}
}
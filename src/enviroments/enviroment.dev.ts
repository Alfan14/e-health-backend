export const environment = {
    secretKey: "secretKey_WHICH_NEED_TO_BE_CHANGED_HA(88sdv5T@b9m<f2u+4M",
    database: {
        "host": "localhost",
        "port": process.env.DB_PORT,
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "synchronize": true
    }
};
// const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Clothes = sequelize.define('Clothes', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Clothes;
};

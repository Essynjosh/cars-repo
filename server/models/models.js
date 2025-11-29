const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("essy", "root", "1234", {
    host: "localhost",
    dialect: "mysql"
})

const Driver = sequelize.define("Driver", {
    name: { type: DataTypes.STRING, allowNull: false },
    id_no: { type: DataTypes.STRING, allowNull: false },
    car_number: { type: DataTypes.STRING, allowNull: false },
    departure_time: { type: DataTypes.DATE, allowNull: false },
    arrival_time: { type: DataTypes.DATE, allowNull: false },
    fuel_in_litres: { type: DataTypes.FLOAT, allowNull: false },
    price_per_litre: { type: DataTypes.FLOAT, allowNull: false },
    total_cost: { type: DataTypes.FLOAT, allowNull: false }
}, {
    tableName: "drivers",
    timestamps: true
})

module.exports = { sequelize, Driver }

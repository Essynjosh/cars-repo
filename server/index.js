const express = require("express")
const cors = require("cors")
const { sequelize, Driver } = require("./models/models")

const app = express()
app.use(cors())
app.use(express.json())

// Test route
app.get("/", (req, res) => res.send("Server running"))

// GET all drivers
app.get("/drivers", async (req, res) => {
    try {
        const drivers = await Driver.findAll()
        res.json(drivers)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

// POST a new driver
app.post("/drivers", async (req, res) => {
    try {
        const {
            name,
            id_no,
            car_number,
            departure_time,
            arrival_time,
            fuel_in_litres,
            price_per_litre
        } = req.body

        const total_cost = fuel_in_litres * price_per_litre

        const driver = await Driver.create({
            name,
            id_no,
            car_number,
            departure_time,
            arrival_time,
            fuel_in_litres,
            price_per_litre,
            total_cost
        })

        res.status(201).json(driver)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

// Sync database and start server
const PORT = 3004
sequelize.sync()  // This auto-creates the table if it doesn't exist
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch(err => console.error("Unable to connect to DB:", err))

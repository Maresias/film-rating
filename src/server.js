require("dotenv/config")
require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./Utils/AppError")
const express = require("express")

const routes = require("./routes")
const cors = require("cors")

const uploadConfig = require("./configs/upload")

migrationsRun()

const app = express()
app.use(cors())
app.use(express.json())


app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)



app.use((error, request, response, next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = process.env.SERVER_PORT || 3333
app.listen(PORT, ( ) => console.log(`Server is running on PORT ${PORT}`))
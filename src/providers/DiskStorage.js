const fs = require("fs")
const path = require("path")
const uploadsConfig = require("../configs/upload")

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(uploadsConfig.TMP_FOLDER, file),
            path.resolve(uploadsConfig.UPLOADS_FOLDER, file)
        )

        return file
    }

    
}

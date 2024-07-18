const knex = require("../database/knex")
const AppError = require("../Utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
    async update(request, response){
        const user_id = request.user.id 
        const avatarFileName = request.file.filename 

        const diskStorage = new DiskStorage()

        const user = await knex("users")
        .where({id: user_id}).first()
        
        if (!user) {
            throw new AppError("Somente usuários autenticados podem mudar a avatar")
        }

        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFileName)

        user.avatar = filename

        await knex("users").update(user).where({id: user_id})

        return response.json(user)
    }
}

module.exports = UserAvatarController
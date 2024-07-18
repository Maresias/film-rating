const knex = require("../database/knex")
const AppError = require("../Utils/AppError")

class UserAvatarController {
    async update(request, response){
        const user_id = request.user.id 
        const avatarFileName = request.file.filename 

        const user = await knex("users")
        .where({id: user_id}).first()
        
        if (!user) {
            throw new AppError("Somente usuários autenticados podem mudar a avatar")
        }

        if (user.avatar) {
            
        }
    }
}
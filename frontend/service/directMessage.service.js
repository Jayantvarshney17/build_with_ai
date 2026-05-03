import axios from "axios"



export class directMessageService{
    constructor(){
        this.instance = axios.create({
            baseURL: 'https://yolo-backend-q3lv.onrender.com/api/v1/directMessage'
        })
    }


    async addPeople(username,ownerId){
        try {
             const result = await this.instance.post('/addPeople',{username:username,ownerId:ownerId})
             return result
        } catch (error) {
            console.log(error)
        }
    }

    
    async getDmPeople(ownerId){
        try {
             const result = await this.instance.get('/getDmPeople',{
                params: { ownerId: ownerId }
             })
             return result
        } catch (error) {
            console.log(error)
        }
    }
}

const service = new directMessageService()

export default service

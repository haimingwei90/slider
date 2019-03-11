const {Actor} = require("cqrs");
module.exports = class User extends Actor{
    constructor(data){
        const {loginname,password,comfir,email} = data;
        super({ loginname, password,comfir, email,mark:0 });
    }
    puls(num){
        this.$({num:num})
    }
    get updater(){
        return{
            puls(data,event){
               const num = event.data.num
                data.mark = data.mark+num;
                return data.mark;
            }
        }
    }

}
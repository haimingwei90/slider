const {Actor} = require('cqrs');
module.exports = class Page extends Actor{
    constructor(data){
        const {title,content} = data;
        super({title,content});  
    }
    change({title,content}){
        this.$({title,content})
    }
    get updater(){
        return{
            change(json,event){
                const {title,content} = event.data;      
                return {title:title,content:content}
            }
        }
    }
}
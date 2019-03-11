const { Actor } = require("cqrs");
const Page = require("./Page");
module.exports = class Slider extends Actor {
    // static async beforeCreate(data,domain){
    //     const {name,authorId} = data;
    //     if(name&&name.length<25&&name.length>2){

    //     }else{
    //         throw({nameErr:"name errror!"})
    //     }
    //     const author = await domain.get("User",authorId);
    //     author.plus(10);
    // }
    constructor(data) {
        const { name, des ,authorId } = data;
        
        super({ name, des,authorId, pageidArr:[] });
    }
    // static   async  create(slider,domain){
    //     const author = await domain.get("User", slider.json.authorId);
    //     author.plus(10);
    // }

    change(name, des) {
        this.service.apply('change', { name, des });
    }
    async addPage(title, content) {
        const page = await this.$.create("Page", { title, content })
        this.$({ pageid: page.id });
        return page.id;
    }
    async delPage(pageid) {
        const page = await this.$.get("Page", pageid);
        page.remove();
        this.$({ pageid: page.id });
    }
   async movePage(pageid,index) {
        this.$({pageid,index })
    }
    async upPage(pageid) {
        
        this.$({pageid});
    }
    async downPage(pageid) {
        this.$({pageid})
    }
    get updater() {
        return {
            change(data, event) {
                const { name, des } = event.data;
                return { name, des }
            },
            addPage(data, event) {
                data.pageidArr.push(event.data.pageid);
             
                return data.pageidArr
            },
            delPage(data, event) {
                const index = data.pageidArr.indexOf(event.data.pageid);
                data.pageidArr.splice(index, 1);
                return data.pageidArr;
            },
            movePage(data,event){
                const {pageid,index} = event.data;
                const pageidArr = data.pageidArr;
                const pageidindex = pageidArr.indexOf(pageid);
                pageidArr.splice(pageidindex,1);
                pageidArr.splice(index-1,0,pageid);
                return pageidArr;
            },
            upPage(data,event){
                const pageid = event.data.pageid;
                const pageidArr = data.pageidArr;
                const index = pageidArr.indexOf(pageid);
                console.log(index);
                
                pageidArr.splice(index,1);
                pageidArr.splice(index-1,0,pageid);
                return pageidArr;
            },
            downPage(data,event){
                const pageid = event.data.pageid;
                const pageidArr = data.pageidArr;
                const index = pageidArr.indexOf(pageid);
                pageidArr.splice(index, 1);
                pageidArr.splice(index+1, 0, pageid);
                return pageidArr;
            }
           

        }
    }
}
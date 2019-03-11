const { Domain } = require('cqrs');
const domain = new Domain();
const Slider = require("./actors/Slider");
const Page = require("./actors/Page.js");
const User = require("./actors/User");
domain.register([Slider,Page,User]);

async function run() {
    const slider = await domain.create("Slider", { name: "leo", des: "hhhhh" });
    const pid = await slider.addPage("aaa", "asldkj");
    const pid2 = await slider.addPage("aaa", "asldkj");
    const pid3 = await slider.addPage("aaa", "asldkj");
    // await slider.delPage(pid);
    // await slider.movePage(pid3,1);
    domain.on({actorType:"Slider",type:"create"},async function(event){
        const author = await domain.get("User", event.data.authorId);
        author.plus(10);
    });
    
    
    // console.log(slider.json.pageidArr);
    // await slider.upPage(pid2);
    // console.log(slider.json.pageidArr);
}
run();
import removeBackground from "@imgly/background-removal-node";
import fs from "fs"
import path from "path";
export async function freePublic(){
    const files=  fs.readdirSync('./public')
    for(const file of files){
      const filePath=path.join('./public',file)
     fs.unlinkSync(filePath);
    }
   console.log('public directory freed')
}

const removeBg=async(path:string)=>{
 const blob= await removeBackground(path);
 const buffer= Buffer.from(await blob.arrayBuffer());
 const dataURL=`data:image/png;base64,${buffer.toString("base64")}`
 return dataURL;
}
export default removeBg;



let base64Code="";
const getBase64=(file, cb)=>{
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
      cb(reader.result)
  };
  reader.onerror = function (error) {
      console.log('Error: ', error);
  };
}
const sample=async()=>{
    const base64code=await getBase64("hihihihiihijkhijkhjhh");
   console.log('second');
}
sample();

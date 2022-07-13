function renameFile(name){
    arr = name.split(/.jpg/).join('').split(" ")
    tmp = "";
    for(let item in arr){
      if(arr[item] != ""){
        tmp += arr[item][0];
      }
    }
    return tmp.toUpperCase() + "-" + Date.now() + ".jpg";
  }

module.exports = { renameFile }
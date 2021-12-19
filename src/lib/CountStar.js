
const countStar = (cmt)=>{
    let sum = 0;
    if (cmt.length===0) {
      return 0.0;
    }
    for (let index = 0; index <cmt.length;index++){
      sum+=cmt[index].star;
    }
    let s = Math.round(sum/cmt.length * 10) / 10;
    var fixedNum = parseFloat(s).toFixed(1);
    return fixedNum;
   
}

export default countStar;

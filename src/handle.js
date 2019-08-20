exports.slice4 = (num,issub=false)=>{
    if(num==''){
        return
    }
    let isNegative = ''
    if(num.includes('-')){
        isNegative = '-';
        num = num.replace('-','')
    }

    let arrNum = num.split('.');
    let before = {}
    let after={}
    let beforePoint = arrNum[0]||''
    let afterPoint = arrNum[1]||''
    
    if(issub){
        for(let i =beforePoint.length,j=0;i>0;i=i-4,j++){
            let sIndex = i-4;
            before[j] = isNegative+ beforePoint.slice((sIndex>0?sIndex:0),i)
            before.max = j;
        }
        for(let i =0,j=0;i<afterPoint.length;i=i+4,j++){
            after[j] = isNegative+(afterPoint.slice(i,i+4)).padEnd(4,'0')
            after.max = j;
        }
        
    }else{
        for(let i =beforePoint.length,j=0;i>0;i=i-4,j++){
            let sIndex = i-4;
            before[j] = isNegative+beforePoint.slice((sIndex>0?sIndex:0),i)
            before.max = j;
        }
        for(let i =0,j=0;i<afterPoint.length;i=i+4,j++){
            after[j] = isNegative+(afterPoint.slice(i,i+4)).padEnd(4,'0')
            after.max = j;
        }
    }
    if(after.max === undefined){
        after.max=-1
    }
    return {before,after,isNegative}
}

const removeLeft = (a,remove='0')=>{
    if(a[0] === remove){
        if(!(remove==='0' && a[1] === '.')){
            a=a.slice(1);
            return removeLeft(a,remove)
        }
    }
    return a
}
exports.removeLeft = removeLeft


const removeRight = (a,remove='0')=>{
    if(a.slice(-1) === remove){
        a=a.slice(0,-1);
        return removeRight(a,remove)
    }
    return a
}
exports.removeRight = removeRight
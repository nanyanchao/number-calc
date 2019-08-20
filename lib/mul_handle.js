let {slice4,removeLeft,removeRight} =require('./handle')
let {addNum} = require('./add_handle')

exports.mul = (a,b)=>{
    return Number(a) * Number(b)
}

exports.foreachMul=(numObj1,numObj2)=>{
    let before = {};
    let {before :before1} = numObj1;
    let {before:before2} = numObj2;
    for(let i=0;;i++){
        if(before1[i]===undefined){
            break
        }
        for(let j=0;;j++){
            if(before2[j]===undefined){
                break
            }
            if(!before[i]){
                before[i]={}
            }
            before[i][j] = this.mul(before1[i],before2[j])
            before.max = j;
        }
    }
    return {before};
}

exports.mulNum=(a,b,len=15)=>{
    a=a+''; b=b+'';
    if(!(a.includes('.') || b.includes('.')) && (a+b).length<11){
        return this.mul(a,b)
    }
    let aPoint = a.indexOf('.');
    let bPoint = b.indexOf('.');

    let pointCount = 0;
    if(aPoint===-1){
        aPoint = a.length;
        
    }else{
        pointCount++
    }
    if(bPoint===-1){
        bPoint = b.length;
        
    }else{
        pointCount++
    }
    
    let resultPoinIndex = aPoint + bPoint;

    
    let aLastPint = a.length - aPoint
    let bLastPint = b.length - bPoint

    let pointAfter = bLastPint + aLastPint;
    
    let isNegative = ''
    if((a.includes('-') && !b.includes('-')) || (!a.includes('-') && b.includes('-'))){
        isNegative = '-'
    }
    a = removeLeft(a,'-')
    b = removeLeft(b,'-')

    let objNumA = slice4(a.replace('.',''));
    let objNumB = slice4(b.replace('.',''));
    let {before} = this.foreachMul(objNumA,objNumB)
    let carry = 0;
    let last0 = [];
    let result = '0'
    for(let i=0;;i++){
        if(before[i]===undefined){
            break;
        }
        carry = 0;
        let sliCarry = ''
        for(let j=0;;j++){
            if(before[i][j]===undefined){
                break;
            }

            let strNum = Number(before[i][j]||0) + carry+ ''
            if(before.max === Number(j)){
                sliCarry = strNum + sliCarry
            }else{
                sliCarry = strNum.slice(-4).padStart(4,'0') + sliCarry;
                carry = Number(strNum.slice(0,-4)||0)
            }
        }
        result=addNum(result,sliCarry+last0.join(''))+''
        last0.push('0000')
    }

    if(result.length < resultPoinIndex+pointAfter-2){
        result = result.padStart(resultPoinIndex+pointAfter-pointCount,'0')
    }
    
    let aNum = result.slice(-pointAfter+pointCount)||'';
    if(pointAfter>0 && aNum !== ''){
        aNum = '.' + aNum
    }
    result = result.slice(0,-pointAfter+pointCount) + aNum;

    return isNegative+removeLeft(removeRight(result.slice(0,result.indexOf('.')+len+1),'.'))
}



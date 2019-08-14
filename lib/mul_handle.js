let {slice4} =require('./handle')
let {addNum} = require('./add_handle')

exports.mul = (a,b)=>{
    return Number(a) * Number(b)
}

exports.foreachMul=(numObj1,numObj2)=>{
    let before = {};
    let {before :before1} = numObj1;
    let {before:before2} = numObj2;
    for(let i=0;;i++){
        if(!before1[i]){
            break
        }
        for(let j=0;;j++){
            if(!before2[j]){
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

    if(aPoint===-1){
        aPoint = a.length;
    }
    if(bPoint===-1){
        bPoint = b.length;
    }
    
    let resultPoinIndex = aPoint + bPoint;

    
    let aLastPint = a.length - aPoint-1
    let bLastPint = b.length - bPoint-1

    let pointAfter = bLastPint + aLastPint;
    
    let objNumA = slice4(a.replace('.',''));
    let objNumB = slice4(b.replace('.',''));
    let {before} = this.foreachMul(objNumA,objNumB)
    
    let carry = 0;
    let last0 = [];
    let result = '0'
    for(let i=0;;i++){
        if(!before[i]){
            break;
        }
        carry = 0;
        let sliCarry = ''
        for(let j=0;;j++){
            if(!before[i][j]){
                break;
            }

            let strNum = Number(before[i][j]||0) + carry+ ''
            if(before.max === j){
                sliCarry = strNum + sliCarry
            }else{
                sliCarry = strNum.slice(-4) + sliCarry;
                carry = Number(strNum.slice(0,-4)||0)
            }
        }
        
        result=addNum(result,sliCarry+last0.join(''))+''
        last0.push('0000')
    }
    let aNum='';
    if(result.length < resultPoinIndex+pointAfter-1){
        result = result.padStart(resultPoinIndex+pointAfter-1,'0')
        let aNum = result.slice(1)||'';
        if(aNum){
            aNum = '.' + aNum
        }
        result = result.slice(0,1) + aNum;
    }
    else{
        if(resultPoinIndex > result.length){
            let aNum = result.slice(pointAfter+1)||'';
            if(aNum){
                aNum = '.' + aNum
            }
            result = result.slice(0,pointAfter+1) + aNum;
        }else{
            let aNum = result.slice(resultPoinIndex)||'';
            if(aNum){
                aNum = '.' + aNum
            }
            result = result.slice(0,resultPoinIndex) + aNum;
        }
        
    }

    return result.slice(0,result.indexOf('.')+len+1)
}



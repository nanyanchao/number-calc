let {removeLeft,removeRight} =require('./handle')
let {subNum} = require('./sub_handle')

const sub =(a,b)=>{
    if(Number(a)<Number(b)){
        return {quotient:0,remainder:a+''};
    }
    let result = sub(subNum(a,b),b)
    return {quotient:result.quotient+1,remainder:result.remainder}
}

let point = 0;
const div=(a,b,remainder,len,result)=>{
    if(len<0){
        return;
    }
    if(remainder.includes('-') && result[0] !== '-'){
        result.unshift('-')
    }
    remainder = remainder.replace('-','')
    if(Number(b)=== 0){
        return 0;
    }
    if(result.length === 0){
        point = 0;
    }
    let dividend = '';
    if(remainder.length < b.length){
        dividend = remainder + (a.slice(0,1)||'');
        if(a!==''){
            a = a.slice(1)
            result.push("0")
        }
    }
    else{
        dividend = remainder;
    }
    
    let quotientRemainder = sub(dividend,b)
    result.push(quotientRemainder.quotient)

    if(!a && point===0){
        result.push('.')
        point = 1;
    }
    if(point===1){
        div(a.slice(1),b,quotientRemainder.remainder+(a.slice(0,1)||'0'),len-1,result)
    }else{
        div(a.slice(1),b,quotientRemainder.remainder+(a.slice(0,1)||'0'),len,result)
    }
}

const removeRight0=(a,b)=>{
    if(a.slice(-1) === b.slice(-1) && a.slice(-1) === '0'){
       return removeRight0(a.slice(0,-1),b.slice(0,-1))
    }
    return [a,b]
}

exports.divNum=(a,b,len=15)=>{
    a=a+''; b=b+'';
    let pointLastIndexOf = -1;
    let aArr = a.split('.')
    let aBefore = aArr[0];
    let aAfter = aArr[1]||''
    let aLastIndexOf = aAfter.length;
    pointLastIndexOf = aLastIndexOf
       
    let bArr = b.split('.')
    let bBefore = bArr[0];
    let bAfter = bArr[1]||''


    let bLastIndexOf = bAfter.length
    if(pointLastIndexOf<bLastIndexOf){
        pointLastIndexOf = bLastIndexOf
    } 
    
     a = removeLeft(aBefore + (aAfter.padEnd(pointLastIndexOf,'0')))
     b = removeLeft(bBefore + (bAfter.padEnd(pointLastIndexOf,'0')))
    let ab = removeRight0(a,b)
    a = ab[0]||"0";
    b = ab[1]||"0";
    if(a==="0"){
        return "0"
    }
    if(b ==="0"){
        return;
    }
    let isNegative = ''
    if((a.includes('-') && !b.includes('-')) || (!a.includes('-') && b.includes('-'))){
        isNegative = '-'
    }
    let result=[]
    a = removeLeft(a,'-')
    b = removeLeft(b,'-')
    div(a.slice(b.length),b,a.slice(0,b.length),len,result)
    return isNegative+removeLeft(removeRight(result.join(''),'.'))
}
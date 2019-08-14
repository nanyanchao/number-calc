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
    if(Number(b)=== 0){
        return 0;
    }
    if(result.length === 0){
        point = 0;
    }
    let dividend = '';
    if(remainder.length < b.length){
        dividend = remainder + (a.slice(0,1)||'');
        if(a){
            a = a.slice(1)
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

exports.divNum=(a,b,len=15)=>{
    a=a+''; b=b+'';
    let pointLastIndexOf = -1;
    let aBefore = a;
    let aAfter = ""
    if(a.includes('.')){
       let aLastIndexOf = a.length - a.indexOf('.') - 1
        pointLastIndexOf = aLastIndexOf
        aBefore = a.slice(0,-aLastIndexOf-1);
        aAfter = a.slice(-aLastIndexOf)
    }

    let bBefore = b;
    let bAfter = ""
    if(b.includes('.')){
        let bLastIndexOf = b.length - b.indexOf('.') - 1
        if(pointLastIndexOf<bLastIndexOf){
         pointLastIndexOf = bLastIndexOf
        } 
         bBefore = b.slice(0,-bLastIndexOf-1);
         bAfter = b.slice(-bLastIndexOf)
    }
     a = removeLeft(aBefore + (aAfter.padEnd(pointLastIndexOf,'0')))
     b = removeLeft(bBefore + (bAfter.padEnd(pointLastIndexOf,'0')))


    let isNegative = ''
    if(!(a.includes('-') && b.includes('-')) || !(!a.includes('-') && !b.includes('-'))){
        isNegative = '-'
    }
    let result=[]
    div(a.slice(b.length),b,a.slice(0,b.length),len,result)
    return removeRight(result.join(''),'.')
    

}
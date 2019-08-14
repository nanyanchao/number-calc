let {slice4,removeLeft} =require('./handle')

exports.add = (a,b)=>{
    return Number(a) + Number(b)
}

exports.foreachAdd=(numObj1,numObj2)=>{
    let result = {};
    if(numObj1.max < numObj2.max){
        for(let i in numObj2){
            if(i !== 'max'){
                if(numObj2.max === Number(i)){
                    let sum = this.add(numObj1[i]||'0',numObj2[i])
                    if(sum<0){
                        result[i]= '-'+(Math.abs(sum)+'').padStart(numObj2[i].length,'0')
                    }else{
                        result[i]= (sum+'').padStart(numObj2[i].length,'0')
                    }
                }else{
                    result[i]=this.add(numObj1[i]||'0',numObj2[i]) 
                }
            }
            else{
                result.max = numObj2.max;
            }
        }
    }else{
        for(let i in numObj1){
            if(i !== 'max'){
                if(numObj1.max === Number(i)){
                    let sum = this.add(numObj1[i],numObj2[i]||'0') 
                    if(sum<0){
                        result[i]= '-'+(Math.abs(sum)+'').padStart(numObj1[i].length,'0')
                    }else{
                        result[i]= (sum+'').padStart(numObj1[i].length,'0')
                    }
                }else{
                    result[i]=this.add(numObj1[i],numObj2[i]||'0') 
                }
            }
            else{
                result.max = numObj1.max;
            }
        }
    }
    return result;
}



exports.addNum=(a,b,len=15)=>{
    if(!(a.includes('.') || b.includes('.')) && (a+b).length<11){
        return this.add(a,b)
    }
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
     a = aBefore + (aAfter.padEnd(pointLastIndexOf,'0'))
     b = bBefore + (bAfter.padEnd(pointLastIndexOf,'0'))


    let isNegative = ''
    if(a.includes('-') && b.includes('-')){
        a = a.replace('-','')
        b = b.replace('-','')
        isNegative = '-'
    }

    let objNumA = slice4(a);
    let objNumB = slice4(b);
    let before = this.foreachAdd(objNumA.before,objNumB.before)
    let beforeP = ''
    let carry = 0

    for(let i = 0;i<=before.max;i++){
        let sli4 = Number(before[i]);
        if(carry === 0){
            sli4 = before[i];
        }else{
            sli4 = sli4 + carry;
        }
        if(sli4 > 9999){
            let strSli4 = sli4+'';
            carry = Number(strSli4.slice(0,1));
            beforeP = strSli4.slice(1) + beforeP;
        }else{
            carry= 0;
            let strSli4 = sli4+'';
            if(strSli4.includes('-')){
                isNegative = '-'
            }
            if(i !=before.max){
                beforeP = strSli4.replace('-','').padStart(4,'0') + beforeP;
            }else{
                beforeP = strSli4 + beforeP;
            }
        }
    }

    
    if(beforeP.length > pointLastIndexOf){
        let pointIndex = beforeP.length-pointLastIndexOf;
        let reusltBefore = beforeP.slice(0,pointIndex-1)
        let reusltAfter =  beforeP.slice(pointIndex)
        if(reusltBefore.includes('-')){
            isNegative = '-';
            reusltBefore = reusltBefore.replace('-','')
        }
        reusltBefore = removeLeft(reusltBefore)
        return isNegative +(reusltBefore||'0') + (reusltAfter? "." :'') + reusltAfter.slice(0,len)
    }else{
        return isNegative +'0.' + (beforeP.padStart(pointLastIndexOf,'0')).slice(0,len)
    }
}


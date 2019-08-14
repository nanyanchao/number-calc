let {slice4} =require('./handle')


exports.mul = (a,b)=>{
    return Number(a) * Number(b)
}

exports.foreachMul=(numObj1,numObj2)=>{
    let before = {};
    let after = {};
    let {before :before1,after:after1} = numObj1;
    let {before:before2,after:after2} = numObj2;
    let beforeAfter = {}
    for(let i=0;;i++){
        if(!before1[i]){
            break
        }
        for(let j=0;;j++){
            if(!before2[j]){
                break
            }
            before[i] = this.mul(before1[i],before2[j])
            before.max = i;
        }
        for(let j=0;;j++){
            if(after2.max<0 || after2.max - j < 0){
                break
            }
            if(!beforeAfter[i]){
                beforeAfter[i] = {}
            }
            beforeAfter[i][j] =(beforeAfter[i][j]||0) + this.mul(before1[i],after2[j])
        }
    }

    for(let i=0;;i++){
        if(!after1[i]){
            break
        }
        for(let j=0;;j++){
            if(!before2[j]){
                break
            }
            if(!beforeAfter[i]){
                beforeAfter[i] = {}
            }
            beforeAfter[i][j] = (beforeAfter[i][j]||0) + this.mul(after1[i],before2[j])
        }
        for(let j=0;;j++){
            if(after2.max<0 || after2.max - j < 0){
                break
            }
            let key = i+j

            after[key] = (after[key]||0)+ this.mul(after1[i],after2[j])
            
            after.max = i;
        }
    }

    return {before,beforeAfter,after};
}

exports.mulNum=(a,b,len=15)=>{
    if(!(a.includes('.') || b.includes('.')) && (a+b).length<11){
        return this.mul(a,b)
    }
    let objNumA = slice4(a);
    let objNumB = slice4(b);
    let {before,beforeAfter,after} = this.foreachMul(objNumA,objNumB)
    let beforeP = ''
    let afterP = ''


    for(let i =0;;i++){
        if(!beforeAfter[i]){
            break;
        }
        for(let j=0;;j++){
            if(!beforeAfter[i][j]){
                break;
            }
            let strNum = beforeAfter[i][j]+'';
            let key = i+j;
            if(key===0){
                let strNum = beforeAfter[i][j]+'';
                let strNumAfter = (strNum.slice(-4)||'0').padEnd(8,'0')
                before[i] = (before[i]||0) + Number(strNum.slice(0,-4)||'0')
                after[j+1] = (after[j+1]||0) + Number(strNumAfter)
            }
            else{
                let strNum = beforeAfter[i][j]+'';
                after[0] = ((after[0]||0) + Number(beforeAfter[i][j]) +'').padEnd(8,'0')
            }
        }
    }
    let carry = 0
    for(let i = after.max;i>-1;i--){
        let sli4 = after[i];
        sli4 = sli4 + carry;
        if(sli4 > 99999999){
            let strSli4 = sli4+'';
            carry = Number(strSli4.slice(0,-8));
            afterP = strSli4.slice(-8) + afterP;
        }else{
            carry= 0;
            let strSli4 = sli4+'';
            if(i!=after.max){
                afterP = strSli4 + afterP;
            }else{
                afterP = strSli4.padStart(8,'0') + afterP;
            }
        }
    }

    
    for(let i = 0;i<= before.max;i++){
        let sli4 = before[i];
        
        sli4 = sli4 + carry;
        if(sli4 > 9999){
            let strSli4 = sli4+'';
            carry = Number(strSli4.slice(0,-4));
            beforeP = strSli4.slice(-4) + beforeP;
        }else{
            carry= 0;
            let strSli4 = sli4+'';
            if(i !=0){
                beforeP = strSli4.padStart(4,'0') + beforeP;
            }else{
                beforeP = strSli4 + beforeP;
            }
        }
    }

    return beforeP + (afterP? "." :'')+afterP.slice(0,len)

}



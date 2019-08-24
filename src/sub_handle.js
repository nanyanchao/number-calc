let {addNum} =require('./add_handle')

const sub = (a,b)=>{
    return Number(a) - Number(b)+''
}
exports.sub = sub
exports.subNum=(a,b)=>{
    a=a+''
    b=b+''
    if(!(a.includes('.') || b.includes('.')) && (a+b).length<11){
        return sub(a,b) + ''
    }
    if(b.includes('-')){
        return addNum(a,b.replace('-',''))
    }else{
        return addNum(a,"-" + b)
    }
}


let {addNum} = require('./add_handle')
let {divNum} = require('./div_handle')
let {mulNum} = require('./mul_handle')
let {subNum} = require('./sub_handle')


export default {
    //addition
    add:(a,b,len)=>addNum(a,b,len),
    //subtraction
    sub:(a,b,len)=>subNum(a,b,len),
    //multiplication
    mul:(a,b,len)=>mulNum(a,b,len),
    //division
    div:(a,b,len)=>divNum(a,b,len)
} 

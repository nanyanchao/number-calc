let {
    divNum
} = require('../src/div_handle')
var assert = require('assert');


describe('handle divNum',function(){
    it('divNum 12345678/1 = 12345678',function(){
        assert.equal(divNum('12345678','1',0),'12345678')
    })

    it('divNum 12345678000/1 = 12345678000',function(){
        assert.equal(divNum('212345678000','1',0),'212345678000')
    })

    it('divNum 0.12/0.1 = 1.2',function(){
        assert.equal(divNum('0.12','0.1',1),'1.2')
    })

    it('divNum 0.000123456789/0.00000001 = 12345.6789',function(){
        assert.equal(divNum('0.000123456789','0.00000001',4),'12345.6789')
    })
    

    it('divNum 100000.00000000/1087.00 = 91.996320147194112',function(){
        assert.equal(divNum('100000.00000000','1087.00'),'91.996320147194112')
    })

    it('divNum 5002.19680000/1 = 5002.19680000',function(){
        assert.equal(divNum('5002.19680000','1',8),'5002.19680000')
    })

    it('divNum 15000/188.15 = 79.723624767472761',function(){
        assert.equal(divNum('15000','188.15',15),'79.723624767472761')
    })

    it('divNum 111100/24613.09656577 = 4.513857072112955',function(){
        assert.equal(divNum('111100','24613.09656577',4),'4.5138')
    })

    it('divNum 111100/0 = 4.513857072112955',function(){
        assert.equal(divNum('111100','',4),'')
    })

    it('divNum 111100/0 = ',function(){
        assert.equal(divNum('111100','0',4),'')
    })

    it('divNum /0 = ',function(){
        assert.equal(divNum('','0',4),'0')
    })


    it('mulNum 1000000001/55555 = 18000.18001980019800',function(){
        assert.equal(divNum('1000000001','55555',14),'18000.18001980019800')
    })
})


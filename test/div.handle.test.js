let {
    divNum
} = require('../lib/div_handle')
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

})



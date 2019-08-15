let {mul,mulNum} = require('../lib/mul_handle')
var assert = require('assert');

describe('handle mul',function(){
    it('mul 1*1=1',function(){
        assert.equal(mul(1,1),1)
    })

    it('mul 0*1=0',function(){
        assert.equal(mul(0,1),0)
    })

    it('mul 1*0=0',function(){
        assert.equal(mul(1,0),0)
    })

    it('mul 1.1*10=11',function(){
        assert.equal(mul(1.1,10),11)
    })

    it('mul 1.5*20=30',function(){
        assert.equal(mul(1.5,20),30)
    })
    
})


describe('handle mulNum',function(){
    it('mulNum 1*1=1',function(){
        assert.equal(mulNum('1','1'),'1')
    })

    it('mulNum 1*0=0',function(){
        assert.equal(mulNum('1','0'),'0')
    })

    it('mulNum 0*10=0',function(){
        assert.equal(mulNum('0','10'),'0')
    })

    it('mulNum 0.1*10=1',function(){
        assert.equal(mulNum('0.1','10'),'1.0')
    })

    it('mulNum 9.9*9.9=98.01',function(){
        assert.equal(mulNum('9.9','9.9',2),'98.01')
    })
    
    it('mulNum 0.1*0.1=0.01',function(){
        assert.equal(mulNum('0.1','0.1',2),'0.01')
    })

    it('mulNum 0.001*0.002=0.000002',function(){
        assert.equal(mulNum('0.001','0.002',6),'0.000002')
    })

    it('mulNum 99999*99999=9999800001',function(){
        assert.equal(mulNum('99999','99999'),'9999800001')
    })

    it('mulNum 9.88887*7.66665=75.8145051855',function(){
        assert.equal(mulNum('9.88887','7.66665'),'75.8145051855')
    })

    it('mulNum 99999.99999*99999.99999=9999999998.0000000001',function(){
        assert.equal(mulNum('99999.99999','99999.99999'),'9999999998.0000000001')
    })

    it('mulNum 1121*900.00=1008900',function(){
        assert.equal(mulNum('1121','900.00',0),'1008900')
    })

    it('mulNum 108.0*1=108.0',function(){
        assert.equal(mulNum('108.0','1',1),'108.0')
    })
})




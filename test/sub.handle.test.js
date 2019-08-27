let {sub,subNum
} = require('../src/sub_handle')
var assert = require('assert');


describe('handle sub',function(){
    it('sub -1 -1=-2',function(){
        assert.equal(sub(-1,1),-2)
    })

    it('sub 0-0=0',function(){
        assert.equal(sub(0,0),0)
    })

    it('sub 8-1=7',function(){
        assert.equal(sub(8,1),7)
    })
})




describe('handle subNum',function(){
    it('subNum -1 -1=-2',function(){
        assert.equal(subNum('-1','1'),'-2')
    })

    it('subNum 0.000000001 - 0.000000003= -0.000000002',function(){
        assert.equal(subNum('0.000000001','0.000000003'),'-0.000000002')
    })

    it('subNum 5 - 2= 3',function(){
        assert.equal(subNum('5','2'),'3')
    })
    

    it('subNum 1 - 0.999= 0.001',function(){
        assert.equal(subNum('1','0.999'),'0.001')
    })

    it('subNum 0.999 - 1= -0.001',function(){
        assert.equal(subNum('0.999','1'),'-0.001')
    })

    it('subNum 150000 - 18815= 131185',function(){
        assert.equal(subNum('150000','18815'),'131185')
    })
})



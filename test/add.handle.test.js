let {add,foreachAdd,addNum} = require('../src/add_handle')
var assert = require('assert');

describe('handle add',function(){
    it('add 1+1=2',function(){
        assert.equal(add(1,1),2)
    })

    it('add -1+1=0',function(){
        assert.equal(add(-1,1),0)
    })

    it('add 0+0=0',function(){
        assert.equal(add(0,0),0)
    })

    it('add 1+ -1=0',function(){
        assert.equal(add(1,-1),0)
    })
    
})

describe('handle foreachAdd',function(){
    it('foreachAdd {0:"1234",1:"1",max:1}  {0:"9999",1:"2",max:1}',function(){
        assert.deepEqual(foreachAdd(
            {0:"1234",1:"1",max:1},
            {0:"9999",1:"2",max:1}),
            {
                0:"11233",1:"3",max:1
            })
    })
})

describe('handle addNum',function(){
    it('addNum 1+1=2',function(){
        assert.equal(addNum('1','1'),'2')
    })
    it('addNum -1+1=2',function(){
        assert.equal(addNum('-1','1'),'0')
    })
    it('addNum 0+0=0',function(){
        assert.equal(addNum('0','0'),'0')
    })

    it('addNum 1234567890+123456789012345678901234567890=0',function(){
        assert.equal(
            addNum('1234567890','123456789012345678901234567890'),
            '123456789012345678902469135780')
    })

    it('addNum 0.12345678909+0.00000000001=0.12345678910',function(){
        assert.equal(
            addNum('0.12345678909',
                   '0.00000000001'),
            '0.12345678910')
    })
    
    it('addNum -888888888+222222222=666666666',function(){
        assert.equal(addNum('-888888888','222222222'),'-666666666')
    })


    it('addNum -0.00001+ 0.00001=0.0',function(){
        assert.equal(
            addNum('-0.00001',
                   '0.00001',1),
            '0.0')
    })

    it('addNum 0.00001+ 0.00001=0.00002',function(){
        assert.equal(
            addNum('0.00001',
                   '0.00001',5),
            '0.00002')
    })

    it('addNum -0.00001+ -0.00001=-0.00002',function(){
        assert.equal(
            addNum('-0.00001',
                   '-0.00001',5),
            '-0.00002')
    })

    it('addNum 150000+ -18815=131185',function(){
        assert.equal(
            addNum('150000',
                   '-18815',5),
            '131185')
    })
})



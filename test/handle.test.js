let {slice4,removeLeft,removeRight} = require('../src/handle')
var assert = require('assert');

describe('handle slice4',function(){
    it('slice4 1.0001',function(){
        assert.deepEqual(
            slice4('1.0001'),
            {
                before : {0:'1',max:0},
                after:{0:'0001',max:0},
                isNegative:''
            }
        )
    })

    it('slice4 1.0001001',function(){
        assert.deepEqual(
            slice4('1.0001001'),
            {
                before : {0:'1',max:0},
                after:{0:'0001',1:'0010',max:1},
                isNegative:''
            }
        )
    })

    it('slice4 1.0',function(){
        assert.deepEqual(
            slice4('1.0'),
            {
                before : {0:'1',max:0},
                after:{0:'0000',max:0},
                isNegative:''
            }
        )
    })

    it('slice4 0.0',function(){
        assert.deepEqual(
            slice4('0.0'),
            {
                before : {0:'0',max:0},
                after:{0:'0000',max:0},
                isNegative:''
            }
        )
    })

    it('slice4 123456789',function(){
        assert.deepEqual(
            slice4('123456789'),
            {
                before : {0:'6789',1:'2345',2:'1',max:2},
                after:{"max": -1},
                isNegative:''
            }
        )
    })

    it('slice4 123456789.987654321',function(){
        assert.deepEqual(
            slice4('123456789.987654321',true),
            {
                before : {0:'6789',1:'2345',2:'1',max:2},
                after:{0:'9876',1:'5432',2:'1000',max:2},
                isNegative:''
            }
        )
    })

    
    
})

describe('handle removeLeft',function(){
    it('removeLeft 0001000',function(){
        assert.deepEqual(
            removeLeft('0001000'),
            '1000'
        )
    })
})

describe('handle removeRight',function(){
    it('removeRight 0001000',function(){
        assert.deepEqual(
            removeRight('0001000'),
            '0001'
        )
    })
    it('removeRight 0001000',function(){
        assert.deepEqual(
            removeRight('0001000.','.'),
            '0001000'
        )
    })
})
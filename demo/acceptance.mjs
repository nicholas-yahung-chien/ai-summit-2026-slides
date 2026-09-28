import test from 'node:test'
import assert from 'node:assert/strict'
export function acceptance(register, cancel) {
  test('registers one attendee without changing the input', () => {
    const before=Object.freeze(['A'])
    assert.deepEqual(register(before,'B',3),{status:'registered',attendees:['A','B']})
    assert.deepEqual(before,['A'])
  })
  test('duplicate registration never consumes a seat, even when full', () => {
    assert.deepEqual(register(['A','B','C'],'A',3),{status:'duplicate',attendees:['A','B','C']})
  })
  test('full registration refuses a new attendee without mutation', () => {
    const before=Object.freeze(['A','B','C'])
    assert.deepEqual(register(before,'D',3),{status:'full',attendees:['A','B','C']})
  })
  test('cancellation releases capacity for a new attendee', () => {
    const before=Object.freeze(['A','B','C'])
    const result=cancel(before,'B')
    assert.deepEqual(result,{status:'cancelled',attendees:['A','C']})
    assert.deepEqual(register(result.attendees,'D',3),{status:'registered',attendees:['A','C','D']})
    assert.deepEqual(before,['A','B','C'])
  })
  test('missing cancellation preserves the list', () => {
    assert.deepEqual(cancel(['A'],'Z'),{status:'not-found',attendees:['A']})
  })
  test('rejects invalid input instead of silently corrupting state', () => {
    for(const capacity of [0,-1,1.5,NaN,Infinity,'3']) assert.throws(()=>register([],'A',capacity))
    for(const id of ['', '  ',null,7]) {
      assert.throws(()=>register([],id,3)); assert.throws(()=>cancel([],id))
    }
    for(const list of [null,{},['A','A'],[' ']]) {
      assert.throws(()=>register(list,'B',3)); assert.throws(()=>cancel(list,'B'))
    }
  })
}

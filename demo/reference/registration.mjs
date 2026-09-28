// Prebuilt fallback; not presented as an actual IBM Bob session result.
function validate(attendees,id) {
  const validId=x=>typeof x==='string' && x.trim().length>0
  if(!Array.isArray(attendees) || !attendees.every(validId) || new Set(attendees).size!==attendees.length)
    throw new TypeError('attendees must contain unique nonblank string IDs')
  if(!validId(id)) throw new TypeError('id must be a nonblank string')
}
export function register(attendees,id,capacity) {
  validate(attendees,id)
  if(!Number.isInteger(capacity) || capacity<1) throw new RangeError('capacity must be a positive integer')
  if(attendees.includes(id)) return {status:'duplicate',attendees:[...attendees]}
  if(attendees.length>=capacity) return {status:'full',attendees:[...attendees]}
  return {status:'registered',attendees:[...attendees,id]}
}
export function cancel(attendees,id) {
  validate(attendees,id)
  return {status:attendees.includes(id)?'cancelled':'not-found',attendees:attendees.filter(x=>x!==id)}
}

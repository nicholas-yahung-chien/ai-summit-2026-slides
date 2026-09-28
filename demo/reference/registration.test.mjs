import { register, cancel } from './registration.mjs'
import { acceptance } from '../acceptance.mjs'
acceptance(register, cancel)

import { get } from './base.js'

export function getRecommend(){
    return get('/api/getRecommend')
}
import stroage from 'good-storage'
function insertArray(arr,val,compare,maxLength){
    const index=arr.findIndex(compare)
    if(index>-1){
        return
    }
    arr.unshift(val)
    if(maxLength&&arr.length>maxLength){
        arr.pop()
    }
}
function deleteFromArray(arr,compare){
    const index=arr.findIndex(compare)
    if(index>-1){
        arr.splice(index,1)
    }
}
export function save(item,key,compare,maxLength){
    const items=stroage.get(key,[])
    insertArray(items,item,compare,maxLength)
    stroage.set(key,items)
    return items
}
export function remove(key,compare){
    const items=stroage.get(key,[])
    deleteFromArray(items,compare)
    stroage.set(key,items)
    return items
}
export function load(key){
    return stroage.get(key,[])
}
export function clear(key){
    stroage.remove(key)
    return []
}
export function shuffle(source){
    const arr=[...source]
    for(let i=0;i<arr.length;i++) {
        const j=getRandomInt(i)
        swap(arr,i,j)
    }
    return arr
}
function getRandomInt(max){
    return Math.floor(Math.random()*(max+1))
}
function swap(arr,i,j){
    const t=arr[i]
    arr[i]=arr[j]
    arr[j]=t
}
export function formatTime(interval){
    interval=interval|0
    const miniute=((interval/60|0).toString()).padStart(2,'0')
    const second=(interval%60).toString().padStart(2,'0')
    return `${miniute}:${second}`
}
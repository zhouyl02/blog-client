function changeTime(dataTime){
    let data = typeof dataTime === 'object' ? dataTime : new Date(dataTime)
    let CreateTime = data.getTime()
    let now = Date.now()
    let space = now - CreateTime
    let str = ''

    switch(true){
        case space < 60000:
            str = '刚刚'
            break
        case space < 3600000:
            str = Math.floor(space/60000) + '分钟前'
            break
        case space < 3600000 * 24:
            str = Math.floor(space/3600000) + '小时前'
            break
        default:
            str = Math.floor(space/(3600000*24)) + '天前'
            break
    }
    return str
}

export default {
    install(Vue, options){
        Vue.prototype.changeTime = changeTime
    }
}
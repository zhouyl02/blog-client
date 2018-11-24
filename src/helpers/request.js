import axios from 'axios'
import {Message} from 'element-ui'

axios.defaults.baseURL = 'https://blog-server.hunger-valley.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

export default function request(url, method='GET', data={}){
    return new Promise((resolve, reject)=>{
        let options = {url, method}
        if(method.toLowerCase() === 'get'){
            options.params = data
        }else{
            options.data = data
        }
        axios(options).then((res)=>{
            if(res.data.status === 'ok'){
                resolve(res.data)
            }else{
                Message.error(res.data.msg)
                reject(res.data)
            }
        }).catch((err)=>{
            Message.error('网络异常')
            reject({msg: '网络异常'})
        })
    })
}
import Ajax from '@u/ajax'

let baseUrl = 'http://127.0.0.1:4090/'
let ajax = new Ajax()

// TODO 优化
interface result {
    [key: string]: any
}

// TODO typescript重构
const createAPI = (name: string, options: any) => {
    const result: result = {}
    for (let key in options) {
        const { method, path } = options[key]
        result[key] = (params: any) => {
            return new Promise((resolve, reject) => {
                let url = baseUrl + path
                if (method.toLowerCase() === 'get') {
                    if (params) {
                        let paramsStr = ''
                        Object.keys(params).forEach((key, index) => {
                            if (index === 0) {
                                paramsStr += `?${key}=${params[key]}`
                            } else {
                                paramsStr += `&${key}=${params[key]}`
                            }
                        })
                        url = url + paramsStr
                    }

                    ajax.get(url, (res: any) => {
                        resolve(res)
                    })

                } else if (method.toLowerCase() === 'post') {
                    ajax.post(url, params, (res: any) => {
                        resolve(res)
                    })
                }

            })
        }
    }
    return result
}

export default createAPI
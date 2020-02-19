/*
 * @Author: tianzhi
 * @Date: 2020-02-19 21:13:59
 * @LastEditors  : tianzhi
 * @LastEditTime : 2020-02-19 23:12:40
 */
class CVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        
        this.observe(this.$data)
    }
    observe(value) {
        if(!value || typeof value != 'object') {
            return false;
        }
        Object.keys(value).map(key => {
            this.proxyData(key)
            this.defineReactive(value, key, value[key])
        })
    }
    // 设置代理 当访问this.title的时候 相当于改变this.$data.title
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
    defineReactive(obj, key, val)  {
        Object.defineProperty(obj, key, {
            get() {
                return val
            },
            set(newVal) {
                if(newVal != val) {
                    val = newVal
                    console.log(`${key}更新了，${newVal}`)
                }
            }
        })

        // 递归 让data里面内层的对象也可以响应
        this.observe(val)
    }
}
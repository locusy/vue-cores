/*
 * @Author: tianzhi
 * @Date: 2020-02-19 21:13:59
 * @LastEditors  : tianzhi
 * @LastEditTime : 2020-02-20 12:07:15
 */
class CVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        
        this.observe(this.$data)

        new Watcher()
        this.$data.title
        this.$data.title = 'new val'
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
        /**
         * 发布订阅模式
         * 一个key只有一个dep，对应的是数据
         * 一个dep里面包含多个watcher, 对应的是视图中的多个地方
         */
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if(newVal != val) {
                    val = newVal
                    // console.log(`${key}更新了，${newVal}`)
                    dep.notify()
                }
            }
        })

        // 递归 让data里面内层的对象也可以响应
        this.observe(val)
    }
}

class Dep {
    constructor() {
        this.deps = []
    }
    addDep(watcher) {
        this.deps.push(watcher)
    }
    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
}

class Watcher {
    constructor() {
        Dep.target = this
    }
    update() {
        console.log('属性更新了。。')
    }
}
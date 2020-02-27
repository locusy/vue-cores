class CVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        
        this.observe(this.$data)

        // new Watcher()
        // this.$data.title
        // this.$data.title = 'new val'
        new Compile(options.el, this)

        if(options.created) {
            options.created.call(this)
        }
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
    // 设置代理 当访问this.title的时候 相当于访问this.$data.title
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

/**
 * 依赖收集
 */
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
    constructor(vm, key, callback) {
        this.vm = vm
        this.key = key
        this.callback = callback

        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }
    update() {
        // console.log('属性更新了。。')
        this.callback.call(this.vm, this.vm[this.key])
    }
}
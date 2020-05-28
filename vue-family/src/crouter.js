import Vue from 'vue'

class Crouter {
    constructor(Vue, options) {
        this.$options = options
        this.routemap = {}

        // 将currentHash挂载在vue实例上 
        this.app = new Vue({
            data: {
                currentHash: '#/'
            }
        })

        // 监听load和hashchange事件，获取当前的currentHash值
        this.init()
        // 生成routemap：键=>值  path=>component
        this.createRouteMap()
        // 注册组件 根据当前currentHash值找到并展示组件
        this.initComponent(Vue)
    }
    
    init() {
        window.addEventListener('load', this.handleHashChange.bind(this))
        window.addEventListener('hashchange', this.handleHashChange.bind(this))
    }

    handleHashChange() {
        // this.app.currentHash = this.getHash()
        this.app.currentHash = window.location.hash.slice(1) || ''
    }

    // getHash() {
    //     return window.location.hash.slice(1) || ''
    // }

    createRouteMap() {
        this.$options.routes.forEach(elem => {
            this.routemap[elem.path] = elem.component
        })
    }

    initComponent(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render: function(h) {
                // h => createElement
                // <a href=""><slot></slot></a>
                return h('a', {attrs: {'href': this.to}}, this.$slots.default)
            }
        })
        
        let _this = this
        Vue.component('router-view', {
            render(h) {
                let component = _this.routemap[_this.app.currentHash]
                return h(component)
            }
        })
    }
}

const Apple =  {
    render() {
        return (
            <div>apple kaka</div>
        )
    }
}

const Berry = {
    render() {
        return (
            <div>berry lala</div>
        )
    }
}

export default new Crouter(Vue, {
    routes: [
        {
            path: '/apple',
            component: Apple
        },
        {
            path: '/berry',
            component: Berry
        }
    ]
})
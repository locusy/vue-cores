/*
 * @Author: tianzhi
 * @Date: 2020-03-02 23:36:43
 * @LastEditors: tianzhi
 * @LastEditTime: 2020-03-03 11:06:44
 */
import Vue from 'vue'

class Crouter {
    constructor(options) {
        this.$options = options
        this.routemap = {}

        // 将currentHash挂载在vue实例上 
        this.app = new Vue({
            currentHash: '#/'
        })

        // 监听load和hashchange事件，获取当前的currentHash值
        this.init()
        // 生成routemap：键=>值  path=>component
        this.createRouteMap()
        // 注册组件 根据当前currentHash值找到组件并编译成dom
        this.initComponent()
    }
    
    init() {
        window.addEventListener('load', this.handleHashChange.bind(this))
        window.addEventListener('hashchange', this.handleHashChange.bind(this))
    }

    handleHashChange() {
        this.app.currentHash = this.getHash()
    }

    getHash() {
        return window.location.hash.slice(1) || ''
    }

    createRouteMap() {
        options.routes.forEach(elem => {
            this.routemap[elem.path] = elem.component
        })
    }

    initComponent() {
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
        const _this = this
        Vue.component('router-view', {
            render(h) {
                const component = _this.routemap[_this.app.currentHash]
                return h(component)
            }
        })
    }
}


const Apple =  {
    render() {
        return (
            <div>apple</div>
        )
    }
}
const Berry = {
    render() {
        return (
            <div>berry</div>
        )
    }
}
export default new Crouter({
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
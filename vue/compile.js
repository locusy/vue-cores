class Compile {
    constructor(el, vm) {
        this.$vm = vm

        this.$el = document.querySelector(el)
        if(this.$el) {
            this.$fragment = this.node2Fragment(this.$el)
            this.compile(this.$fragment)
            this.$el.appendChild(this.$fragment)
        }
    }
    node2Fragment(el) {
        let fragment = document.createDocumentFragment()
        let child;
        while((child = el.firstChild)) {
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(fragment) {
        const childNodes = fragment.childNodes
        childNodes.forEach(node => {
            if(node.nodeType === 1) {
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                this.compileText(node)
            }

            if(node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    isInterpolation(node) {
        // 是文本且符合{{}}
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
    // 编译{{}}
    compileText(node) {
        this.update(node, this.$vm, RegExp.$1, "text");
    }
    compileElement(node) {
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            if(this.isDirective(attrName)) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, this.$vm, exp)
            }
            if (this.isEvent(attrName)) {
                const dir = attrName.substring(1)
                this.handleEvent(node, this.$vm, dir, exp)
            }
        })
    }
    isDirective(attr) {
        return attr.indexOf('c-') === 0
    }
    isEvent(attr) {
        return attr.indexOf('@') === 0
    }

    // @click
    handleEvent(node, vm, dir, exp) {
        const fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm));
        }
    }
    
    // 添加watcher
    update(node, vm, exp, dir) {
        let fnUpdate = this[`${dir}Updater`]
        fnUpdate && fnUpdate(node, vm[exp])

        new Watcher(vm, exp, function(value) {
            fnUpdate && fnUpdate(node, value)
        })
    }

    // c-text   
    text(node, vm, exp) {
        this.update(node, vm, exp, "text");
    }
    textUpdater(node, val) {
        node.textContent = val
    }

    // c-html
    html(node, vm, exp) {
        this.update(node, vm, exp, "html");
    }
    htmlUpdater(node, val) {
        node.innerHTML = val
    }

    // c-model
    model(node, vm, exp) {
        // 数据 => 视图
        this.update(node, vm, exp, "model")

        // 视图 => 数据
        node.addEventListener('input', e => {
            vm[exp] = e.target.value
        })
    }
    modelUpdater(node, val) {
        node.value = val
    }

}


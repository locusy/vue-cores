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
    update() {
        
    }
    isInterpolation(node) {
        // 是文本且符合{{}}
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }
    compileText(node) {

    }
    compileElement(node) {
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
            const attrName = attr.name
            const attrValue = attr.value
            if(attrName) {
                
            }
        })
    }
}


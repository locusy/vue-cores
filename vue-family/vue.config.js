module.exports = {
    // publicPath: '/family',
    configureWebpack: {
        devServer: {
            before(app) {
                // app是express 实例
                app.get('/lists', (req, res) => {
                    res.json([
                        {id:1, text:'abc'},
                        {id:2, text:'abc'},
                    ])
                })
            }
        }
    }
}
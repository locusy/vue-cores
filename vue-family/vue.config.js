/*
 * @Author: tianzhi
 * @Date: 2020-03-02 17:04:17
 * @LastEditors: tianzhi
 * @LastEditTime: 2020-03-02 17:16:20
 */
module.exports = {
    publicPath: '/family',
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
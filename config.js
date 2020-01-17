const prod = true


const prod_server = 'https://cajones-backend.herokuapp.com/graphql'
const prod_socket = 'wss://cojones-sockets.herokuapp.com/subscriptions'
const prod_login = 'https://cajones-backend.herokuapp.com/login'
const dev_server = 'https://bcc1e1a8.ngrok.io/graphql'
const dev_socket = 'ws://66b412d8.ngrok.io/subscriptions'
const dev_login = 'https://bcc1e1a8.ngrok.io/login'




const export_env_urls = () => {
    if (prod) {
        const env = {
            server: prod_server,
            socket: prod_socket,
            login: prod_login
        }
        return env
    } else {
        const env = {
            server: dev_server,
            socket: dev_socket,
            login: dev_login
        }
        return env
    }
}


export default export_env_urls();
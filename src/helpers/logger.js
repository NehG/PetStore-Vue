import LogRocket from "logrocket"

if (process.env.NODE_ENV !== "test")
	LogRocket.init("gajjarnehalcom/petstore-vue")

export default LogRocket

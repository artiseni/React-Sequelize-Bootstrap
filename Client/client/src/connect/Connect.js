
 class Connect {

    constructor(url, method, data = null){
        this.url = url
        this.data = data
        this.method = method
        if (this.method.toLocaleLowerCase() === 'get') {
            if (this.data !== null) {
                this.url = new URL(this.url)
                this.url.search = new URLSearchParams(this.data)
            }
        }
    }

    async requestData() {
        if (this.data !== null) {
            if (this.method.toLocaleLowerCase() === "get") {
                const response = await fetch (this.url, {
                    method  : this.method,
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })
                if (response.status === 200) {
                    return response.json()
                } else {
                    return response
                }
            } else if (this.method.toLocaleLowerCase() === "post"){
                const response = await fetch (this.url, {
                    method  : this.method,
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(this.data),
                })
                
                if (response.status === 200) {
                    return response.json()
                } else {
                    return response
                }
            }

        } else {
            const apidata = await fetch (this.url, {
                method  : this.method
            })

            if (apidata.status === 200) {
                return apidata.json()
            } else {
                return apidata
            }
        }
    }
}

export default Connect
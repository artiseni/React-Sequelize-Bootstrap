
class Connect {

    constructor(url, method = 'GET', data = null){
        this.url = url
        this.data = data
        this.method = method
    }

    async postData() {
        if (this.data != null) {

            const response = await fetch (this.url, {
                method  : this.method,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(this.data)
            })
            
            if (response.status === 200) {
                return response.json()
            } else {
                return response
            }

        } else {
            const apidata = await fetch (this.url, {
                method  : 'POST',
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
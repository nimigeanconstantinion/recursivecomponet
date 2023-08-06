import ResponseImpl from "./model/ResponseImpl";

type ResponseBody = {};

interface ResponseData {
    statusCode: number
    responseBody?: ResponseBody
};

export default class Api {

    api<T, U>(path: string, method = "GET", body: U): Promise<ResponseImpl<T>> {

        const url = path;

        const options: RequestInit = {
            method,
            mode: 'cors',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },


            body: body == null ? null : JSON.stringify(body)
        }
        return fetch(url, options)
    }

    getTree = async (): Promise<Object[]> => {

        let response = await this.api("http://localhost:8080/api/v1/tree", "GET", null);
        console.log(response);
        // let ret=await response.json();
        // console.log("RET di api");
        // console.log(ret);
        let ret = response.json();
        console.log(ret);
        return ret;
    }
}

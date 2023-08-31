import ResponseImpl from "./model/ResponseImpl";
import {BKNode} from "./components/Home";

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

    addNode=async(nod:BKNode,idP:string):Promise<BKNode>=>{
        let response = await this.api("http://localhost:8080/api/v1/tree/addchild/"+idP, "POST",nod);
        return response.json();

    }

    addNodetoParent=async(nod:BKNode,idP:string):Promise<Object>=>{
        let response = await this.api("http://localhost:8080/api/v1/tree/addchild2parent/"+idP, "POST",nod);
        return response.json();

    }

    addChild=async(nod:BKNode,idP:string):Promise<BKNode>=>{
        let response = await this.api("http://localhost:8080/api/v1/tree/addchild/"+idP, "POST",nod);
        return response.json();

    }

    getNodeByLabel=async (lbl:String):Promise<BKNode>=>{
        let response = await this.api("http://localhost:8080/api/v1/tree/getnodebylabel/"+lbl, "GET",null);
        return response.json();
    }

    getNodeByLabel2=async (lbl:String):Promise<Object>=>{
        let response = await this.api("http://localhost:8080/api/v1/tree/getnodebylabel/"+lbl, "GET",null);
        console.log("Din getNodeByLabel2");
        console.log(response);

        return response.json();
    }

    dropItem=async (idC:string,idP:string):Promise<boolean>=>{
        let response = await this.api("http://localhost:8080/api/v1/tree/dropnode/"+idC+"/"+idP, "POST",null);

        return response.json();
    }
}

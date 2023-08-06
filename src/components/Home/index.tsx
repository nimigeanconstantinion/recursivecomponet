import {useEffect, useState} from "react";
import Api from "../../Api";
import { Tree, TreeNode } from 'react-organizational-chart';
import RecursiveComponent from "../RecursiveComponent/RecursiveComponent";


interface BKNode{
    id:string,
    label:string,
    descriere:string,
    parinte:BKNode|null,
    subordinates:BKNode[],
    generator:Generator,
    customFields:CustomFields,

}

interface Generator{
    id:number,
    pattern:string,
    minValue:string,
    maxValue:string,
    nextValue:string,
    generationType:string,
    generatedOn:string
}

interface CustomFields{
    id:string,
    customKey:string,
    value:string,
    type:string
}

function Index(){

    const [tree,SetTree]=useState<Object[]>();

    useEffect(()=>{
        loadTree();

    },[])

    let loadTree=async ()=>{
        let api=new Api();
        try{
            let response=await api.getTree();
            SetTree(response);

        }catch (e){
            console.log("Eroare");
        }


    }
    return(
        <>
            <Tree label={<div>Root</div>}>
               <RecursiveComponent {...tree} />
            </Tree>
        </>
    )

}

export default Index;
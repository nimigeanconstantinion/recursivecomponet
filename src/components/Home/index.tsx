import React, {useEffect, useRef, useState} from "react";
import Api from "../../Api";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from "styled-components";
import RecursiveComponent from "../RecursiveComponent/RecursiveComponent";
import Aside from "../Aside";
import {DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

interface RecursiveComponentProps {
    id: string;
    name: string;
    data?:BKNode,
    backFunc?:Function,
    children?: RecursiveComponentProps[];
}

// export interface BKNode{
//     id:string,
//     label:string,
//     descriere:string,
//     parinte:BKNode|null,
//     subordinates:BKNode[],
//     generator:Generator|null,
//     customFields:CustomFields[],
//
// }
//
// interface Generator{
//     id:number,
//     pattern:string,
//     minValue:string,
//     maxValue:string,
//     nextValue:string,
//     generationType:string,
//     generatedOn:string
// }
//
// interface CustomFields{
//     id:string,
//     customKey:string,
//     value:string,
//     type:string
// }

interface cField{
    id: string|null,
    customKey: string,
    value: string,
    type: string,
    parentRid:string
}

export interface BKNode{
    id: string|null,
    label: string,
    descriere: string,
    cfields: cField[],
    subordinates?: BKNode[],
    parinte?:BKNode|null,
    generatedID:Generator|null
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



function Index(){

    const [tree,SetTree]=useState<BKNode>();
    const [prop,setProp]=useState<RecursiveComponentProps[]>([]);
    const [datt,setDatt]=useState<RecursiveComponentProps>();
    const [change,setChange]=useState(0);
    const [show,SetShow]=useState(0);
    const [k,setK]=useState<number>(0);
    const countRef = useRef<number>(0);

    useEffect(()=>{
        loadTree();

    },[])

    useEffect(()=>{
        console.log("K devine ="+k);
        console.log("k din ref="+countRef.current);
    },[k]);

    useEffect(()=>{
         console.log("Am schimbat arborele");
         console.log(tree);
        // if(tree!=null){
        //     tree?.map(c=>{
        //         console.log("Bag");
        //         prop.push(c as RecursiveComponentProps);
        //     });
        //

            setChange((prevState) => {
              return   prevState+1;
            });


    }
    ,[tree])

    useEffect(()=>{
        console.log("Datt =====");
        console.log(datt);
    },[datt])

    const data: RecursiveComponentProps = {
        id: "1",
        name: 'Parent',
        children: [
            {
                id: "2",
                name: 'Child 1',
                children: [
                    {
                        id: "3",
                        name: 'Grandchild 1',
                        children: [
                            {
                                id: "6",
                                name: 'Grandchild 11',
                                children: [],
                            }
                        ],
                    },
                    {
                        id: "4",
                        name: 'Grandchild 2',
                        children: [],
                    },
                ],
            },
            {
                id: "5",
                name: 'Child 2',
                children: [],
            },
        ],
    };

    useEffect(()=>{

         console.log("Prop")
         console.log(prop)
        console.log("kjkjlwkejdlkjedlkj")
        if(change>0&&tree!=undefined){
            console.log(tree);
            handleIndexare();
            let f:RecursiveComponentProps=nodeToRecursiveProp(tree);
            console.log("recursive");
            console.log(f);
            setDatt(f);
            SetShow(2);

        }


    },[change])

    const handleIndexare = () => {

          setK((prevState) => prevState+1);

    };

    let loadTree=async ()=>{
        let api=new Api();
        let f1:RecursiveComponentProps={
            id:"",
            name:"Base",
            children:[]
        }
        let root:BKNode={
            id:"",
            label:"Base",
            descriere:"",
            parinte:null,
            subordinates:[],
            generatedID:null,
            cfields:[]

        }
        let treeProp:RecursiveComponentProps[]=[]
        let ftre:BKNode={
            id:"01",
            label:"Base Entry",
            descriere:"",
            parinte:null,
            generatedID:null,
            cfields:[],
            subordinates:[]
        };

        treeProp.push(f1);
        try{
            let response=await api.getTree();
            console.log("Raspuns=");
            console.log(response);

           response.map(t=>{
                if((t as BKNode).id!=null){
                    if(ftre.subordinates!=null){
                        ftre.subordinates.push(t as BKNode);

                    }

                }

           })
           SetTree(ftre);

        }catch (e){
            console.log("Eroare");
        }


    }

    let nodeToRecursiveProp=(nod:BKNode):RecursiveComponentProps=>{
            handleIndexare();
            let toR:RecursiveComponentProps={
                id:nod.id as string,
                name:nod.label,
                data:nod,
                backFunc:refreshTree,
                children:[]
            }
            if(nod.subordinates!=undefined){
                nod.subordinates.map(s=>{
                    handleIndexare();
                    toR.children!.push(nodeToRecursiveProp(s));
                })
            }

        return toR;
    }


    let refreshTree=()=>{
        loadTree();
        handleIndexare();
    }

    return(
        <>
            <DndProvider backend={HTML5Backend}>

            <Aside/>
            <div className={"divright"}>

                {
                    k&&datt?(
                        <>
                            <Tree lineWidth={'2px'}
                                  lineColor={'green'}
                                  lineBorderRadius={'10px'}
                                  label={<StyledNode>Organisation Chart</StyledNode>}>


                                <RecursiveComponent key={k} {...datt} />





                            </Tree>
                        </>
                    ):""
                }
            </div>
            </DndProvider>
        </>
    )

}

export default Index;
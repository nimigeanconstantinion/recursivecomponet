import React, {useEffect, useState} from "react";
import Api from "../../Api";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from "styled-components";
import RecursiveComponent from "../RecursiveComponent/RecursiveComponent";
const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

interface RecursiveComponentProps {
    id: string;
    label: string;

    subordinates?: RecursiveComponentProps[];
}

interface BKNode{
    id:string,
    label:string,
    descriere:string,
    parinte:BKNode|null,
    subordinates:BKNode[],
    generator:Generator|null,
    customFields:CustomFields[],

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

    const [tree,SetTree]=useState<BKNode>();
    const [prop,setProp]=useState<RecursiveComponentProps[]>([]);
    const [datt,setDatt]=useState<RecursiveComponentProps>();
    const [change,setChange]=useState(0);
    const [show,SetShow]=useState(0);

    useEffect(()=>{
        loadTree();

    },[])

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

    const data: RecursiveComponentProps = {
        id: "1",
        label: 'Parent',
        subordinates: [
            {
                id: "2",
                label: 'Child 1',
                subordinates: [
                    {
                        id: "3",
                        label: 'Grandchild 1',
                        subordinates: [
                            {
                                id: "6",
                                label: 'Grandchild 11',
                                subordinates: [],
                            }
                        ],
                    },
                    {
                        id: "4",
                        label: 'Grandchild 2',
                        subordinates: [],
                    },
                ],
            },
            {
                id: "5",
                label: 'Child 2',
                subordinates: [],
            },
        ],
    };

    useEffect(()=>{

         console.log("Prop")
         console.log(prop)
        console.log("kjkjlwkejdlkjedlkj")
        if(change>0&&tree!=undefined){
            console.log(tree);
            let f:RecursiveComponentProps=nodeToRecursiveProp(tree);
            console.log("recursive");
            console.log(f);
            setDatt(f);
            SetShow(2);

        }


    },[change])

    let loadTree=async ()=>{
        let api=new Api();
        let f1:RecursiveComponentProps={
            id:"",
            label:"Base",
            subordinates:[]
        }
        let root:BKNode={
            id:"",
            label:"Base",
            descriere:"",
            parinte:null,
            subordinates:[],
            generator:null,
            customFields:[]

        }
        let treeProp:RecursiveComponentProps[]=[]
        let ftre:BKNode={
            id:"",
            label:"",
            descriere:"",
            parinte:null,
            generator:null,
            customFields:[],
            subordinates:[]
        };

        treeProp.push(f1);
        try{
            let response=await api.getTree();
            console.log("Raspuns=");
            console.log(response);

           response.map(t=>{
                if((t as BKNode).id!=null){
                    ftre.subordinates.push(t as BKNode);
                }

           })
           SetTree(ftre);

        }catch (e){
            console.log("Eroare");
        }


    }
    let nodeToRecursiveProp=(nod:BKNode):RecursiveComponentProps=>{


            let toR:RecursiveComponentProps={
                id:nod.id,
                label:nod.label,
                subordinates:[]
            }
            nod.subordinates.map(s=>{
              toR.subordinates!.push(nodeToRecursiveProp(s));
            })
        return toR;
    }

    // @ts-ignore
    // @ts-ignore
    return(
        <>
            <Tree lineWidth={'2px'}
                  lineColor={'green'}
                  lineBorderRadius={'10px'}
                  label={<StyledNode>Organisation Chart</StyledNode>}>
                {
                    show>-1?(
                        <TreeNode label={"Start"}>

                            <RecursiveComponent id={""} label={""}  {...datt} />

                        </TreeNode>



                    ):""
                }

            </Tree>
        </>
    )

}

export default Index;
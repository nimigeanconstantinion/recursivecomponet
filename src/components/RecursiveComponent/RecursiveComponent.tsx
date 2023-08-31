import React, {CSSProperties, useState} from 'react';
import {TreeNode} from "react-organizational-chart";
import styled from "styled-components";
import {useDrag, useDrop} from "react-dnd";
import {NodeProps} from "../Node/index";
import {WrapperRecursiveComp} from "./RecursiveCompenentStyle";
import {WrapperNode} from "../Node/NodeStyle";
import {BKNode} from "../Home";
import {Simulate} from "react-dom/test-utils";
import dragEnd = Simulate.dragEnd;
import Api from "../../Api";


const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

const style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

export interface RecursiveComponentProps {
    id?: string|null,
    name: string,
    data?:BKNode,
    backFunc?:Function,
    children?: RecursiveComponentProps[]
}

const RecursiveComponent:React.FC<RecursiveComponentProps>=({id,name,backFunc,data,children})=>{
    const [ch,setCh]=useState(0);
    // const combinedRefs =React.useCallback((node:RecursiveComponentProps)=>{
    //     dragRef(node);
    //     dropRef(node);
    // },[dragRef,dropRef])

    const [{isDragging}, dragRef] = useDrag(()=>({
        type:"node",
        item: {id:id,name:name,children:children,data:data},
        collect:(monitor) =>({

            isDragging: !!monitor.isDragging(),
        }),

    }));

    const [{canDrop,isOver}, dropRef] = useDrop(() => ({
        accept:"node",
        drop: (item:NodeProps) => addCardToArr(item),
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),

            isOver: !!monitor.isOver(),
        })
    }))

    const combinedRefs = React.useCallback(
        (node: HTMLDivElement) => {
            dragRef(node);
            dropRef(node);
        },
        [dragRef, dropRef]
    );
    const addCardToArr =async (item: NodeProps)=>{

        console.log("Itemul add in subordinates")

        console.log(item.data?.label);
        console.log("------------------------------");
        let adr:RecursiveComponentProps={
            id:item.id,
            name:item.name,
            data:item.data,
            children:new Array<RecursiveComponentProps>()
        }


        children?.push(adr);
        console.log(children);

        addChild(item)
        setCh(prevState => prevState+1);
    }

    let addChild=async (nod:RecursiveComponentProps):Promise<void>=>{
        console.log("--- la drop")
        console.log(data);

        if(nod.data?.label==undefined){
                    let addv:BKNode|null=null;

                    if(data!=null){
                        addv=data;
                    }
                    console.log("Addv=")
                    console.log(addv);

                    let nodBK:BKNode={
                        id:null,
                        label:nod.name,
                        descriere:"",
                        subordinates:[],
                        generatedID:null,
                        cfields:[]

                    }






                    let api=new Api();
                    try{
                        if(data==null||data.id==null||data.label.includes("Base")){
                            let response=await api.addNodetoParent(nodBK,"null");

                        }else{

                            let result=await api.addNodetoParent(nodBK,data.label);

                        }

                    }catch (e) {
                        console.log("EROARE de adaugare NOD");
                        alert("Nodul deja exista!");

                    }

        }else{
          let api=new Api();
          if(nod.id!=null&&nod.id!=undefined&&id!=null&&id!=undefined){
              let resp=await api.dropItem(nod.id,id);
              console.log("Am facut DROp in BKEnd cu reziultat "+resp);
          }

        }

        if(backFunc!=undefined){
            backFunc();

        }

    }

    let clk=(e:EventTarget)=>{

    }


    return (
        <>

                    <TreeNode
                        label={
                        <WrapperRecursiveComp ref= {combinedRefs} >
                                    ID: {id} | Label: {name}
                        </WrapperRecursiveComp>
                    }>
                            {children && children.map((child) => <RecursiveComponent key={child.id} {...child} />)}



                    </TreeNode>

        </>

    );
}

export default RecursiveComponent;
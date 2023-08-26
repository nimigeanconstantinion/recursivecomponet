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
    id: string,
    name: string,
    data?:BKNode,
    children?: RecursiveComponentProps[]
}

const RecursiveComponent:React.FC<RecursiveComponentProps>=({id,name,children})=>{
    const [ch,setCh]=useState(0);

    // const [{isDragging}, drag] = useDrag(()=>({
    //     type:"node",
    //     item: {id:id,name:name,children:children},
    //     collect:(monitor) =>({
    //
    //         isDragging: !!monitor.isDragging(),
    //     }),
    //
    // }));

    const [{isOver}, drop] = useDrop(() => ({
        accept:"node",
        drop: (item:NodeProps) => addCardToArr(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    const addCardToArr = (item: NodeProps)=>{

        console.log("Itemul add in subordinates")
        console.log(item);
        let adr:RecursiveComponentProps={
            id:item.id,
            name:item.name,
            children:new Array<RecursiveComponentProps>()
        }
        children?.push(adr);
        console.log(children);
        setCh(prevState => prevState+1);
    }

    let clk=(e:EventTarget)=>{

    }
    return (
        <>

                    <TreeNode
                        label={
                        <WrapperRecursiveComp ref= {drop} >
                                    ID: {id} | Label: {name}
                        </WrapperRecursiveComp>
                    }>
                            {children && children.map((child) => <RecursiveComponent key={child.id} {...child} />)}



                    </TreeNode>

        </>

    );
}

export default RecursiveComponent;
import React, {useState} from 'react';
import {TreeNode} from "react-organizational-chart";
import styled from "styled-components";
import {useDrag, useDrop} from "react-dnd";
import {NodeProps} from "../Node/index";
import {WrapperRecursiveComp} from "./RecursiveCompenentStyle";
import {WrapperNode} from "../Node/NodeStyle";
import {BKNode} from "../Home";


const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

export interface RecursiveComponentProps {
    id: string,
    name: string,
    data?:BKNode,
    children?: RecursiveComponentProps[]
}

const RecursiveComponent:React.FC<RecursiveComponentProps>=({id,name,children})=>{
    const [ch,setCh]=useState(0);
    const [{isOver}, drop] = useDrop(() => ({
        accept:"node",
        drop: (item:NodeProps) => addCardToArr(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    const addCardToArr = (item: RecursiveComponentProps)=>{

        console.log("Itemul add in subordinates")
        console.log(item);
       // item.subordinates=new Array<RecursiveComponentProps>();
        //let emptySub:RecursiveComponentProps[]=[];
        // if(item.subordinates==undefined){
        //     item.subordinates=emptySub
        // }
        children?.push(item);
        console.log(children);
        setCh(prevState => prevState+1);
        //console.log(subordinates);
    }

    let clk=(e:EventTarget)=>{

    }
    return (
        <>

                    <TreeNode
                        label={
                        <div ref= {drop} >
                                    ID: {id} | Label: {name}
                        </div>
                    }>
                            {children && children.map((child) => <RecursiveComponent key={child.id} {...child} />)}



                    </TreeNode>

        </>

    );
}

export default RecursiveComponent;
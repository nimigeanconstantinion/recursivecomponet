import React, {useRef} from 'react';
import {TreeNode} from "react-organizational-chart";
import styled from "styled-components";
import {useDrag} from "react-dnd";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

interface DraggingRecursiveComponentProps {
    id: string;
    label: string;

    subordinates?: DraggingRecursiveComponentProps[];
}

const DraggingRecursiveComponent:React.FC<DraggingRecursiveComponentProps>=({id,label,subordinates})=>{


    const [{isDragging}, drag] = useDrag(()=>({
        type:"DraggingRecursiveComponent",
        item: {id:id},
        collect:(monitor) =>({

            isDragging: !!monitor.isDragging(),
        }),

    }));


    return (
        <>
            <TreeNode label={<StyledNode>{label}</StyledNode>}>
                {/*ID: {id} | Name: {name}*/}

                {subordinates && subordinates.map((child) => <DraggingRecursiveComponent key={child.id} {...child} />)}

            </TreeNode>


        </>

    );
}

export default DraggingRecursiveComponent;
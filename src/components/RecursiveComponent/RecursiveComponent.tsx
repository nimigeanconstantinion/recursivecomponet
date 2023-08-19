import React from 'react';
import {TreeNode} from "react-organizational-chart";
import styled from "styled-components";
import {useDrag} from "react-dnd";

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

const RecursiveComponent:React.FC<RecursiveComponentProps>=({id,label,subordinates})=>{

   

    return (
        <>
            <TreeNode label={<StyledNode>{label}</StyledNode>}>
                {/*ID: {id} | Name: {name}*/}

                {subordinates && subordinates.map((child) => <RecursiveComponent key={child.id} {...child} />)}

            </TreeNode>


        </>

    );
}

export default RecursiveComponent;
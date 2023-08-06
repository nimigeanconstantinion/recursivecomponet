import React from 'react';
import {TreeNode} from "react-organizational-chart";

interface RecursiveComponentProps {
    id: string;
    label: string;

    children?: RecursiveComponentProps[];
}

const RecursiveComponent:React.FC<RecursiveComponentProps>=({id,label,children})=>{
    return (
        <>
            <TreeNode>
                <div>
                    ID: {id} | Name: {label}
                </div>
                {children && children.map((child) => <RecursiveComponent key={child.id} {...child} />)}
            </TreeNode>
        </>

    );
}

export default RecursiveComponent;
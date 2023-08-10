import React from 'react';
import {Tree,TreeNode} from "react-organizational-chart";
import styled from "styled-components";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

interface RecursiveComponentProps {
    id: number;
    name: string;
    children?: RecursiveComponentProps[];
}

const RecursiveComponent: React.FC<RecursiveComponentProps> = ({ id, name, children }) => {
    return (
        <>
            <TreeNode  label={<StyledNode>{name}</StyledNode>}>
                {/*ID: {id} | Name: {name}*/}
                {children && children.map((child) => <RecursiveComponent key={child.id} {...child} />)}

            </TreeNode>
        </>
    );
};


// import React from 'react';
// import RecursiveComponent from './RecursiveComponent';

const Appp: React.FC = () => {

    const data: RecursiveComponentProps = {
        id: 1,
        name: 'Parent',
        children: [
            {
                id: 2,
                name: 'Child 1',
                children: [
                    {
                        id: 3,
                        name: 'Grandchild 1',
                        children: [
                            {
                                id: 6,
                                name: 'Grandchild 11',
                                children: [],
                            }
                        ],
                    },
                    {
                        id: 4,
                        name: 'Grandchild 2',
                        children: [],
                    },
                ],
            },
            {
                id: 5,
                name: 'Child 2',
                children: [],
            },
        ],
    };

    return (
        <>
            <h1>Recursive Component Example</h1>
            <Tree lineWidth={'2px'}
                           lineColor={'green'}
                           lineBorderRadius={'10px'}
                           label={<StyledNode>Root</StyledNode>}>
                <RecursiveComponent {...data} />

            </Tree>
        </>
    );
};

export default Appp;
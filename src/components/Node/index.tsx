import type { CSSProperties, FC } from 'react';
import { useDrag } from 'react-dnd';
import {RecursiveComponentProps} from "../RecursiveComponent/RecursiveComponent";
import {WrapperNode} from "./NodeStyle";
import {BKNode} from "../Home";

const style: CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

export interface NodeProps {

    id:string,
    name: string,
    children?:NodeProps[]
}


export const Nod :React.FC<NodeProps> = (({id, name,children}) =>{

    const [{isDragging}, drag] = useDrag(()=>({
        type:"node",
        item: {id:id,name:name,children:children},
        collect:(monitor) =>({

            isDragging: !!monitor.isDragging(),
        }),

    }));


    return(


        <div ref={drag} >
            ID: {id} | Name: {name}
        </div>


    )

});

export default Nod;


import Nod, {NodeProps} from "../Node";
import {WrapperAside} from "./AsideStyle";

const nodes=[
    {
    id:"51",
    name:"Copil 51",
    subordinates:[]
},
    {
    id: "52",
    name: "Copil 52",
        subordinates:[]
},
    {
        id: "53",
        name: "Copil 53",
        subordinates:[]
    },{
        id: "54",
        name: "Copil 54",
        subordinates:[]
    }]

const Index=()=>{


    return (
        <WrapperAside>
            {
                nodes.length>0?(
                    <>
                        {
                            nodes.map(n=>
                                <Nod  id={n.id} name={n.name} children={new Array<NodeProps>()}/>
                            )
                        }
                    </>
                ):""
            }

        </WrapperAside>
        )
}

export default Index;

import React from 'react';
import io from 'socket.io-client'

export const StoreContext = React.createContext();
/*
  action.payload
    msg: { from:'user1', msg:'hello', topic:'generator1'},
      
  state:[
    topic1:[ {msg}, {msg}, {msg} ],
    topic2:[ {msg}, {msg}, {msg} ],
    topic3:[ {msg}, {msg}, {msg} ],
  ]  
*/
const initialState={
    topicA:[
        {from:'user1',msg:'hello1'},{from:'user2',msg:'hello2'},{from:'user3',msg:'hello3'}
    ],
    topicB:[
        {from:'good1',msg:'bye1'},{from:'good2',msg:'bye2'},{from:'good3',msg:'bye3'}
    ]
}

let socket;

const reducer = (state,action) =>{
    const {from,msg,topic}=action.payload
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            return{
                ...state,            //get context of state
                [topic]:[            //select on [topic] to edit
                    ...state[topic],  // { {msg}, {msg}, {msg}
                    {from,msg}       // add new msg 
                ]
            }
        default:
            return state            // = allChats
    }
}    

const StoreContextProvider=(props)=>{  

    if(!socket){
        socket=io(':3001')
        socket.on('chat message',(msg)=>{
            dispatch({type:'RECEIVE_MESSAGE',payload:msg})
        })
    }

    const user="Nikhom"+Math.random(100).toFixed(2)

    const sendChatAction = (value) =>{
        socket.emit('chat message',value)
    }

   
        //[state,changeState] 
    const [allChats,dispatch] = React.useReducer(reducer,initialState)
   
    return(                             // {allChats:allChats}
        <StoreContext.Provider value={{allChats,sendChatAction,user,dispatch}}>   
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
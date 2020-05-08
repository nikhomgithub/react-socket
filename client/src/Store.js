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
//อะไรคือการใช้ reducer คือ การ แก้ไข ค่า state ด้วย dispatch หรือ เรียกว่า การ setState ก็ได้ 
//dispatch มีความหมายว่า โปรดเรียกใช่ ฟังก์ชัน (action.type)  ที่มีค่า argument (action.payload) 
//ส่วนกระบวนการ dispatch เรากระทำผ่าน คำสั่ง switch ส่วน case ต่างๆ ก็เปรียบเสมือน ชื่อฟังก์ชันนั่นเอง
//เช่น  case 'RECEIVE_MASSAGE' ก็คือชื่อนฟังก์ชัน receive_message(payload) 
// แล้วทำการแก้ไขค่า state ด้วย return แทนที่จะเป็น setState ทั่วไป 
const StoreContextProvider=(props)=>{  

//การใช้งาน socket io ก็ต้องเริ่มด้วยการเชื่อมต่อกับ server เหมือนกับที่เราต้อ  axios.get เพื่อเอาข้อมูลหลักมาเก็บไว้ใน context นั่นเอง
//การเชื่อมต่อกับ server ใช้ socket=io(':3001')
//server รอการเชื่อมต่อด้วย io.on('connection', (socket) => { callback() })
//พอเชื่อมต่อก็ได้ socket มาใช้งาน 
//การใช้งาน เช่น การส่งค่าไปยังเซิฟเวอร์ด้วยคำสั่ง socket.emit('ชื่อหัวข้อ',value)
//ส่วนการรอรับ value ด้วยคำสั่ง socket.on('ชื่อหัวข้อ',value=>{ callback() })
//ในที่นี้ callback คือ dispatch (type ชื่อฟังก์ชัน, payload ค่าแวลู )
  if(!socket){
        socket=io(':3001')
        socket.on('chat message',(msg)=>{
            dispatch({type:'RECEIVE_MESSAGE',payload:msg})  // หมายถึง receive_message(msg)
        })
    }

    const user="Nikhom"+Math.random(100).toFixed(2)

    const sendChatAction = (value) =>{
        socket.emit('chat message',value)
    }
    //ฟังก์ชัน sendChtAction (value) เป็นคำสั่ง 
   
        //[state,setState] 
    const [allChats,dispatch] = React.useReducer(reducer,initialState)
   
    return(                        // {allChats:allChats}
        <StoreContext.Provider value={{allChats,dispatch,sendChatAction,user}}>   
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

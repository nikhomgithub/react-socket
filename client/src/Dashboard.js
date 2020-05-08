import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {StoreContext} from './Store';

const useStyles = makeStyles(theme => ({
    root: {
      border:'gray 0.5px solid',
      margin:'50px',
      padding: theme.spacing(3, 2),
    },
    flex:{
      display:'flex',
      alignItems:'center'
    },
    topicWindow:{
        width:'20%',
        height:'300px',
        borderRight:'gray 0.5px solid'
    },
    chatWindow:{
        width:'80%',
        height:'300px',
        padding:'20px'
    },
    chip: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
    },
    textField: {
        width:'85%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button:{
        width:'15%',
        height:'50px'
    },
}));
//ใน material ui เราใช้กำหนด css ด้วย makeStyles()
//
const Dashboard=(props)=>{
    const classes = useStyles();
    const [textvalues, setTextvalues] = React.useState('');
    //CTX store
    const {allChats,dispatch,sendChatAction,user} = React.useContext(StoreContext)        //{allchats:allChats}
    console.log(allChats)
    //topic1: (3) [{…}, {…}, {…}]
    //topic2: (3) [{…}, {…}, {…}]
    const topics = Object.keys(allChats) //creat array from keys of object
    //console.log(topics)
    //["topic1", "topic2"]
    const [activeTopic, changeActivetopic] = React.useState(topics[0]) //ค่าเริ่มต้นคือ topic[0]
    //<list> ถ้าเรา onClick=ก็กำหนด ค่า activeTopic ใหม่ 
    //เราเลือกแสดง  allChat[activeTopic]
    
    //
    return(
    <div>
        <Paper className={classes.root}>
            <Typography variant="h4">
                Chat App
            </Typography>
            <Typography variant="h6">
                {activeTopic}
            </Typography>
            <div className={classes.flex}>
                <div className={classes.topicWindow}>
                    <List>
                        {
                            topics.map(topic=>(
                                <ListItem onClick={e=>changeActivetopic(e.target.innerText)} key={topic} button>
                                    <ListItemText primary={topic} />
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
                <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat,index)=>(
                              <div className={classes.flex} key={index}>
                                  <Chip label={chat.from} className={classes.chip}/>
                                  <Typography variant="h6">{chat.msg}</Typography>
                              </div>
                            ))
                        }
                </div>
            </div>
            <div className={classes.flex}>
                <TextField
                    id="standard-name"
                    label="Send to chat"
                    className={classes.textField}
                    value={textvalues}
                    onChange={e=>{
                                    e.preventDefault();
                                    setTextvalues(e.target.value)
                              }}
                    margin="normal"
                />
                <Button 
                    variant="contained" 
                    className={classes.button} 
                    onClick={()=>{
                        sendChatAction({from:user,msg:textvalues,topic:activeTopic})
                        setTextvalues('')
                    }}    
                >
                    Chat
                </Button>        
            </div>
        </Paper>
    </div>
    )
}

export default Dashboard;


//1. Client connection
//2. Server listening
//3. Client emit message to server
//4. Server broadcast
//5. Client receive

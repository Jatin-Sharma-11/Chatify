import Sidebar from "../../components/Sidebar";
import { Avatar, Flex, FormControl, Heading, Input, Button, IconButton,Text } from "@chakra-ui/react";
//import { ArrowForwardIcon } from "@chakra-ui/icons";
//
//<IconButton bgColor="green.600" size="sm"  isRound icon = {<ArrowForwardIcon />}/>
import Head from "next/head";
import { useRouter } from "next/router"
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { addDoc, collection, doc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebaseconfig";
import { useAuthState } from 'react-firebase-hooks/auth';
import getOtherEmail from "@/utils/getOtherEmail";
import {useState, useCallback } from "react";
const Topbar = ({email}) => {
    return (
        <Flex
           bg="green.200"
           h="81px"
           w="100%"
           align="center"
           p={5}
        >
            <Avatar src="" marginEnd={3}/>
            <Heading size="lg">{email}</Heading>
        </Flex>
    )
}

const Bottombar = ({id,user}) => {
   const [input, setInput] = useState("")

   const sendMessage = async (e) => {
  
       e.preventDefault();
      

        await addDoc(collection(db, `chats/${id}/messages`), {
            text : input,
            sender : user.email,
            timestamp : serverTimestamp()
         })
         setInput("");

    
      
   }



    

    return (
        <FormControl
          p={3}
          onSubmit={sendMessage}
          as="form"
        > 
            <Flex
               bgColor="white"
               align="center" 
            >
            <Input placeholder="Type a message..." bg="white" autoComplete="off" onChange = {e => setInput(e.target.value)} value={input} />
            <Button type="submit"  color="green.800" onClick = {sendMessage}>Send</Button>
           
            </Flex>
            
         
        </FormControl>
    )
}

export default function Chat() {

   const router = useRouter();
   const { id } = router.query;
   const [user] = useAuthState(auth);

   const q = query(collection(db, "chats", id, "messages"), orderBy("timestamp"));
   const [messages] = useCollectionData (q);
   const[chat] = useDocumentData(doc(db,"chats",id));

   const getMessages = () => 
        messages?.map(msg => {
        const sender = msg.sender === user.email;

         return (
            <Flex key ={Math.random()} alignSelf={sender ? "flex-start" : "flex-end"} bg={sender ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
               <Text>{msg.text}</Text>
            </Flex>
         )

        })

    return (
        <Flex
          h="100vh"

        >
         <Head>
            <title>Chatify</title>
         </Head>

            <Sidebar />
            <Flex
              bg="green.50"
              flex={1} 
              direction="column"
            >
                <Topbar email={getOtherEmail(chat?.users, user)}/>

                <Flex flex={1} direction="column" pt={4} mx={5} overflowX="scroll" css={{
                    "&::-webkit-scrollbar": {
                      display: "none"
                    }
                }}>
                {getMessages()}
                  
                </Flex>
                <Bottombar id={id} user={user} />

            </Flex>
        </Flex>
    )
}
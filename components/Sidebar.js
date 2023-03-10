import { Avatar, Center, Flex, IconButton,Text,Button } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebaseconfig";
import getOtherEmail from "../utils/getOtherEmail";

import { useRouter } from "next/router";



export default function Sidebar() {
    const [user] = useAuthState(auth);
    const [snapshot, loading, error] = useCollection(collection(db,"chats"));
    const chats =snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));
    const router = useRouter();

    const redirect = (id) => {
        router.push(`/chat/${id}`);

    }

    const chatExits = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

    const newChat = async () => {
        const input = prompt("Enter email of chat recipient");
        if(input.length > 0) {
            if (!chatExits(input) && input !=user.email && input != null){
                await addDoc(collection(db,"chats"),{users :[user.email, input]})
            }
        }
       
        
    }


    const chatList = () => {
        return (
            chats?.filter(chat => chat.users.includes(user.email))
            .map(
                chat =>
                <Flex key={Math.random()} p={3} align="center" _hover={{bg:"green.50", cursor:"pointer"}} onClick={() => redirect(chat.id)}>
                    <Avatar src="" marginEnd={3}/>
                    <Text>{getOtherEmail(chat.users, user)}</Text>
                </Flex>
            )
            
        )
    }
    return (
        <Flex 
          //bg="green.100"
          w="300px"
          h="100%"
          direction="column"
          borderEnd="5px solid" borderColor="green.100"
        >
            <Flex
                bg="green.600"
                h="81px" w="100%"
                alignItems="center"
                justifyContent="space-between"
                p={3}
                borderBottom="1px solid" borderColor="green.400"
            >
                <Flex 
                    align="center" 
                    
                >
                <Avatar marginEnd={3} src={user.photoURL} />
                <Text color="white">{user.displayName}</Text>
                </Flex>
                
                <IconButton size="sm" isRound icon = {<ArrowLeftIcon />} onClick={() => signOut(auth)}/>

            </Flex>
            <Button m={5} p={4} bg="green.100" border="2px solid" borderColor="green.600" onClick={() => newChat()}>New Chat</Button>
            <Flex 
                overflowX="scroll" 
                direction="column" 
                css={{
                    "&::-webkit-scrollbar": {
                      display: "none"
                    }
                }}
                flex={1}
            >
                {chatList()}
                
                
            </Flex>
           

        </Flex>
    )

}
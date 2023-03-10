import Head from "next/head";
import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
export default function Login(){
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <>  <Head>
               <title>Login</title>   
           </Head>
           <Center
              h="100vh"
           >
            <Stack 
                align="center"
                bgColor="green.100"
                p={20}
                rounded="3xl"
                spacing={12}
                boxShadow="lg"
                >
               <Box
                  bgColor="green.500"
                  w="fit-content"
                  p={5}
                  rounded="3xl"
                  boxShadow="md"
                >
                   <ViewIcon w="100px" h="100px" color="white" />
                </Box>
                <Button boxShadow="md" onClick={()=> signInWithGoogle("", {prompt: "select_account"})}>Sign In with Google</Button>
                <Text>Made With 💗 by Jatin Sharma</Text>
            </Stack>
           
           </Center>
           
        
           

        </> 
    )
}
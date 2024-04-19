import { StyleSheet } from "react-native";


const loginStyle = StyleSheet.create({
    signupView:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'100%',
        flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    gap:10,
   

    },
    overlay:{
       alignItems:'center',
       width:'80%',
       height:380,
       justifyContent:'center',
       gap:10,
       borderRadius:30,
      borderWidth:5,
     borderColor:'#fff'

    },
    inputs:{
        backgroundColor:'#BEFCFF',
        width:'80%',
        padding:5,
        borderRadius:10,
        fontSize:16
    },
    signupBtn:{
        backgroundColor:'#005258',
        width:'30%',
        padding:10,
        borderRadius:20,
        alignItems:'center',
        marginTop:10

    },
    switchAccount:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginHorizontal:20
    },
    switchBtn:{
        backgroundColor:'#2F8E53',
        width:'30%',
        padding:10,
        borderRadius:20,
        alignItems:'center',
    }
});

export default loginStyle;
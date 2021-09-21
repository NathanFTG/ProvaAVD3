import React from "react";
import{
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet
} from 'react-native'


interface ButtonProps extends TouchableOpacityProps { 
    title: string;
}
export function Button({title, ...rest }: ButtonProps) {
    return(
        <TouchableOpacity 
            style={styles.button}
             activeOpacity={0.7}
            {...rest}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor:'#F0F8FF',
        padding:15,
        borderRadius:20,
        alignItems:'center',
        marginTop:10
    },
    buttonText: {
        color: '#000000',
        fontSize:18,
        fontWeight:'bold'
    },
})
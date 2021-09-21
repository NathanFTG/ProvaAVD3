import React from "react";
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View} from 'react-native'

interface ISkillCaraProps extends TouchableOpacityProps {
    Pais: string,
    CodigoPais: string,

}

export function SkillCard({Pais,CodigoPais, ...rest}: ISkillCaraProps){
    return (
        <TouchableOpacity 
            style={styles.buttonSkill} 
            {...rest} 
        >
           <Text style={styles.textSkillPais}>
            {Pais}
            </Text>
            <Text style={styles.textSkillCodigoPais}>
            {CodigoPais}
            </Text>
       </TouchableOpacity>       
    )
}
const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#B0C4DE',
        padding:15,
        borderRadius:20,
        alignItems: 'center',
        marginBottom: 15,
    },
    textSkillPais: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    textSkillCodigoPais: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
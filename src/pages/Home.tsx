import React, { useState,useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, ScrollView, FlatList,Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import  { Button }  from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface Cadastro{
    id: string,
    pais: string,
    codigoPais: string
}


export function Home(){

    const [newPais, setNewPais] = useState('')
    const [myPais, setMyPais] = useState<Cadastro[]>([])
    const [newCodigoPais, setNewCodigoPais] = useState('')
    const [myCodigoPais, setMyCodigoPais] = useState<Cadastro[]>([])
    const [greeting, setGreeting] = useState('')

    function handleAddNew(){
        if(newPais.trim()!=="" && newCodigoPais.trim()!=="") {
        const Dati = {
            id: String(new Date().getTime()),
            pais: newPais,
            codigoPais: newCodigoPais,
        }
        setMyPais([...myPais,Dati])
        setNewPais('')
        setMyCodigoPais([...myCodigoPais,Dati])
        setNewCodigoPais('')
    }
    }

    function handleRemove(id: string){
        setMyPais(myPais.filter(Cadastro=> Cadastro.id !== id))

    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >=5 && currentHour < 12){
            setGreeting('Bom dia')
        }else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Boa Tarde')
        } else {
            setGreeting('Boa Noite')
        }
    }, [])

    useEffect(() => {
        async function loadData() {
            const storagedSkills = await AsyncStorage.getItem('@myPais:Pais')
            if(storagedSkills){
                setMyPais(JSON.parse(storagedSkills))
            }
        }
        loadData()
    }, [])

    useEffect (() =>{
        async function saveData(){
            await AsyncStorage.setItem('@myPais:Pais', JSON.stringify(myPais))
        }
        saveData()
    },[myPais])

  return(
    <>
        
        <View style={styles.container}>
        
            <Image style={{width:150,height:170}} source={require('../assets/2022.png')}/>
            <Text style={styles.title}>Inscrição dos Países.</Text>
            <Text style={styles.greetings}>
                {greeting}
            </Text>
        
            <TextInput
            style={styles.input}
            placeholder= 'País'
            value={newPais}
            placeholderTextColor='#555'
            onChangeText={value => setNewPais(value)}
            />

            <TextInput
            style={styles.input}
            placeholder= 'Codigo do País'
            value={newCodigoPais}
            placeholderTextColor='#555'
            onChangeText={value => setNewCodigoPais(value)}
            />

            <Button 
            onPress={handleAddNew}
            title = 'Cadastrar'
            />

            <Text style={[styles.title, {marginVertical:10}]}>
                Paises confrimados:
            </Text>
            
            <FlatList showsVerticalScrollIndicator={false}
            data={myPais}
            keyExtractor={item=> item.id}
            renderItem={({item})=> ( 
                <SkillCard
                Pais={item.pais}
                CodigoPais={item.codigoPais}
                onPress={() => handleRemove(item.id)}
                />
            )}
            />
            <Image style={{width:100,height:30}} source={require('../assets/Fifa.png')}/>
        </View>
    </>
  )
}

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#4682B4',
        paddingHorizontal:30,
        paddingVertical: 70
    },
    title: {
        color:'#191970',
        fontSize:30,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor:'#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS =='ios' ? 15 : 12,
        marginTop: 5,
        borderRadius: 30
    },
    greetings: {
        color: '#000000',
        fontSize:20,
    }, 
})
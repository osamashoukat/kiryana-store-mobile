import React, { useEffect } from 'react'
import { Keyboard, Text, View, ScrollView, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, TouchableOpacity, Image, Linking, StyleSheet } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { my_order } from '../../store/action';
import { Card, ListItem, Button, Icon } from 'react-native-elements'



const UserPending = () => {
    const dispatch = useDispatch()
    const myOrder = useSelector(state => state.myOrder)

    useEffect(() => {
        dispatch(my_order())
    }, [])

    const renderPendingMyOrder = () => {
        if (myOrder) {
            return Object.keys(myOrder).map((val, key) => {
                if (myOrder[val].status === "PENDING") {
                    return (
                        <Card >
                            {/* {console.log(myOrder[val].status)} */}
                            <>
                                <View style={styles.cardRender} key={key}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 , textAlign : 'center'}}>{myOrder[val].userName}</Text>
                                    <Text style={{textAlign : 'center'}}>STATUS : <Text style={{color : 'red'}}>{myOrder[val].status}</Text></Text>
                                    {Object.keys(myOrder[val].itemsList).map((val2, key) => {
                                        return (
                                            <View key={key}>
                                                <Image
                                                    style={{ height: 150, width: "100%" }}
                                                    source={{ uri: myOrder[val].itemsList[val2].itemImageUrl }}></Image>
                                                <Text>NAME : {myOrder[val].itemsList[val2].itemTitle}</Text>
                                                <Text>TYPE : {myOrder[val].itemsList[val2].itemIngredients}</Text>
                                                <Text>RS.{myOrder[val].itemsList[val2].itemSalePrice}</Text>
                                                <Card.Divider></Card.Divider>
                                            </View>
                                        )
                                    })
                                    }
                                </View>
                                <View>
                                    <Button
                                        title="Store Location"
                                        buttonStyle={styles.button}
                                        onPress={() => {
                                            if (myOrder[val].userMapLink != undefined || myOrder[val].userMapLink != null) {
                                                Linking.openURL(`${myOrder[val].userMapLink}`)
                                            }
                                        }} />
                                    <Text>Total = RS.{myOrder[val].totalPrice}</Text>
                                </View>
                            </>
                        </Card>
                    )
                }
            })
        }
    }

    return (
        <ScrollView>
            <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>PENDING</Text>
            {renderPendingMyOrder()}
        </ScrollView>

    )
}

export default UserPending;

const styles = StyleSheet.create({
    cardRender: {
        flex: 1,
    },
    button : {
        backgroundColor : "orange",
        borderWidth : 1,
        borderColor : 'black',
    }
})
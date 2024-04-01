import React from "react"
import { View, Text, StatusBar, TouchableOpacity, ScrollView } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
export default class Orders extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
                <StatusBar backgroundColor={"#f20404"} barStyle="light-content" />
                <View style={{
                    height: "10%",
                    backgroundColor: "#f20404",
                    justifyContent: "center",
                    padding: 15,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 10,
                            borderColor: "#fff",
                            borderWidth: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Icon name="angle-right" size={20} color={"#fff"} />

                    </TouchableOpacity>
                    <View style={{
                        // backgroundColor: "#414",
                        width: "85%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>الطلبات</Text>
                    </View>
                </View>

                <ScrollView>
                    <View style={{
                        // height: "100%",
                        alignItems: "center",
                        // justifyContent: "space-evenly",
                        // backgroundColor: "#414",
                        // paddingVertical: 10

                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("NewOrders")
                            }}
                            style={{
                                height: 100,
                                backgroundColor: "#f20404",
                                elevation: 4,
                                width: "90%",
                                // alignSelf: "center",
                                borderRadius: 10,
                                marginVertical: 10

                            }}>
                            <View style={{
                                width: "95%", backgroundColor: "#fff", height: "100%",
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>طلبات جديده</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("Pending_Orders")
                            }}
                            style={{
                                height: 100,
                                backgroundColor: "#f20404",
                                elevation: 4,
                                width: "90%",
                                // alignSelf: "center",
                                borderRadius: 10,
                                marginVertical: 10

                            }}>
                            <View style={{
                                width: "95%", backgroundColor: "#fff", height: "100%",
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>طلبات قيد التنفيذ</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("The_way_Orders")
                            }}
                            style={{
                                height: 100,
                                backgroundColor: "#f20404",
                                elevation: 4,
                                width: "90%",
                                // alignSelf: "center",
                                borderRadius: 10,
                                marginVertical: 10

                            }}>
                            <View style={{
                                width: "95%", backgroundColor: "#fff", height: "100%",
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>طلبات في الطريق</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity

                            onPress={() => {
                                this.props.navigation.navigate("Finished_Orders")
                            }}


                            style={{
                                height: 100,
                                backgroundColor: "#f20404",
                                elevation: 4,
                                width: "90%",
                                // alignSelf: "center",
                                borderRadius: 10,
                                marginVertical: 10

                            }}>
                            <View style={{
                                width: "95%", backgroundColor: "#fff", height: "100%",
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>طلبات منتهيه</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("Rejected_Orders")
                            }}
                            style={{
                                height: 100,
                                backgroundColor: "#f20404",
                                elevation: 4,
                                width: "90%",
                                // alignSelf: "center",
                                borderRadius: 10,
                                marginVertical: 10

                            }}>
                            <View style={{
                                width: "95%", backgroundColor: "#fff", height: "100%",
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>طلبات مرفوضه</Text>
                            </View>

                        </TouchableOpacity>


                    </View>


                </ScrollView>


            </View >
        )
    }
}







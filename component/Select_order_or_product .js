import React from "react"
import { View, Text, StatusBar, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
export default class Select_order_or_product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                    {/* <TouchableOpacity
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

                    </TouchableOpacity> */}
                    <View style={{
                        // backgroundColor: "#414",
                        width: "85%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>الطلبات و المنتجات </Text>
                    </View>
                </View>


                <View style={{
                    height: "90%",
                    alignItems: "center",
                    // justifyContent: "center",

                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Orders")
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
                            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>الطلبات </Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Products")
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
                            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>المنتجات</Text>
                        </View>

                    </TouchableOpacity>


                </View>





            </View >
        )
    }
}







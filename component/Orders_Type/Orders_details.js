import React from "react"
import {
    View, Text, StatusBar, ScrollView, TouchableOpacity,
    Image, Modal, FlatList,
    StyleSheet
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Svg, Polygon } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import axios from "axios";
import LottieView from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import NetInfo from '@react-native-community/netinfo';
import Api from "../../Constant/Api"
import Myloading from "./loading2"
import { Button } from 'react-native-paper';
export default class Orders_details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Orders_details: [],
            pageLoading: true,
            connected: "",
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: ""
        }
    }

    componentDidMount() {
        const unsubscripe = NetInfo.addEventListener(state => {
            this.setState({
                connected: state.isConnected ? true : false
            })
            if (!state.isConnected) {
                this.setState({ pageLoading: false })
            }
            // 
            this.OrdersDetails()


        })
        return unsubscripe

    }
    async OrdersDetails() {
        let data_to_send = {
            order_id: this.props.route.params.order_id
        }
        // console.log(data_to_send)
        let fetch = await axios.post(Api.Domain + "select_order_products.php", data_to_send);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {
                this.setState({
                    Orders_details: res.message, pageLoading: false,

                })
                // console.log(JSON.stringify(this.state.Orders_details));

            } else {
                this.setState({
                    AlertModalShow: true,
                    AlertModalRes: "error",
                    AlertModalMessage: "حدث خطأ ما "
                })
            }
        } else {
            this.setState({
                AlertModalShow: true,
                AlertModalRes: "error",
                AlertModalMessage: "حدث خطأ ما "
            })
        }
        this.setState({ pageLoading: false })
    }
    closeModal = () => {
        this.setState({
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: ""
        })

    };
    _renderHeader() {
        return (
            <>
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
                        width: "85%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>الطلبات</Text>
                    </View>
                </View>
            </>
        )
    }
    _renderBody() {
        if (this.state.pageLoading == true) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        numColumns={2}
                        keyExtractor={item => `mp#-${item}`}
                        data={['0', '1', '2', '3', '4', '5', '6', '7']}
                        renderItem={() => <Myloading />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            );
        }

        if (this.state.connected == false) {
            return (
                <View style={{ height: '100%', width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                    <LottieView
                        source={require("../../photo/lottie/No_Internet.json")}
                        autoPlay
                        loop
                        style={{ height: RFValue(180), width: '100%' }}
                        resizeMode="contain"
                    />
                    <Text
                        style={{
                            fontSize: RFValue(16),
                            color: "#000",
                        }}>
                        الرجاء الاتصال بالإنترنت
                    </Text>
                </View>
            );
        }
        return (

            <View style={{

                alignItems: "flex-start",
                justifyContent: "space-around",
                flexDirection: "row",
                marginBottom: 100
            }}>

                <FlatList
                    numColumns={2}
                    keyExtractor={item => `wcp22#-${item}`}
                    data={this.state.Orders_details}
                    renderItem={({ item, index }) =>
                        <Animatable.View duration={1500} animation="zoomIn" delay={index * 100}>
                            <View

                                style={{
                                    // backgroundColor: "#185",
                                    // height: 350,
                                    // width: 200,
                                    padding: 10,
                                    alignItems: "center",
                                    justifyContent: "space-around"

                                }}>
                                {/* دي الصوره  */}
                                <View style={{
                                    height: 250,
                                    width: 180,
                                    backgroundColor: "#f20404",
                                    borderRadius: 10,
                                    elevation: 5,
                                    shadowOffset: 10
                                    // position: "absolute"
                                }}>

                                    <Svg height="100%" width="100%" style={{ padding: 10 }}>
                                        <Polygon points="0,0 190,0 0,150" fill="white" />
                                        <Image
                                            source={{ uri: item.product_image }}
                                            style={{
                                                height: 150,
                                                width: 150,
                                                resizeMode: 'center',
                                                alignSelf: "center",
                                                // backgroundColor: "#777",
                                                marginTop: 20
                                                // borderTopLeftRadius: 1500
                                            }} />
                                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>{item.product_title}</Text>
                                        <Text style={{ color: "#fff", fontSize: 15, }} >عدد المطلوب : {item.product_count}</Text>
                                        {/* <Text style={{ color: "#fff", fontSize: 15, }} >السعر الكلي: {item.product_total_price}</Text> */}

                                        {/* <Text style={{ color: "#fff", fontSize: 15, }} >{item.product_description}</Text> */}

                                    </Svg>

                                </View>


                            </View>
                        </Animatable.View>

                    }


                    ListEmptyComponent={() => {
                        if (this.state.pageLoading == false) {
                            return (
                                <View style={{
                                    marginVertical: 100,
                                    // backgroundColor: "#010",
                                    height: '100%', width: "100%", alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <LottieView
                                        source={require("../../photo/lottie/EmptyList.json")}
                                        autoPlay
                                        loop
                                        style={{ height: RFValue(180), width: '100%' }}
                                        resizeMode="contain"
                                    />
                                    <Text
                                        style={{
                                            fontSize: RFValue(16),
                                            color: "#000",
                                        }}>
                                        لا توجد طلبات
                                    </Text>
                                </View>
                            );
                        }
                        return <View />;
                    }}


                    showsVerticalScrollIndicator={false}
                />



            </View>

        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                {this._renderHeader()}
                {this._renderBody()}
                <Modal
                    visible={this.state.AlertModalShow}
                    transparent={true}
                    onRequestClose={() => {
                        this.closeModal();
                    }}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                            style={{ ...StyleSheet.absoluteFillObject }}
                            onPress={() => {
                                this.closeModal();
                            }}></TouchableOpacity>
                        <View
                            style={{
                                width: 350,
                                // height: 250,
                                borderRadius: 10,
                                backgroundColor: '#fff',
                                padding: 10,
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <LottieView
                                source={this.state.AlertModalRes == 'succ' ? require("../../photo/lottie/success.json") : require("../../photo/lottie/error.json")}
                                autoPlay
                                loop
                                style={{ height: 100, width: '100%' }}
                                resizeMode="contain"
                            />
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: "#000"
                                }}>
                                {this.state.AlertModalMessage}
                            </Text>
                            <Button
                                mode="contained"
                                color={this.state.AlertModalRes == 'succ' ? "#ddd" : "#f20404"}
                                onPress={() => {
                                    this.closeModal();
                                }}
                                style={{
                                    marginTop: RFValue(10),
                                    width: '90%',
                                    // backgroundColor: res == 'succ' ? COLORS.primary : COLORS.red,
                                }}
                                labelStyle={{

                                    color: '#000',
                                }}>
                                إغلاق
                            </Button>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }

}




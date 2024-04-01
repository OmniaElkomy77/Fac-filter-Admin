import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TextInput,
    ScrollView,
    Modal,
    StatusBar
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Api from "../../Constant/Api"
import axios from 'axios';
import MyLoader from './loading';
import LottieView from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment/moment';
import 'moment/locale/ar';

export default class Finished_Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FinishedOrder_arr: [],
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
            this.FinishedOrder_fun()


        })
        return unsubscripe
    }




    async FinishedOrder_fun() {
        let data_to_send = "start"
        let fetch = await axios.post(Api.Domain + "select_finished_orders.php", data_to_send);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {
                this.setState({
                    FinishedOrder_arr: res.message,
                    pageLoading: false,

                })

                // console.log(JSON.stringify(res.message));

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
    handelTime(time) {
        let s = moment(time).utc().fromNow();
        return s;
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
                        <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>الطلبات  المنتهية</Text>
                    </View>
                </View>
            </>
        )
    }
    _renderBodyOrder() {
        if (this.state.pageLoading == true) {
            return (
                <FlatList
                    keyExtractor={item => `wcp22#-${item}`}
                    data={["0", "1", "2", "3", "4", "5", "6", "7"]}
                    renderItem={() =>
                        <MyLoader />

                    }
                    showsVerticalScrollIndicator={false}
                />
            )
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
            <>
                <View style={{ marginBottom: 100 }}>

                    <FlatList
                        keyExtractor={item => `wcp22#-${item}`}
                        data={this.state.FinishedOrder_arr}
                        renderItem={({ item, index }) =>
                            <Animatable.View duration={1000} animation="fadeInUpBig" delay={index * 100}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("Orders_details", {
                                            order_id: item.order_id
                                        })
                                    }}

                                    style={{
                                        // height: 100,
                                        padding: 15,
                                        width: "90%",
                                        backgroundColor: "#fff", elevation: 4,
                                        alignSelf: "center",
                                        marginVertical: 10,
                                        borderRadius: 10,
                                        alignItems: "center",
                                        flexDirection: "row",
                                        justifyContent: "space-around"
                                    }}>
                                    <View style={{
                                        width: "10%",
                                        alignItems: "flex-start",
                                    }}>
                                        <Ionicons name={'create'} size={25} color={"#f20404"} />
                                    </View>
                                    <View style={{

                                        width: "70%"
                                    }}>
                                        <View style={{

                                            justifyContent: "center", alignItems: "flex-start"
                                        }}>
                                            <Text style={{ color: "#000", fontWeight: "bold" }}>#{item.order_id}</Text>
                                        </View>


                                        <View style={{
                                            // backgroundColor: "#747"
                                            alignItems: "flex-start",

                                        }}>
                                            <Text style={{ color: "#777" }}>سعر الطلبات: {item.order_products_price}</Text>
                                            <Text style={{ color: "#777" }}>سعر التوصيل: {item.order_delivery_fee}</Text>
                                            <Text style={{ color: "#777" }} >السعر الكلي: {item.order_total_price}</Text>
                                            {item.order_refuse_reason != 0 ?
                                                <Text style={{ color: "#777" }} >سبب الرفض: {item.order_refuse_reason}</Text>
                                                : null
                                            }
                                        </View>

                                        {item.order_notes == null ?
                                            null :
                                            <View style={{

                                                justifyContent: "center"
                                            }}>
                                                <Text style={{ color: "#777" }}>ملاحظه:{item.order_notes}</Text>
                                            </View>
                                        }


                                    </View>
                                    {item.order_date == null ?
                                        null :
                                        <View style={{

                                            alignSelf: "flex-start"
                                        }}>
                                            <Text style={{ color: "#777" }}> {this.handelTime(item.order_date)}</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
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
            </>
        )

    }
    render() {
        return (
            <>
                <View style={{ height: '100%', width: "100%", backgroundColor: "#fff" }}>
                    {
                        this._renderHeader()
                    }
                    {this._renderBodyOrder()}
                </View>
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



            </>
        )
    }
}

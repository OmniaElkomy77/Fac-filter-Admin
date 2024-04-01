import React from "react"
import {
    View, Text, StatusBar, Image,
    TouchableOpacity, FlatList,
    Modal, StyleSheet
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import * as Animatable from 'react-native-animatable';
import Api from "../../Constant/Api"
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import MyLoader from "../Orders_Type/loading";
import { Button } from 'react-native-paper';
export default class Trader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            traders: [
                // {
                //     user_name: " محمد احمد عبد العال الكومي ",
                //     user_first_phone: "01098685849",
                //     user_second_phone: "01098685749",
                //     user_shop_name: "تاجر البسيوني",
                //     user_shop_government: "الغربيه ",
                //     user_shop_city: 'بسيون ',
                //     user_shop_address: "شارع 23 يوليو ",
                //     user_shop_longitude: "",
                //     user_shop_latitude: "",
                // },
                // {
                //     user_name: "احمد احمد عبد الرحمن الكومي ",
                //     user_first_phone: "01098685749",
                //     user_second_phone: "01098685749",
                //     user_shop_name: "تجاره قطع الغيار ",
                //     user_shop_government: "الغربيه ",
                //     user_shop_city: 'طنطا',
                //     user_shop_address: "شارع الفاتح ",
                //     user_shop_longitude: "",
                //     user_shop_latitude: "",
                // },
                // {
                //     user_name: "عبد الرحمن احمد محمد احمد",
                //     user_first_phone: "01098685749",
                //     user_second_phone: "01098685749",
                //     user_shop_name: "الدومياطي ",
                //     user_shop_government: "البحيره",
                //     user_shop_city: 'دمياط',
                //     user_shop_address: "شارع 25 الدمياطي ",
                //     user_shop_longitude: "",
                //     user_shop_latitude: "",
                // },
                // {
                //     user_name: "احمد محمد محمد الكومي ",
                //     user_first_phone: "01098685749",
                //     user_second_phone: "01098685749",
                //     user_shop_name: "شرقاوي ",
                //     user_shop_government: "الشرقيه ",
                //     user_shop_city: 'حلميه ',
                //     user_shop_address: "شارع الورد  عماره رقم 23",
                //     user_shop_longitude: "",
                //     user_shop_latitude: "",
                // },
                // {
                //     user_name: "احمد احمد محمد محمد ",
                //     user_first_phone: "01098685749",
                //     user_second_phone: "01098685749",
                //     user_shop_name: "بسيوني ",
                //     user_shop_government: "الغربيه ",
                //     user_shop_city: 'بسيون',
                //     user_shop_address: "شارع 23 يوليو عماره 14",
                //     user_shop_longitude: "",
                //     user_shop_latitude: "",
                // },
            ],
            pageLoading: true,
            connected: "",
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: "",
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
            this.Traders_fun()



        })
        return unsubscripe

    }


    async Traders_fun() {
        let data = "start"
        let fetch = await axios.post(Api.Domain + "select_users.php", data);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {
                this.setState({ traders: res.message, pageLoading: false })
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





    closeModal = () => {
        this.setState({
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: ""
        })
    }














    _renderHeader() {
        return (
            <View style={{
                height: 70,
                backgroundColor: "#f20404",
                // elevation: 4,
                padding: 10,
                justifyContent: "center",
                alignItems: "center"
                // flexDirection: "row"
            }}>
                {/* <TouchableOpacity style={{
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Icon name="angle-right" size={20} color={"#fff"} />

                </TouchableOpacity> */}
                <View style={{

                    width: "85%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>التُجار</Text>
                </View>
            </View>
        )
    }
    _renderBody_Traders() {
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

                <FlatList
                    keyExtractor={item => `wcp22#-${item}`}
                    data={this.state.traders}
                    renderItem={({ item, index }) => (
                        <Animatable.View duration={1500} animation="fadeInUpBig" delay={index * 100}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("Traders_stats", {
                                        user_id: item.user_id
                                    })
                                }}
                                style={{

                                    width: "95%",
                                    backgroundColor: "#fff",
                                    marginVertical: 10,
                                    borderRadius: 10,

                                    padding: 15,
                                    elevation: 4,
                                    alignSelf: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-around"
                                }}>
                                {/* <TouchableOpacity onPress={() => {
                        alert("1")
                    }}>
                        <Icon name="map-marker-alt" style={{ color: "#f20404", fontSize: 30 }} />
                    </TouchableOpacity> */}
                                <View style={{
                                    height: 120, width: 120, alignItems: "center",
                                    backgroundColor: "#ddd",
                                    borderRadius: 75

                                }}>
                                    <Image source={require("../../photo/Trader_man.png")} style={{
                                        height: 120,
                                        resizeMode: "center",
                                        // backgroundColor: "#dff",
                                        // width: 150
                                    }} />
                                </View>

                                <View style={{
                                    width: "50%",
                                    flexWrap: "wrap",
                                    // backgroundColor: "#858",
                                    alignItems: "flex-start",
                                    justifyContent: "space-around"
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: "bold", color: "#000",
                                        alignSelf: "flex-start"
                                    }}>{item.user_name}</Text>

                                    <Text style={{ color: "#000", fontSize: 12 }}>الرقم : {item.user_first_phone}</Text>
                                    <Text style={{ color: "#000", fontSize: 12 }}>اسم المحل : {item.user_shop_name}</Text>
                                    <Text style={{ color: "#000", fontSize: 12 }}>اسم المحافظه : {item.user_shop_government}</Text>
                                    <Text style={{ color: "#000", fontSize: 12 }}>اسم المدينه : {item.user_shop_city}</Text>
                                    <Text style={{ color: "#000", fontSize: 12 }}>العنوان : {item.user_shop_address}</Text>

                                </View>



                            </TouchableOpacity>
                        </Animatable.View>
                    )

                    }
                    showsVerticalScrollIndicator={false}
                />



            </>
        )
    }
    render() {
        return (
            <View style={{ backgroundColor: "#fff", height: "100%", width: "100%" }}>
                <StatusBar backgroundColor={"#f20404"} barStyle="light-content" />
                {
                    this._renderHeader()
                }
                <View style={{
                    // backgroundColor: "#ff0",
                    // flexWrap: "wrap",
                    // alignItems: "flex-start",
                    // justifyContent: "space-around",
                    // flexDirection: "row",
                    marginBottom: 100
                }}>

                    {this._renderBody_Traders()}

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













            </View >
        )
    }
}
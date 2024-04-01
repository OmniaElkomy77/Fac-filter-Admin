import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    StatusBar,
    TouchableWithoutFeedback,
    Dimensions, TextInput,
    ScrollView
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Animatable from 'react-native-animatable';
import Api from '../../Constant/Api';
import axios from 'axios';
import Myloader from "./loading"
import LottieView from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment/moment';
import 'moment/locale/ar';
import { Button } from 'react-native-paper';
const { width, height } = Dimensions.get('window');
export default class Pending_Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PendingOrder_arr: [],
            pageLoading: true,
            connected: "",
            Modal_Change_OrderStatus: false,
            order_id: "",
            order_status: "",
            order_status_message: "",
            order_refuse_reason: "",
            order_refuse_reason_message: "",
            order_products_price: "",
            order_products_price_message: "",
            order_delivery_fee: "",
            order_delivery_fee_message: "",
            order_total_price: "",
            order_total_price_message: "",
            confirmation_modal: false,
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: ""
        }
    }

    componentDidMount() {
        // 
        const unsubscripe = NetInfo.addEventListener(state => {
            this.setState({
                connected: state.isConnected ? true : false
            })
            if (!state.isConnected) {
                this.setState({ pageLoading: false })
            }
            // 
            this.PendingOrder_fun()


        })
        return unsubscripe
    }


    async PendingOrder_fun() {
        this.setState({ pageLoading: true })
        let data_to_send = "start"
        let fetch = await axios.post(Api.Domain + "select_pending_orders.php", data_to_send);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {
                this.setState({
                    PendingOrder_arr: res.message, pageLoading: false,

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

    closeModal = () => {
        this.setState({
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: ""
        })
    }


    handelTime(time) {

        let s = moment(time).utc().fromNow();
        return s;
    }



    async Change_OrderStatus() {
        this.setState({ confirmation_modal: false })
        let data_to_send = {
            order_id: this.state.order_id,
            order_status: this.state.order_status,
            order_refuse_reason: this.state.order_refuse_reason,
            order_products_price: this.state.order_products_price,
            order_delivery_fee: this.state.order_delivery_fee,
            order_total_price: this.order_total_price,
        }
        // console.log(JSON.stringify(data_to_send))
        let fetch = await axios.post(Api.Domain + "update_order_status.php", data_to_send);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {

                this.PendingOrder_fun()
                this.setState({
                    AlertModalShow: true,
                    AlertModalRes: "succ",
                    AlertModalMessage: "تمت العمليه بنجاح"
                })

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

    }


    confirmation_fun() {
        if (this.state.order_products_price == "") {
            this.setState({ order_products_price_message: "يجب عليك ادخال سعر الطلبات" })
        } else {
            this.setState({ order_products_price_message: "" })
        }

        if (this.state.order_delivery_fee == "") {
            this.setState({ order_delivery_fee_message: "يجب عليك ادخال سعر التوصيل" })
        }
        else {
            this.setState({ order_delivery_fee_message: "" })
        }
        if (this.state.order_total_price == "") {
            this.setState({ order_total_price_message: "يجب عليك ادخال السعر الكلي" })
        }
        else {
            this.setState({ order_total_price_message: "" })
        }
        if (this.state.order_status == "") {
            this.setState({ order_status_message: " يجب عليك اختيار حاله الطلب" })
        }
        else {
            this.setState({ order_status_message: "" })
        }
        if (this.state.order_refuse_reason == "") {
            this.setState({ order_refuse_reason_message: "يجب عليك وضع سبب للرفض " })
        }
        else {
            this.setState({ order_refuse_reason_message: "" })
        }

        if (this.state.order_products_price != "" && this.state.order_delivery_fee != ""
            && this.state.order_total_price != "" && this.state.order_status != "") {
            if (this.state.refuse_input != 1) {
                this.setState({
                    Modal_Change_OrderStatus: false,

                    order_status_message: "",
                    order_refuse_reason: 0,
                    order_refuse_reason_message: "",

                    order_products_price_message: "",

                    order_delivery_fee_message: "",

                    order_total_price_message: "",
                    confirmation_modal: true
                })
            } else {
                if (this.state.order_refuse_reason_message != "") {
                    this.setState({
                        Modal_Change_OrderStatus: false,

                        order_status_message: "",

                        order_refuse_reason_message: "",

                        order_products_price_message: "",

                        order_delivery_fee_message: "",

                        order_total_price_message: "",
                        confirmation_modal: true
                    })
                }


            }
        }

    }









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
                        <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>طلبات قيد التنفيذ</Text>
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
                        <Myloader />

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
                        data={this.state.PendingOrder_arr}
                        renderItem={({ item, index }) =>
                            <Animatable.View duration={1000} animation="fadeInUpBig" delay={index * 100}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("Orders_details", {
                                            order_id: item.order_id
                                        })
                                        // alert("1")
                                        // console.log(item.order_id)
                                    }}
                                    style={{
                                        // height: 100,
                                        padding: 15,
                                        width: "90%",
                                        backgroundColor: "#fff",
                                        elevation: 4,
                                        alignSelf: "center",
                                        marginVertical: 10,
                                        borderRadius: 10,
                                        // alignItems: "center",
                                        // flexDirection: "row",
                                        justifyContent: "space-around"
                                    }}>
                                    <View


                                        style={{
                                            // height: 100,
                                            // padding: 15,
                                            // width: "90%",
                                            backgroundColor: "#fff",
                                            // elevation: 4,
                                            // alignSelf: "center",
                                            // marginVertical: 10,
                                            // borderRadius: 10,
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


                                    </View>


                                    <View style={{
                                        height: 70,
                                        width: "100%",

                                        alignItems: "center",
                                        justifyContent: "flex-end"
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    Modal_Change_OrderStatus: true,
                                                    order_id: item.order_id,
                                                });
                                            }}
                                            style={{
                                                height: 50,
                                                width: "45%",
                                                backgroundColor: "#f20404",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: 10
                                            }}>
                                            <Text style={{ color: "#fff" }}>تعين الطلب</Text>
                                        </TouchableOpacity>

                                    </View>
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


                    <Modal
                        visible={this.state.Modal_Change_OrderStatus}
                        onRequestClose={() => {
                            this.setState({ Modal_Change_OrderStatus: false });
                        }}
                        animationType="slide"
                        // presentationStyle="formSheet"s
                        transparent={true}>
                        <View
                            style={{
                                // opacity:0.7,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                            <TouchableWithoutFeedback
                                style={{ flex: 1 }}
                                onPress={() => {
                                    this.setState({ Modal_Change_OrderStatus: false });
                                }}>
                                <View
                                    style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                    }}
                                />
                            </TouchableWithoutFeedback>
                            <View
                                style={{
                                    // height: height,
                                    // width: width,
                                    // flex: 1,
                                    // alignContent: 'center',
                                    justifyContent: 'center',
                                }}>
                                <ScrollView>
                                    <View
                                        style={{
                                            // height: height,
                                            alignSelf: 'center',
                                            justifyContent: 'space-around',
                                            width: '90%',
                                            backgroundColor: '#fff',
                                            borderRadius: 10,
                                            elevation: 5,
                                            paddingVertical: 15,
                                            // marginBottom: 100,
                                        }}>
                                        <View
                                            style={{
                                                height: 50,
                                                width: '100%',

                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Text
                                                style={{ color: '#000', fontWeight: 'bold', fontSize: 15 }}>
                                                تعين الطلب {' '}
                                            </Text>
                                        </View>




                                        <View style={{
                                            // height: 70,
                                            // padding: 10,
                                            width: "90%",
                                            alignSelf: "center",
                                            // backgroundColor: "#525"

                                        }}>
                                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000", margin: 5 }}>سعر الطلبات</Text>
                                            <TextInput
                                                style={{
                                                    padding: 10, backgroundColor: "#ddd",
                                                    color: "#000",
                                                    borderRadius: 10,

                                                }}
                                                placeholder="سعر الطلبات"
                                                placeholderTextColor={"#777"}
                                                keyboardType="decimal-pad"
                                                value={this.state.order_products_price}
                                                onChangeText={(value) => {
                                                    this.setState({ order_products_price: value })
                                                }}
                                            />
                                            {this.state.order_products_price_message != "" ?
                                                <Text style={{ color: "#f02404", alignSelf: "center", fontSize: 15 }}>{this.state.order_products_price_message}</Text>
                                                : null}
                                        </View>

                                        <View style={{
                                            // height: 70,
                                            // padding: 10,
                                            width: "90%",
                                            alignSelf: "center",
                                            // backgroundColor: "#525"

                                        }}>
                                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000", margin: 5 }}>سعر التوصيل</Text>
                                            <TextInput
                                                style={{
                                                    padding: 10, backgroundColor: "#ddd",
                                                    color: "#000",
                                                    borderRadius: 10,

                                                }}
                                                placeholder="سعر التوصيل"
                                                placeholderTextColor={"#777"}
                                                keyboardType="decimal-pad"
                                                value={this.state.order_delivery_fee}
                                                onChangeText={(value) => {
                                                    this.setState({ order_delivery_fee: value })
                                                }}
                                            />

                                            {this.state.order_delivery_fee_message != "" ?
                                                <Text style={{ color: "#f02404", alignSelf: "center", fontSize: 15 }}>{this.state.order_delivery_fee_message}</Text>
                                                : null}
                                        </View>


                                        <View style={{
                                            // height: 70,
                                            // padding: 10,
                                            width: "90%",
                                            alignSelf: "center",
                                            // backgroundColor: "#525"

                                        }}>
                                            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000", margin: 5 }}>السعر الكلي</Text>
                                            <TextInput
                                                style={{
                                                    padding: 10, backgroundColor: "#ddd",
                                                    color: "#000",
                                                    borderRadius: 10,

                                                }}
                                                placeholder="السعر الكلي "
                                                placeholderTextColor={"#777"}
                                                keyboardType="decimal-pad"
                                                value={this.state.order_total_price}
                                                onChangeText={(value) => {
                                                    this.setState({ order_total_price: value })
                                                }}
                                            />


                                            {this.state.order_total_price_message != "" ?
                                                <Text style={{ color: "#f02404", alignSelf: "center", fontSize: 15 }}>{this.state.order_total_price_message}</Text>
                                                : null}

                                        </View>




                                        <View
                                            style={{
                                                height: 100,
                                                width: '100%',
                                                flexDirection: 'row',
                                                justifyContent: 'space-around',
                                                // backgroundColor: "#eee",
                                                alignItems: 'center',
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ order_status: 'refused', refuse_input: 1 })
                                                    // this.Change_OrderStatus()
                                                }}
                                                style={{
                                                    height: 50,
                                                    width: '40%',
                                                    backgroundColor: '#f20404',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 25,
                                                }}>
                                                <Text
                                                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                                    طلب مرفوض
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        order_status: 'accepted',
                                                        refuse_input: 0
                                                    });
                                                    // this.Change_OrderStatus()
                                                }}
                                                style={{
                                                    height: 50,
                                                    width: '40%',
                                                    backgroundColor: '#f20404',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 25,
                                                }}>
                                                <Text
                                                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                                    طلب جديد
                                                </Text>
                                            </TouchableOpacity>
                                        </View>



                                        {this.state.order_status_message != "" ?
                                            <Text style={{ color: "#f02404", alignSelf: "center", fontSize: 15 }}>{this.state.order_status_message}</Text>
                                            : null}

                                        {this.state.refuse_input == 1 ?
                                            <View style={{
                                                // height: 70,
                                                // padding: 10,
                                                width: "90%",
                                                alignSelf: "center",
                                                // backgroundColor: "#525"

                                            }}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000", margin: 5 }}>سبب الرفض</Text>
                                                <TextInput
                                                    style={{
                                                        padding: 10,
                                                        backgroundColor: "#ddd",
                                                        color: "#000",
                                                        borderRadius: 10,

                                                    }}
                                                    placeholder="سبب الرفض"
                                                    placeholderTextColor={"#777"}
                                                    // keyboardType="decimal-pad"
                                                    value={this.state.order_refuse_reason}
                                                    onChangeText={(value) => {
                                                        this.setState({ order_refuse_reason: value })
                                                    }}
                                                />

                                                {this.state.order_refuse_reason_message != "" ?
                                                    <Text style={{ color: "#f02404", alignSelf: "center", fontSize: 15, marginVertical: 15 }}>{this.state.order_refuse_reason_message}</Text>
                                                    : null}
                                            </View>

                                            : null}


                                        <TouchableOpacity

                                            onPress={() => {

                                                this.confirmation_fun()

                                            }}

                                            style={{
                                                // height: 70,
                                                padding: 10,
                                                width: 140,
                                                backgroundColor: "#f02404",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignSelf: "center",
                                                // marginVertical: 15,
                                                borderRadius: 10
                                            }}>
                                            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>تأكيد</Text>

                                        </TouchableOpacity>

                                    </View>


                                </ScrollView>

                            </View>
                            <TouchableWithoutFeedback
                                style={{ flex: 1 }}
                                onPress={() => {
                                    this.setState({ Modal_Change_OrderStatus: false });
                                }}>
                                <View
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </Modal>

                </View >






                <Modal
                    visible={this.state.confirmation_modal}
                    onRequestClose={() => {
                        this.setState({ confirmation_modal: false });
                    }}
                    animationType="slide"
                    // presentationStyle="formSheet"s
                    transparent={true}>
                    <View
                        style={{
                            // opacity:0.7,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ confirmation_modal: false });
                            }}>
                            <View
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <View
                            style={{
                                height: height,
                                // width: width,
                                flex: 1,
                                // alignContent: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <View
                                style={{
                                    // height:height,
                                    alignSelf: 'center',
                                    justifyContent: 'space-around',
                                    width: '90%',
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    elevation: 5,
                                    paddingVertical: 15,
                                    marginBottom: 10,
                                }}>
                                <View
                                    style={{
                                        height: 50,
                                        width: '100%',

                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{ color: '#000', fontWeight: 'bold', fontSize: 15 }}>
                                        هل انت متاكد من تعين الطلب؟ {' '}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>

                                    <TouchableOpacity

                                        onPress={() => {
                                            this.Change_OrderStatus()


                                        }}

                                        style={{
                                            height: 50, width: 140,
                                            backgroundColor: "#385",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            alignSelf: "center",
                                            marginVertical: 10,
                                            borderRadius: 10
                                        }}>
                                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>تأكيد</Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity

                                        onPress={() => {

                                            this.setState({ confirmation_modal: false })

                                        }}

                                        style={{
                                            height: 50, width: 140,
                                            backgroundColor: "#f02404",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            alignSelf: "center",
                                            marginVertical: 10,
                                            borderRadius: 10
                                        }}>
                                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>الغاء</Text>

                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ confirmation_modal: false });
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>


























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
import React from "react";
import {
    View, Text, StatusBar,
    TouchableOpacity, TextInput, FlatList, Keyboard, Modal, StyleSheet
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Switch } from 'react-native-paper';
import LottieView from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import Api from "../../Constant/Api"
import axios from "axios"
import NetInfo from '@react-native-community/netinfo';
import { Button } from 'react-native-paper';
export default class Search_product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fac_code: this.props.route.params.product_title,
            search_arr: [],
            connected: "",
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: "",
            pageLoading: ""
            // fac_id: ""
        }
    }


    componentDidMount() {

        const unsubscripe = NetInfo.addEventListener(state => {
            this.setState({
                connected: state.isConnected ? true : false
            })




        })
        return unsubscripe;
    }





    async _can_buy(fac_id, can_buy, index) {

        let search_arr = [...this.state.search_arr]
        search_arr[index].can_buy = !can_buy
        this.setState({
            search_arr
        })
        let data = {
            fac_id: fac_id,
            can_buy: can_buy
        }
        let fetch = await axios.post(Api.Domain + "update_can_buy_in_fac_data.php", data);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {

                this.setState({
                    AlertModalShow: true,
                    AlertModalRes: "succ",
                    AlertModalMessage: "تمت العمليه بنجاح"
                })

            } else {
                let search_arr = [...this.state.search_arr]
                search_arr[index].can_buy = !can_buy
                this.setState({
                    search_arr,
                    AlertModalShow: true,
                    AlertModalRes: "error",
                    AlertModalMessage: "حدث خطأ ما "
                })

            }
        } else {
            let search_arr = [...this.state.search_arr]
            search_arr[index].can_buy = !can_buy
            this.setState({
                search_arr,
                AlertModalShow: true,
                AlertModalRes: "error",
                AlertModalMessage: "حدث خطأ ما "
            })
            // console.log(res.message);
        }
    }

    closeModal = () => {
        this.setState({
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: ""
        })
    }

    async _search_fun() {
        Keyboard.dismiss()
        this.setState({ pageLoading: true })
        let data = {
            user_id: this.props.route.params.user_id,
            fac_code: this.state.fac_code.toUpperCase(),
        }
        let fetch = await axios.post(Api.Domain + "select_filters_data.php", data);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {
                this.setState({ search_arr: res.message, pageLoading: false })


            } else {
                this.setState({
                    AlertModalShow: true,
                    AlertModalRes: "error",
                    AlertModalMessage: "هذا المنتج غير متوفر"
                })
                // console.log(res.message)
            }
        } else {
            this.setState({
                AlertModalShow: true,
                AlertModalRes: "error",
                AlertModalMessage: "حدث خطأ ما "
            })
            // console.log(res.message)
        }
        this.setState({ pageLoading: false })
    }










    _renderHeader() {
        return (
            <>
                <StatusBar backgroundColor={"#f20404"} barStyle="light-content" />
                <View style={{

                    backgroundColor: "#f20404",
                    justifyContent: "center",
                    padding: 15,
                    flexDirection: "row",
                    // alignItems: "center"

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
                        <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>المنتجات</Text>
                    </View>
                </View>
            </>
        )
    }

    _renderBodyof_Search(item, index) {
        return (
            <View style={{
                // height: 100,
                backgroundColor: "#fff", elevation: 4,
                width: "90%",
                marginVertical: 10,
                alignSelf: "center",
                borderRadius: 10,
            }}>
                <View style={{
                    // backgroundColor: "#141",
                    padding: 10, alignItems: "flex-end",
                    backgroundColor: "#ddd",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                }}>
                    <Switch
                        style={{
                            // backgroundColor: "#f00",
                            // borderRadius: 10                 
                        }}
                        disabled={item.can_buy == 0 ? false : true}
                        value={item.can_buy}
                        onValueChange={(value) => {
                            this._can_buy(item.fac_id, value, index)
                        }}
                        color={"#f00"} />
                </View>
                <View style={{ padding: 10, justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ color: "#000" }}>
                        كود فاك فلتر
                    </Text>
                    <Text style={{ color: "#777" }}>
                        {item.fac_code}
                    </Text>
                </View>

                <View style={{ padding: 10, justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ color: "#000" }}>
                        يستخدم الفلتر في
                    </Text>
                    <Text style={{ color: "#777" }}>
                        {item.filterType_title}
                    </Text>
                </View>

            </View>
        )

    }
    _renderBody() {

        if (this.state.connected == false) {
            return (
                <View style={{
                    height: '100%',
                    width: "100%",
                    alignItems: 'center',
                    justifyContent: "center"
                }}>
                    <LottieView
                        source={require("../../photo/lottie/No_Internet.json")}
                        autoPlay
                        loop
                        style={{ height: RFValue(200), width: '100%' }}
                        resizeMode="contain"
                    />
                    <Text
                        style={{

                            fontSize: 20,
                            color: "#000"
                        }}>
                        يجب عليك الاتصال بالانترنت
                    </Text>


                </View>
            )
        }
        return (


            <View>
                {this.state.search_arr.length > 0 ? (
                    <View>
                        <View style={{
                            padding: 10,
                            // backgroundColor: "#414"
                        }}>
                            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>ادخل كود الفلتر</Text>
                        </View>

                        <View style={{
                            padding: 10,
                            // backgroundColor: "#578",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <TextInput
                                style={{
                                    backgroundColor: "#ddd", padding: 10,
                                    width: "70%", color: "#000",
                                    borderRadius: 10
                                }}
                                placeholder="البحث من القائمه"
                                placeholderTextColor={"#777"}
                                // keyboardType="numeric"
                                value={this.state.fac_code}
                                onChangeText={(value) => {
                                    this.setState({ fac_code: value })
                                    this._search_fun()
                                }}
                            />
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    search_arr: [],
                                    fac_code: ""
                                })
                            }}


                                style={{
                                    padding: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#f20404",

                                    borderRadius: 10
                                }}>
                                <Text style={{ color: "#fff", fontSize: 18, }}>بحث جديد</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{
                            backgroundColor: "#fff",
                            marginBottom: 100,
                            height: "72%"
                        }}>

                            <FlatList
                                // keyExtractor={item => `wcp22#-${item}`}
                                data={this.state.search_arr}
                                renderItem={({ item, index }) =>
                                    this._renderBodyof_Search(item, index)

                                }
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                ) : (
                    <>
                        <View style={{
                            padding: 10,
                            // backgroundColor: "#414"
                        }}>
                            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>ادخل كود الفلتر</Text>
                        </View>

                        <View style={{
                            padding: 10,
                            // height: 100,
                            // backgroundColor: "#578",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 5
                        }}>
                            <TextInput
                                style={{
                                    backgroundColor: "#ddd",
                                    padding: 10,
                                    width: "90%",
                                    color: "#000",
                                    borderRadius: 10
                                }}
                                placeholder="كود فاك فلتر"
                                placeholderTextColor={"#777"}
                                value={this.state.fac_code}
                                onChangeText={(value) => {
                                    this.setState({ fac_code: value })
                                }}

                            />


                        </View>


                        <TouchableOpacity
                            onPress={() => {
                                this._search_fun()

                            }}
                            style={{
                                backgroundColor: "#f20404",
                                width: "90%",
                                alignItems: "center", justifyContent: "center", alignSelf: 'center',
                                padding: 10,
                                borderRadius: 10,
                            }}>
                            <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>بحث</Text>

                        </TouchableOpacity>

                        {this.state.pageLoading == true ?
                            <View style={{
                                height: '100%',
                                width: "100%",
                                alignItems: 'center',
                                // justifyContent: "center"
                            }}>
                                <LottieView
                                    source={require("../../photo/lottie/setting.json")}
                                    autoPlay
                                    loop
                                    style={{ height: RFValue(200), width: '100%' }}
                                    resizeMode="contain"
                                />
                                <Text
                                    style={{

                                        fontSize: 20,
                                        color: "#000"
                                    }}>
                                    جاري البحث عن الفلاتر المتاحة..
                                </Text>


                            </View>
                            : null}





                    </>
                )


                }
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
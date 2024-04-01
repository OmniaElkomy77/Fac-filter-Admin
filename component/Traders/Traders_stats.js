import React from "react"
import {
    View, Text, StatusBar,
    ScrollView, TouchableOpacity, Image, Modal, FlatList,
    StyleSheet
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { Svg, Polygon } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import Api from "../../Constant/Api"
import axios from "axios";
import LottieView from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import NetInfo from '@react-native-community/netinfo';
import MyLoader from "../Orders_Type/loading";
import { Button } from 'react-native-paper';
export default class Traders_stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Bestseller_arr: [],
            most_visit_arr: [],
            most_search_arr: [],
            bestseller_modal: false,
            most_vist_modal: false,
            most_search_modal: false,
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


            this.BestSeller_Trader_product()
            this.most_visit()
            this.most_search()

        })
        return unsubscripe

    }
    async BestSeller_Trader_product() {
        let data = {
            user_id: this.props.route.params.user_id,
            start: 0
        }
        let fetch = await axios.post(Api.Domain + "select_user_most_products.php", data);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {
                this.setState({
                    Bestseller_arr: res.message,
                    pageLoading: false
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




    async most_visit() {
        let data = {
            user_id: this.props.route.params.user_id,
            start: 0
        }
        let fetch = await axios.post(Api.Domain + "select_user_most_visit.php", data);
        if (fetch.status == 200) {
            let res = fetch.data
            if (res.status == 'success') {
                this.setState({
                    most_visit_arr: res.message,
                    pageLoading: false
                })
                // console.log(JSON.stringify(res.message))
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


    async most_search() {
        let data = {
            user_id: this.props.route.params.user_id,
            start: 0
        }
        let fetch = await axios.post(Api.Domain + "select_user_most_search.php", data);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {
                this.setState({
                    most_search_arr: res.message,
                    pageLoading: false
                })
                // console.log(JSON.stringify(res.message))
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
            <>
                <StatusBar backgroundColor={"#f20404"} barStyle="light-content" />
                <View style={{
                    height: 70,
                    backgroundColor: "#f20404",
                    elevation: 4,
                    padding: 10,
                    justifyContent: "center", flexDirection: "row"
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                        style={{
                            height: 50,
                            width: 50,
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
                        <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>الاحصائيات</Text>
                    </View>
                </View>
            </>
        )
    }



    _renderBody() {
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

        if (this.state.Bestseller_arr.length == 0
            && this.state.most_visit_arr.length == 0
            && this.state.most_search_arr.length == 0) {
            return (
                <View style={{
                    // marginVertical: 100,
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
                        لا توجد احصائيات
                    </Text>
                </View>
            )
        }


        return (
            <ScrollView>
                <View style={{
                    // backgroundColor: "#525",
                    justifyContent: 'space-around'
                }}>



                    {this.state.Bestseller_arr.length > 0 ?
                        <View style={{
                            // height: 500,
                            // backgroundColor: "#050",
                            width: "100%",
                        }}>
                            <View style={{
                                // backgroundColor: "#478",
                                padding: 10,
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row"
                            }}>
                                <Text style={{ fontSize: 20, color: '#000' }}>الأكثر مبيعاً</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ bestseller_modal: true })
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        width: "30%",
                                        // backgroundColor: "#451",
                                        justifyContent: "space-around"
                                    }}>

                                    <Text style={{ fontSize: 20, color: '#000' }}>رؤيه الجميع</Text>
                                    <Icon name="angle-left" size={20} color={"#000"}></Icon>
                                </TouchableOpacity>


                            </View>

                            <View style={{
                                backgroundColor: "#fff",
                                // padding: 10
                                flexDirection: "row",
                                justifyContent: "space-around",
                                width: '100%',
                                elevation: 7
                            }}>
                                {/*  ده الفيو الكبير  الي شايل الصوره و الكلام  */}
                                <ScrollView horizontal={true}>
                                    {this.state.Bestseller_arr.map((item, index) => (
                                        <Animatable.View duration={1000} animation="lightSpeedIn" delay={index * 100}>
                                            <View
                                                key={index}
                                                style={{
                                                    // backgroundColor: "#185",
                                                    // height: 350,
                                                    // width: 200,
                                                    padding: 10,
                                                    alignItems: "center",
                                                    justifyContent: "space-around",
                                                    // elevation: 4

                                                }}>
                                                {/* دي الصوره  */}
                                                <View style={{
                                                    height: 250,
                                                    width: 180,
                                                    backgroundColor: "#f20404",
                                                    borderRadius: 10,

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
                                                                // backgroundColor: '#000',
                                                                marginTop: 20
                                                                // borderTopLeftRadius: 1500
                                                            }} />

                                                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{item.product_title}</Text>
                                                        <Text style={{ color: '#fff', fontSize: 15, }}> عدد المطلوب :{item.product_count}</Text>
                                                    </Svg>

                                                </View>


                                            </View>
                                        </Animatable.View>
                                    ))}
                                </ScrollView>


                            </View>

                        </View>

                        : null}








                    {this.state.most_visit_arr.length > 0 ?


                        <View style={{
                            // backgroundColor: "#525",
                            justifyContent: 'space-around'
                        }}>

                            <View style={{
                                // height: 500,
                                // backgroundColor: "#050",
                                width: "100%",
                            }}>
                                <View style={{
                                    // backgroundColor: "#478",
                                    padding: 10,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}>
                                    <Text style={{ fontSize: 20, color: '#000' }}>الأكثر زيارةً</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ most_vist_modal: true })
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            width: "30%",
                                            // backgroundColor: "#451",
                                            justifyContent: "space-around"
                                        }}>

                                        <Text style={{ fontSize: 20, color: '#000' }}>رؤيه الجميع</Text>
                                        <Icon name="angle-left" size={20} color={'#000'}></Icon>
                                    </TouchableOpacity>


                                </View>

                                <View style={{
                                    backgroundColor: "#fff",
                                    // padding: 10
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    width: '100%',
                                    elevation: 10
                                }}>
                                    {/*  ده الفيو الكبير  الي شايل الصوره و الكلام  */}
                                    <ScrollView horizontal={true}>
                                        {this.state.most_visit_arr.map((item, index) => (
                                            <Animatable.View duration={1000} animation="lightSpeedIn" delay={index * 100}>
                                                <View
                                                    key={index}
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
                                                                    // backgroundColor: '#000',
                                                                    marginTop: 20
                                                                    // borderTopLeftRadius: 1500
                                                                }} />
                                                            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{item.product_title}</Text>
                                                            <Text style={{ color: '#fff', fontSize: 15, }}> عدد الزيارات: {item.product_count}</Text>

                                                        </Svg>

                                                    </View>


                                                </View>
                                            </Animatable.View>
                                        ))}
                                    </ScrollView>


                                </View>

                            </View>


                            {/* <View style={{ height: 300, backgroundColor: "#010", width: "100%", }}>

                        </View> */}
                        </View>

                        :
                        null
                    }

                    {this.state.most_search_arr.length > 0 ?
                        <View style={{
                            // backgroundColor: "#525",
                            justifyContent: 'space-around'
                        }}>

                            <View style={{
                                // height: 500,
                                // backgroundColor: "#050",
                                width: "100%",
                            }}>
                                <View style={{
                                    // backgroundColor: "#478",
                                    padding: 10,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}>
                                    <Text style={{ fontSize: 20, color: '#000' }}>أكثر بحثاً</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ most_search_modal: true })
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: "center",
                                            width: "30%",
                                            // backgroundColor: "#451",
                                            justifyContent: "space-around"
                                        }}>

                                        <Text style={{ fontSize: 20, color: '#000' }}>رؤيه الجميع</Text>
                                        <Icon name="angle-left" size={20} color={'#000'}></Icon>
                                    </TouchableOpacity>


                                </View>

                                <View style={{
                                    backgroundColor: "#fff",
                                    // padding: 10
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    width: '100%',
                                    elevation: 10
                                }}>
                                    {/*  ده الفيو الكبير  الي شايل الصوره و الكلام  */}
                                    <ScrollView horizontal={true}>
                                        {this.state.most_search_arr.map((item, index) => (
                                            <Animatable.View duration={1000} animation="lightSpeedIn" delay={index * 100}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.props.navigation.navigate("Search_product", {
                                                            product_title: item.product_title,
                                                            user_id: this.props.route.params.user_id
                                                        })
                                                    }}
                                                    key={index}
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
                                                                    // backgroundColor: '#000',
                                                                    marginTop: 20,

                                                                    // borderTopLeftRadius: 1500
                                                                }} />
                                                            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", alignSelf: "flex-start" }}>{item.product_title}</Text>
                                                        </Svg>

                                                    </View>


                                                </TouchableOpacity>
                                            </Animatable.View>
                                        ))}



                                    </ScrollView>


                                </View>

                            </View>


                            {/* <View style={{ height: 300, backgroundColor: "#010", width: "100%", }}>

                        </View> */}
                        </View>

                        : null}
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("Previous_Orders",
                                { user_id: this.props.route.params.user_id })
                            // alert(this.props.route.params.user_id)
                        }


                        }
                        style={{
                            height: 100,
                            width: "90%",
                            backgroundColor: "#fff",
                            alignSelf: "center",
                            marginVertical: 10,
                            borderRadius: 10,
                            elevation: 7,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Text style={{ color: '#000', fontSize: 20, fontWeight: "bold" }}>الطلبات السابقة</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        )
    }
    render() {
        return (
            <View style={{ backgroundColor: "#fff", height: "100%", width: "100%" }}>
                {this._renderHeader()}
                {this._renderBody()}

                <Modal
                    visible={this.state.bestseller_modal}
                    onRequestClose={() => {
                        this.setState({ bestseller_modal: false })
                    }}>


                    <View

                        style={{
                            height: 70,
                            backgroundColor: "#fff", elevation: 4, padding: 10, justifyContent: "center", flexDirection: "row"
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ bestseller_modal: false })
                            }}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                                borderColor: "#c8c6c6",
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Icon name="angle-right" size={20} color={"#c8c6c6"} />

                        </TouchableOpacity>
                        <View style={{
                            // backgroundColor: "#414",
                            width: "85%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{ fontSize: 25, color: "#555", fontWeight: "bold" }}>الأكثر مبيعاً</Text>
                        </View>
                    </View>
                    <ScrollView>

                        <View style={{
                            // backgroundColor: "#ff0",
                            alignItems: "flex-start",
                            justifyContent: "space-around",
                            flexDirection: "row"
                        }}>

                            <FlatList
                                numColumns={2}
                                keyExtractor={item => `wcp22#-${item}`}
                                data={this.state.Bestseller_arr}
                                renderItem={({ item, index }) => (
                                    <Animatable.View duration={1000} animation="zoomIn" delay={index * 100}>
                                        <View
                                            key={index}
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
                                                            // backgroundColor: '#000',
                                                            marginTop: 20
                                                            // borderTopLeftRadius: 1500
                                                        }} />
                                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{item.product_title}</Text>
                                                    <Text style={{ color: "#fff", fontSize: 15 }}>عدد المطلوب :{item.product_count}</Text>
                                                </Svg>

                                            </View>


                                        </View>
                                    </Animatable.View>
                                )
                                }
                            />



                        </View>

                    </ScrollView>



                </Modal>



                <Modal
                    visible={this.state.most_vist_modal}
                    onRequestClose={() => {
                        this.setState({ most_vist_modal: false })
                    }}>


                    <View style={{
                        height: 70,
                        backgroundColor: "#fff", elevation: 4, padding: 10, justifyContent: "center", flexDirection: "row"
                    }}>
                        <TouchableOpacity

                            onPress={() => {
                                this.setState({ most_vist_modal: false })
                            }}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                                borderColor: "#c8c6c6",
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Icon name="angle-right" size={20} color={"#c8c6c6"} />

                        </TouchableOpacity>
                        <View style={{
                            // backgroundColor: "#414",
                            width: "85%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{ fontSize: 25, color: "#555", fontWeight: "bold" }}>الأكثر زيارةً</Text>
                        </View>
                    </View>

                    <ScrollView>

                        <View style={{
                            // backgroundColor: "#ff0",
                            alignItems: "flex-start",
                            justifyContent: "space-around",
                            flexDirection: "row"
                        }}>

                            <FlatList
                                numColumns={2}
                                keyExtractor={item => `wcp22#-${item}`}
                                data={this.state.most_visit_arr}
                                renderItem={({ item, index }) => (
                                    <Animatable.View duration={1000} animation="zoomIn" delay={index * 100}>
                                        <View
                                            key={index}
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
                                                            // backgroundColor: '#000',
                                                            marginTop: 20
                                                            // borderTopLeftRadius: 1500
                                                        }} />
                                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>{item.product_title}</Text>
                                                    <Text style={{ color: "#fff", fontSize: 15 }}>عدد الزيارات: {item.product_count}</Text>
                                                </Svg>

                                            </View>


                                        </View>
                                    </Animatable.View>
                                )}


                            />


                        </View>

                    </ScrollView>



                </Modal>







                <Modal
                    visible={this.state.most_search_modal}
                    onRequestClose={() => {
                        this.setState({ most_search_modal: false })
                    }}>


                    <View style={{
                        height: 70,
                        backgroundColor: "#fff", elevation: 4, padding: 10, justifyContent: "center", flexDirection: "row"
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ most_search_modal: false })
                            }}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 10,
                                borderColor: "#c8c6c6",
                                borderWidth: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Icon name="angle-right" size={20} color={"#c8c6c6"} />

                        </TouchableOpacity>
                        <View style={{
                            // backgroundColor: "#414",
                            width: "85%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={{ fontSize: 25, color: "#555", fontWeight: "bold" }}>الأكثر  بحثاً</Text>
                        </View>
                    </View>
                    <ScrollView>

                        <View style={{
                            // backgroundColor: "#ff0",
                            alignItems: "flex-start",
                            justifyContent: "space-around",
                            flexDirection: "row"
                        }}>

                            <FlatList
                                numColumns={2}
                                keyExtractor={item => `wcp22#-${item}`}
                                data={this.state.most_search_arr}
                                renderItem={({ item, index }) => (
                                    <Animatable.View duration={1000} animation="zoomIn" delay={index * 100}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate("Search_product", {
                                                    product_title: item.product_title,
                                                    user_id: this.props.route.params.user_id
                                                })
                                            }}
                                            key={index}
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
                                                            // backgroundColor: '#000',
                                                            marginTop: 20
                                                            // borderTopLeftRadius: 1500
                                                        }} />
                                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", alignSelf: "flex-start" }}>{item.product_title}</Text>
                                                </Svg>

                                            </View>


                                        </TouchableOpacity>
                                    </Animatable.View>

                                )}
                            />




                        </View>


                    </ScrollView>

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























            </View>
        )
    }
}
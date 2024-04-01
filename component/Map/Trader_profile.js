import react from "react"
import React from "react"
import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import * as Animatable from 'react-native-animatable';
export default class Trader_profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trader: {}
        }
    }

    componentDidMount() {
        let trader = this.props.route.params.trader
        this.setState({ trader })

    }
    renderHeader() {
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
                        <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>الصفحه الشخصيه</Text>
                    </View>
                </View>
            </>
        );
    }
    _renderBody() {
        return (
            <ScrollView>
                <View
                    style={{
                        height: '100%', width: '100%',
                        backgroundColor: '#fff',
                        marginBottom: 100
                    }}>

                    <Animatable.View duration={1000} animation="fadeInUpBig">

                        <View
                            style={{
                                height: 100,
                                width: '100%',
                                backgroundColor: '#fff',
                                marginVertical: 10,
                                //   justifyContent:"center",
                                flexDirection: 'row',
                                alignItems: 'center',
                                elevation: 5
                            }}>

                            <Image
                                resizeMode={'contain'}
                                style={{ height: 60, width: 110 }}
                                source={require('../../photo/Trader_man.png')}
                            />

                            <View
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',

                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',

                                        alignSelf: "center",
                                        color: '#000',
                                    }}>
                                    {this.state.trader.user_name}

                                </Text>
                            </View>
                        </View>
                    </Animatable.View>
                    <Animatable.View duration={1000} animation="fadeInUpBig" delay={500}>
                        <View style={{ marginVertical: 10 }}>
                            <View

                                style={{
                                    height: 80,
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    // marginTop: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ddd',
                                    //   justifyContent:"center",
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    elevation: 5
                                }}>
                                <Image
                                    resizeMode={'contain'}
                                    style={{ height: 60, width: 110 }}
                                    source={require("../../photo/phone.png")}
                                />

                                <View
                                    style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        // width:"70%"
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            //   marginTop: '4%',
                                            color: '#000',
                                        }}>
                                        {this.state.trader.user_first_phone}
                                    </Text>
                                </View>
                            </View>

                            <View

                                style={{
                                    height: 80,
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    elevation: 5
                                }}>
                                <Image
                                    resizeMode={'contain'}
                                    style={{ height: 60, width: 110 }}
                                    source={require('../../photo/address.png')}
                                />

                                <View
                                    style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        // width:"70%"
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            //   marginTop: '4%',
                                            color: '#000',
                                        }}>
                                        {this.state.trader.user_shop_address}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animatable.View>


                    <Animatable.View duration={1000} animation="fadeInUpBig" delay={700}>

                        <View style={{ marginVertical: 10 }}>
                            <View

                                style={{
                                    height: 80,
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: "#eee",
                                    elevation: 5
                                }}>
                                <Image
                                    resizeMode={'contain'}
                                    style={{ height: 60, width: 110 }}
                                    source={require('../../photo/shop.png')}
                                />

                                <View
                                    style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        // width:"70%"
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            //   marginTop: '4%',
                                            color: '#000',
                                        }}>
                                        {this.state.trader.user_shop_name}
                                    </Text>
                                </View>
                            </View>










                            <View

                                style={{
                                    height: 80,
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: "#eee",
                                    elevation: 5
                                }}>
                                <Image
                                    resizeMode={'contain'}
                                    style={{ height: 60, width: 110 }}
                                    source={require('../../photo/city.png')}
                                />

                                <View
                                    style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        // width:"70%"
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            //   marginTop: '4%',
                                            color: '#000',
                                        }}>
                                        {this.state.trader.user_shop_city}
                                    </Text>
                                </View>
                            </View>






                            <View

                                style={{
                                    height: 80,
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    elevation: 5
                                }}>
                                <Image
                                    resizeMode={'contain'}
                                    style={{ height: 60, width: 110 }}
                                    source={require('../../photo/goverment.png')}
                                />

                                <View
                                    style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        // width:"70%"
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            //   marginTop: '4%',
                                            color: '#000',
                                        }}>
                                        {this.state.trader.user_shop_government}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Animatable.View>

                    <Animatable.View duration={1000} animation="fadeInUpBig" delay={800}>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("Traders_stats", {
                                    user_id: this.state.trader.user_id
                                })
                            }}
                            style={{
                                height: 80,
                                width: '100%',
                                backgroundColor: '#fff',
                                marginTop: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd',
                                //   marginVertical: 10,
                                //   justifyContent:"center",
                                flexDirection: 'row',
                                alignItems: 'center',
                                elevation: 5
                            }}>
                            <Image
                                resizeMode={'contain'}
                                style={{ height: 60, width: 110 }}
                                source={require('../../photo/stats.png')}
                            />

                            <View
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    // width:"70%"
                                }}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        //   marginTop: '4%',
                                        color: '#000',
                                    }}>
                                    الإحصائيات
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </ScrollView >



















        )
    }


    render() {
        return (
            <View>
                {this.renderHeader()}
                {this._renderBody()}
            </View>
        )
    }
}
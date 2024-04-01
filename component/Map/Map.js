import React from "react";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    Modal,
    TouchableOpacity
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import axios from "axios";
import Api from "../../Constant/Api";
import images from "../../Constant/images";
import LottieView from 'lottie-react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import NetInfo from '@react-native-community/netinfo';
import { Button } from 'react-native-paper';
export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initResion: {
                latitude: 30.79579,
                longitude: 30.997942,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            changeMapLoading: false,
            catchedAddress: "",
            tempLocation: {},
            selectedLoc: null,
            wholeUsers: [],
            connected: "",
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: ""

        };
        this.mapViewRef = null;
    }



    componentDidMount() {
        const unsubscripe = NetInfo.addEventListener(state => {
            this.setState({
                connected: state.isConnected ? true : false
            })

            // 
            this.user_data()


        })
        return unsubscripe
    }




    async user_data() {
        let data = "start"
        let fetch = await axios.post(Api.Domain + "select_users.php", data);
        if (fetch.status == 200) {
            let res = fetch.data

            if (res.status == 'success') {
                this.setState({
                    wholeUsers: res.message

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

    closeModal = () => {
        this.setState({
            AlertModalShow: false,
            AlertModalRes: "",
            AlertModalMessage: ""
        })
    }

    onRegionChange(resion) {
        this.setState({
            tempLocation: resion,
        });
        Geocoder.init("AIzaSyAv0zTFavJT9I6rvLufEodpCvtMkEkdIX8");
        Geocoder.from(resion.latitude, resion.longitude)
            .then((json) => {
                var addressComponent = json.results[0].formatted_address;

                this.setState({
                    catchedAddress: addressComponent,
                });
            })
            .catch((error) => console.warn(error))
            .finally(() => {
                this.setState({
                    changeMapLoading: false,
                });
            });
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
                    alignItems: "center"
                }}>

                    <View style={{
                        // backgroundColor: "#414",
                        width: "85%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{ fontSize: 25, color: "#fff", fontWeight: "bold" }}>الخريطه</Text>
                    </View>
                </View>
            </>
        );
    }
    renderMap() {
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
            <MapView
                ref={(mapViewRef) => {
                    this.mapViewRef = mapViewRef;
                }}
                onRegionChange={() => {
                    this.setState({
                        changeMapLoading: true,
                    });
                }}
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                initialRegion={this.state.initResion}
                onRegionChangeComplete={(region) => this.onRegionChange(region)}
            >
                {
                    this.state.wholeUsers?.map((marker, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: Number(marker?.user_shop_latitude),
                                    longitude: Number(marker?.user_shop_longitude),
                                    latitudeDelta: 0.009,
                                    longitudeDelta: 0.009,

                                }}
                                onPress={() => {
                                    this.props.navigation.navigate("Trader_profile", {
                                        trader: marker
                                    })
                                    // console.log(JSON.stringify(marker))
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        height: 50,
                                    }}
                                >
                                    <Image
                                        source={images.location}
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                </View>

                            </Marker>
                        )
                    })
                }



            </MapView>
        );
    }



    // renderFakeMarker() {
    //     return (
    //         <View style={styles.markerFixed}>
    //             <Image
    //                 style={{
    //                     height: 48,
    //                     width: 48,
    //                 }}
    //             // source={images.location}
    //             />
    //         </View>
    //     );
    // }






    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                }}
            >
                <StatusBar backgroundColor={"#f00"} barStyle="light-content" />

                {this.renderHeader()}
                {this.renderMap()}
                {/* {this.renderFakeMarker()} */}

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
        );
    }
}

const styles = StyleSheet.create({
    markerFixed: {
        left: "50%",
        marginLeft: -24,
        marginTop: -20,
        position: "absolute",
        top: "50%",
    },



});




        // "user_id": "9",
        // "user_first_phone": "01210715925",
        // "user_second_phone": "01555663696",
// "user_name": "محمود سلطان",
// "user_image_url":,
// "avater",
// "user_shop_name": "سلطان",
        // "user_shop_government": "الغربية",
        // "user_shop_city": "طنطا",
        // "user_shop_address": "شارع البحر",
        // "user_shop_longitude": "29.920532237738",
        // "user_shop_latitude": "31.187399503178",
        // "orderes_count": "2"

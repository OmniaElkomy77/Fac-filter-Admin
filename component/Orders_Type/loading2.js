import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { RFValue } from 'react-native-responsive-fontsize';
const Myloading = ({ index }) => {
  // const { locale } = i18n;
  // const ar = locale === "ar";
  const ar = true;
  const extraStyle = {
    marginTop: index === 0 ? RFValue(25) : 0,
    paddingHorizontal: 4,
  };
  let { width } = Dimensions.get('window');
  width -= RFValue(32);
  const newX = ar ? width - RFValue(202) - RFValue(70) : RFValue(70);
  const newX2 = ar ? width - RFValue(150) - RFValue(70) : RFValue(70);
  return (
    <View style={[styles.container, styles.Seccontainer, extraStyle]}>
      <ContentLoader
        speed={1}
        width={width}
        height={RFValue(118)}
        viewBox={`0 0 ${width} ${RFValue(118)}`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect
          x={ar ? width - RFValue(60) : 2}
          y={RFValue(15)}
          rx="0"
          ry="0"
          width={RFValue(56)}
          height={RFValue(50)}
        />
        <Rect
          x={newX}
          y={RFValue(15)}
          rx="3"
          ry="3"
          width={RFValue(202)}
          height="9"
        />
        <Rect
          x={newX}
          y={RFValue(30)}
          rx="3"
          ry="3"
          width={RFValue(202)}
          height="9"
        />
        <Rect
          x={newX}
          y={RFValue(45)}
          rx="3"
          ry="3"
          width={RFValue(202)}
          height="9"
        />
        <Rect
          x={newX2}
          y={RFValue(60)}
          rx="3"
          ry="3"
          width={RFValue(150)}
          height="9"
        />
        <Rect
          x={ar ? RFValue(10) : width - RFValue(124)}
          y={RFValue(85)}
          rx="0"
          ry="0"
          width={RFValue(123)}
          height={RFValue(25)}
        />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: RFValue(8),
    paddingHorizontal: RFValue(8),
    overflow: 'hidden',
  },
  Seccontainer: {
    minHeight: RFValue(118),
    flexDirection: 'row',
    backgroundColor: "#fff",
    borderRadius: RFValue(15),
    marginBottom: RFValue(38),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 1,
  },
});
export default Myloading;

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import {setSelectedProducts} from '../../services/reducers/CommonReducer';
import {useDispatch, useSelector} from 'react-redux';

const ProductDetails = ({route, navigation}) => {
  const {item} = route?.params ?? {};
  const {selectedProducts} = useSelector(store => store.commonStore);
  console.log(selectedProducts, 'selectedProducts');
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: false,
  });
  return (
    <>
      <TopHeader titile={item?.title} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
        }}>
        {/* image of the product */}
        <View style={styles.imageContainer}>
          <Image source={{uri: item?.image}} style={styles.image} />
        </View>
        {/* product details */}
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: Sizes.hp('2.5%'),
              color: Colors.SECONDRY,
              fontWeight: 'bold',
            }}>
            {item?.title}
          </Text>
          <Text style={{fontSize: Sizes.hp('2%'), color: Colors.TEXT1}}>
            Price:- {item?.price}
          </Text>
          <Text style={{fontSize: Sizes.hp('2%'), color: Colors.TEXT1}}>
            Rating:- {item?.rating?.rate} ({item?.rating?.count})
          </Text>
          <Text style={{fontSize: Sizes.hp('2%'), color: Colors.TEXT1}}>
            Description:- {item?.description}
          </Text>
        </View>

        {/* button for adding in the cart */}
        <CustomButton
          title={'Add to Cart'}
          // disabled={true}
          isLoading={state.loading}
          onPress={() => {
            // add to cart functionality
            setState({
              ...state,
              loading: true,
            });
            //check on unique would go here else inform user
            if (selectedProducts?.findIndex(x => x?.id === item?.id) !== -1) {
              ToastAndroid.show(
                'Product already added in the cart',
                ToastAndroid.SHORT,
              );
              setState({
                ...state,
                loading: false,
              });
              return;
            }
            // dispatch(setSelectedProducts([]));
            dispatch(setSelectedProducts([...selectedProducts, item]));
            setState({
              ...state,
              loading: false,
            });
            ToastAndroid.show('Product added in the cart', ToastAndroid.SHORT);
            navigation.goBack();
          }}
          width="80%"
          marginTop={20}
        />
      </ScrollView>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  imageContainer: {
    width: Sizes.wp('90%'),
    alignSelf: 'center',
    height: Sizes.hp('30%'),
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

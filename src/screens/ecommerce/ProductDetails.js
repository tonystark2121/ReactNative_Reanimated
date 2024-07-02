import {
  Image,
  Platform,
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
import Toast from 'react-native-toast-message';

const ProductDetails = ({route, navigation}) => {
  const {item} = route?.params ?? {};
  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    state => state.commonStore.selectedProducts ?? [],
  );

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
              Platform.OS === 'android' &&
                ToastAndroid.show(
                  'Product already added in the cart',
                  ToastAndroid.SHORT,
                );
              Platform.OS === 'ios' &&
                Toast.show({
                  type: 'error',
                  position: 'bottom',
                  text1: 'Error',
                  text2: 'Product already added in the cart',
                  visibilityTime: 4000,
                  autoHide: true,
                });
              setState({
                ...state,
                loading: false,
              });
              return;
            }

            dispatch(setSelectedProducts([...selectedProducts, item]));
            setState({
              ...state,
              loading: false,
            });
            {
              Platform.OS === 'android' &&
                ToastAndroid.show(
                  'Product added in the cart',
                  ToastAndroid.SHORT,
                );
            }
            {
              Platform.OS === 'ios' &&
                Toast.show({
                  type: 'success',
                  position: 'bottom',
                  text1: 'Success',
                  text2: 'Product added in the cart',
                  visibilityTime: 4000,
                  autoHide: true,
                });
            }
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

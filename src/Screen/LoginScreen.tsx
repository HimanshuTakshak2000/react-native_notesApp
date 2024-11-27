import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/MainStack';

interface LoginScreenprops {
  navigation: StackNavigationProp<RootNavigationParaList, 'Login'>;
}

const LoginScreen = ({navigation}: LoginScreenprops) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<Boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<Boolean>(false);

  const handleLoginPress = () => {
    console.log('login is pressed');
    
    if(email.length === 0 && password.length === 0){
      setIsEmailError(true);
      setIsPasswordError(true);
    }
  };

  const handleCreatePress = () => {
    console.log('Craete Account is pressed');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}>
      {/* <Text>LoginScreen</Text> */}

      <Text style={{fontSize: 30, color: 'black', fontWeight: 'bold'}}>
        Welcome Back
      </Text>
      <View style={{marginTop: 20, marginBottom: 40}}>
        <View style={{marginBottom: 20}}>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              fontSize: 16,
            }}
          />
          {isEmailError && (
            <Text style={{marginTop: 3, color: 'red'}}>Enter Email</Text>
          )}
        </View>

        <View>
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              fontSize: 16,
            }}
          />
          {isPasswordError && (
            <Text style={{marginTop: 3, color: 'red'}}>Enter Password</Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={{backgroundColor: 'black', borderRadius: 8, marginBottom: 60}}
        onPress={() => handleLoginPress()}
        activeOpacity={0.6}>
        <Text
          style={{
            padding: 15,
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{borderColor: 'black', borderRadius: 8, borderWidth: 1}}
        onPress={() => handleCreatePress()}
        activeOpacity={0.6}>
        <Text
          style={{
            padding: 15,
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
/*
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Toast from 'react-native-toast-message';
import Checkbox from '../../components/Checkbox/CheckBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleAddWishlist} from '../../Api/NormalApi';
import {PrimaryButton} from 'deep_native_resources';
import {COLORS} from '../../assets/theme';
import {useAppDispatch, useAppSelector} from '../../Hooks/useSelector';
import {getAllProducts} from '../../redux/WesternWearReducer';
import type {ProductItem} from '../..//Api/WesternWearApi';

import Modal from 'react-native-modal';
import CustomButton from '../../components/CustomButton';
import {handleFilter} from '../../Api/FilterApi';
import {Images} from '../../assets';
import {getFilterData} from '../../redux/FilterReducer';

const sortingOptions = [
  'Recently Added',
  'Popularity',
  'Better Discount',
  'Price: High to Low',
  'Price: Low to High',
  'Customer Rating: Low to High',
  'Customer Rating: High to Low',
];

type selectedcategoriesIdType = {
  categoriesId?: number;
  name?: string;
};

type subcategoriesIdType = {
  subcategoriesId?: number;
  name?: string;
};

type productIdType = {
  id?: number;
  name?: string;
};

type priceType = {
  id?: number;
  priceSend?: string;
  priceShown?: string;
};

const WesternWearScreen = ({navigation, route}: any) => {
  const [favorites, setFavorites] = useState<ProductItem[]>([]);
  const [isSortingVisible, setSortingVisible] = useState(false);
  const [selectedSortOptions, setSelectedSortOptions] = useState(
    Array(sortingOptions.length).fill(false),
  );
  const [sortOptionIndex, setSortOptionIndex] = useState<number | null>(null);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useAppDispatch();
  const allFilterProduct = useAppSelector(state => state.getAllProduct);
  const [sortedData, setSortedData] = useState<ProductItem[]>([]);
  const [displayData, setDisplayData] = useState<ProductItem[]>([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const filterData = useAppSelector(state => state.getFilterProduct);
  const [userTypeArray, setUserTypeArray] = useState([]);
  const [clothingTypeArray, setClothingTypeArray] = useState([]);
  const [dressTypeArray, setDressTypeArray] = useState([]);
  const [colorArray, setColorArray] = useState<string[]>([]);
  const [sizeArray, setSizeArray] = useState<string[]>([]);
  const [materialArray, setmaterialArray] = useState<string[]>([]);
  const [selectedcategoriesId, setSelectedCategoriesId] =
    useState<selectedcategoriesIdType>({});
  const [selectedSubcategoriesId, setSelectedSubcategoriesId] = useState<
    subcategoriesIdType[]
  >([]);
  const [selectedProductId, setSelectedProductId] = useState<productIdType[]>(
    [],
  );
  const [userType, setUserType] = useState('');
  const [clothingType, setClothingType] = useState<string[]>([]);
  const [dressType, setDressType] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<priceType[]>([]);
  const [material, setMaterial] = useState<string[]>([]);
  const [isUserTypeCollapsed, setIsUserTypeCollapsed] = useState(true);
  const [isClothingTypeCollapsed, setIsClothingTypeCollapsed] = useState(true);
  const [isDressTypeCollapsed, setIsDressTypeCollapsed] = useState(true);
  const [isColorCollapsed, setIsColorCollapsed] = useState(true);
  const [isSizeCollapsed, setIsSizeCollapsed] = useState(true);
  const [isPriceCollapsed, setIsPriceCollapsed] = useState(true);
  const [isMaterialCollapsed, setIsMaterialCollapsed] = useState(true);
  const [filteredSubcategoriesId, setFilteredSubcategoriesId] = useState<
    subcategoriesIdType[]
  >([]);
  const [filteredProductId, SetFilteredProductId] = useState<productIdType[]>(
    [],
  );
  const [filteredColors, setFilteredColors] = useState<string[]>([]);
  const [filterSize, setFilterSize] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<priceType[]>([]);
  const [filterMaterial, setFilterMaterial] = useState<string[]>([]);

  const priceRanges = [
    {
      id: 1,
      priceSend: '0-1000',
      priceShown: 'below ₹ 1,000',
    },
    {
      id: 2,
      priceSend: '1000-2000',
      priceShown: '₹ 1,000 - ₹ 2,000',
    },
    {
      id: 3,
      priceSend: '2000-5000',
      priceShown: '₹ 2,000 - ₹ 5,000',
    },
    {
      id: 4,
      priceSend: '5000-10000000000',
      priceShown: 'above ₹ 5,000',
    },
  ];

  useEffect(() => {
    if (route.params.subcategory_id) {
      dispatch(getAllProducts(route.params.subcategory_id));
    }
  }, [route.params.subcategory_id]);

  useEffect(() => {
    if (allFilterProduct?.content) {
      setSortedData(allFilterProduct.content);
      setDisplayData(allFilterProduct.content);
    }
  }, [allFilterProduct.content]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      loadFavoritesFromStorage,
    );
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const query = {
      category_id: selectedcategoriesId.categoriesId,
      subcategory_id:
        selectedSubcategoriesId.length > 0
          ? selectedSubcategoriesId.map(item => item.subcategoriesId)
          : [],
      product_id:
        selectedProductId.length > 0
          ? selectedProductId.map(item => item.id)
          : [],
    };

    dispatch(getFilterData(query));
  }, [
    selectedcategoriesId.categoriesId,
    selectedSubcategoriesId,
    selectedProductId,
  ]);

  useEffect(() => {
    if (filterData.content) {
      setUserTypeArray(filterData.content.categories);
      setClothingTypeArray(filterData.content.subcategories);
      setDressTypeArray(filterData.content.products);
      setColorArray(filterData.content.unique_colors);
      setSizeArray(filterData.content.variant_names);
      setmaterialArray(filterData.content.unique_materials);
    }
  }, [filterData.content]);

  const loadFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const saveFavoritesToStorage = async (favoritesList: ProductItem[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesList));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const toggleFavorite = async (item: ProductItem) => {
    const isFavorited = favorites.some(favItem => favItem.id === item.id);

    if (!isFavorited) {
      try {
        const response = await handleAddWishlist({
          product_item_id: item.id.toString(),
        });

        if (response) {
          const updatedFavorites = [...favorites, item];
          setFavorites(updatedFavorites);
          await saveFavoritesToStorage(updatedFavorites);
          Toast.show({
            type: 'success',
            text1: `${item.name} added to wishlist`,
          });
        } else {
          const errorMessage = response?.message || 'Failed to add to wishlist';
          Toast.show({
            type: 'error',
            text1: errorMessage,
          });
          console.warn('Wishlist addition failed:', response);
        }
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        Toast.show({
          type: 'error',
          text1: 'An error occurred. Please try again.',
        });
      }
    } else {
      const updatedFavorites = favorites.filter(
        favItem => favItem.id !== item.id,
      );
      setFavorites(updatedFavorites);
      await saveFavoritesToStorage(updatedFavorites);
      Toast.show({
        type: 'info',
        text1: `${item.name} removed from wishlist`,
      });
    }
  };

  const toggleSorting = () => setSortingVisible(!isSortingVisible);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    setSearchText('');
    setDisplayData(sortedData);
  };

  const handleCheckBoxChange = (index: number) => {
    const updatedSelections = [...selectedSortOptions];
    if (index === 5 || index === 6) {
      updatedSelections[5] = index === 5 ? !updatedSelections[5] : false;
      updatedSelections[6] = index === 6 ? !updatedSelections[6] : false;
    } else if (index === 3 || index === 4) {
      updatedSelections[3] = index === 3 ? !updatedSelections[3] : false;
      updatedSelections[4] = index === 4 ? !updatedSelections[4] : false;
    } else {
      updatedSelections[index] = !updatedSelections[index];
    }

    setSelectedSortOptions(updatedSelections);

    // Check if all items are false, set sortOptionIndex to null if true
    const isAllFalse = updatedSelections.every(selection => !selection);
    setSortOptionIndex(isAllFalse ? null : index);
  };

  const clearAll = () => {
    setSelectedSortOptions(Array(sortingOptions.length).fill(false));
    setSortOptionIndex(null);
    setDisplayData(sortedData);
  };

  const parsePrice = (price: string) => parseInt(price.replace(/[₹,]/g, ''));

  const applySorting = () => {
    const sortedList = [...sortedData];

    switch (sortOptionIndex) {
      case 3:
        sortedList.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        setDisplayData(sortedList);
        break;
      case 4:
        sortedList.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        setDisplayData(sortedList);
        break;

      case 5:
        sortedList.sort(
          (a, b) =>
            a.rating_and_review.total_review_count -
            b.rating_and_review.total_review_count,
        );
        setDisplayData(sortedList);
        break;
      case 6:
        sortedList.sort(
          (a, b) =>
            b.rating_and_review.total_review_count -
            a.rating_and_review.total_review_count,
        );
        setDisplayData(sortedList);
        break;
    }

    setSortingVisible(false);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim()) {
      const filteredData = sortedData.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setDisplayData(filteredData);
    } else {
      setDisplayData(sortedData);
    }
  };

  const renderItem = ({item}: {item: ProductItem}) => {
    const isFavorited = favorites.some(favItem => favItem.id === item.id);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            productId: item.id,
            productName: item.brand,
            productPrice: item.price,
            productImage: item.image,
            productDescription: item.name,
          })
        }>
        <Image
          source={{uri: item.image}}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite(item)}>
          <Icon
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorited ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{item.brand}</Text>
        <Text style={styles.subtitle}>{item.name}</Text>
        <Text style={styles.price}>
          {item.rating_and_review.total_review_count}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleEmpty = () => {
    return <Text style={styles.title}> No data present!</Text>;
  };

  const handleFilterPress = () => setIsModalVisible(() => !isModalVisible);

  const handleUserType = (name: string, id: number) => {
    setUserType(name);
    setSelectedCategoriesId({categoriesId: id, name});
    setDressTypeArray([]);
    setSelectedSubcategoriesId([]);
    setSelectedProductId([]);
    setClothingType([]);
  };

  const handleClothingType = (name: string, id: number) => {
    if (clothingType.includes(name)) {
      setClothingType(clothingType.filter(n => n !== name));
    } else {
      setClothingType([...clothingType, name]);
    }

    setSelectedSubcategoriesId(prevSelectedIds => {
      const isIdPresent = prevSelectedIds.some(
        item => item.subcategoriesId === id,
      );

      if (isIdPresent) {
        return prevSelectedIds.filter(item => item.subcategoriesId !== id);
      } else {
        return [...prevSelectedIds, {subcategoriesId: id, name}];
      }
    });
  };

  const handleDressType = (name: string, id: number) => {
    if (dressType.includes(name)) {
      setDressType(dressType.filter(n => n !== name));
    } else {
      setDressType([...dressType, name]);
    }

    setSelectedProductId(presvSelectedIds => {
      const isIdPresent = presvSelectedIds.some(item => item.id === id);

      if (isIdPresent) {
        return presvSelectedIds.filter(item => item.id !== id);
      } else {
        return [...presvSelectedIds, {id, name}];
      }
    });
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const togglePrice = (priceSend: string, priceShown: string, id: number) => {
    if (price.includes(priceSend)) {
      setPrice(price.filter(p => p !== priceSend));
    } else {
      setPrice([...price, priceSend]);
    }

    setSelectedPrice(presvSelectedIds => {
      const isIdPresent = presvSelectedIds.some(item => item.id === id);

      if (isIdPresent) {
        return presvSelectedIds.filter(item => item.id !== id);
      } else {
        return [...presvSelectedIds, {id, priceShown, priceSend}];
      }
    });
  };

  const toggleSize = (sizeOption: string) => {
    if (size.includes(sizeOption)) {
      setSize(size.filter(s => s !== sizeOption));
    } else {
      setSize([...size, sizeOption]);
    }
  };

  const toggleMaterial = (materialOption: string) => {
    if (material.includes(materialOption)) {
      setMaterial(material.filter(m => m !== materialOption));
    } else {
      setMaterial([...material, materialOption]);
    }
  };

  const handleApplyFilters = async () => {
    if (selectedcategoriesId.categoriesId !== undefined) {
      const filters = {
        categoryId: selectedcategoriesId.categoriesId,
        subcategoryIds: selectedSubcategoriesId.map(
          item => item.subcategoriesId,
        ),
        productIds: selectedProductId.map(item => item.id),
        colors: selectedColors,
        sizes: size,
        priceRanges: selectedPrice.map(item => item.priceSend),
        materialRanges: material,
      };

      try {
        const response = await handleFilter(filters);
        if (response && response.data) {
          Toast.show({
            type: 'success',
            text1: 'Filters Applied',
            text2: 'Filters were applied successfully 👕',
          });
          setDisplayData(response.data);
          setFilteredSubcategoriesId(selectedSubcategoriesId);
          SetFilteredProductId(selectedProductId);
          setFilteredColors(selectedColors);
          setFilterSize(size);
          setFilterPrice(selectedPrice);
          setFilterMaterial(material);
          handleFilterPress();
        } else {
          Toast.show({
            type: 'success',
            text1: 'Filters Applied',
            text2: 'Filters were applied successfully 👕',
          });
          setDisplayData([]);

          setFilteredSubcategoriesId(selectedSubcategoriesId);
          SetFilteredProductId(selectedProductId);
          setFilteredColors(selectedColors);
          setFilterSize(size);
          setFilterPrice(selectedPrice);
          setFilterMaterial(material);

          handleFilterPress();
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Something went wrong while applying filters 😞',
        });
        handleFilterPress();
      }
    } else {
      console.log('inside else block');
      Toast.show({
        type: 'error',
        text2: 'Error',
        text1: 'Select Any User Type',
      });
    }
  };

  const handleResetAll = () => {
    console.log('reset button is called');
    setFilteredSubcategoriesId([]);
    SetFilteredProductId([]);
    setFilteredColors([]);
    setFilterSize([]);
    setFilterPrice([]);
    setFilterMaterial([]);

    setUserType('');
    setSelectedCategoriesId({});
    setSelectedSubcategoriesId([]);
    setSelectedProductId([]);
    setSelectedColors([]);
    setSize([]);
    setSelectedPrice([]);
    setMaterial([]);

    setDisplayData(sortedData);
  };

  const handleBackOfFilterScreen = () => {
    setIsModalVisible(false);
    setDisplayData(sortedData);
  };

  // console.log('!!!!! selectedSubcategoriesId :- ', selectedSubcategoriesId);
  // console.log('@@@@@ selectedProductId :- ', selectedProductId);
  // console.log('##### selectedColors :- ', selectedColors);
  // console.log('$$$$$ size :- ', size);
  // console.log('%%%%% price :- ', price);
  // console.log('^^^^^ selectedPrice :- ', selectedPrice);
  // console.log('&&&&& material :- ', material);

  console.log('!!!!! filteredSubcategoriesId :- ', filteredSubcategoriesId);
  console.log('@@@@@ filteredProductId :- ', filteredProductId);
  console.log('##### filteredColors :- ', filteredColors);
  console.log('$$$$$ filterSize :- ', filterSize);
  console.log('%%%%% filterPrice :- ', filterPrice);
  console.log('&&&&& filterMaterial :- ', filterMaterial);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Western Wear</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <Icon name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {isSearchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={handleSearch}
          autoFocus
        />
      )}

      {(filteredSubcategoriesId.length > 0 ||
        filteredProductId.length > 0 ||
        filteredColors.length > 0 ||
        filterSize.length > 0 ||
        filterPrice.length > 0 ||
        filterMaterial.length > 0) && (
        <View style={styles.filterHeaderContainer}>
          <ScrollView
            style={styles.filterHeaderContainerScrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {filteredSubcategoriesId.length > 0 && (
              <View style={styles.filterHeaderEachParentView}>
                {filteredSubcategoriesId.map((item: any) => (
                  <View
                    key={item.subcategoriesId}
                    style={styles.filterHeaderEachChildView}>
                    <Text style={styles.filterHeaderEachChildText}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.filterHeaderEachChildImageContainer}>
                      <Image
                        source={Images.ONBOARDING.CANCEL_WHITE}
                        style={styles.filterHeaderEachChildImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {filteredProductId.length > 0 && (
              <View style={styles.filterHeaderEachParentView}>
                {filteredProductId.map((item: any) => (
                  <View key={item.id} style={styles.filterHeaderEachChildView}>
                    <Text style={styles.filterHeaderEachChildText}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.filterHeaderEachChildImageContainer}>
                      <Image
                        source={Images.ONBOARDING.CANCEL_WHITE}
                        style={styles.filterHeaderEachChildImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {filteredColors.length > 0 && (
              <View style={styles.filterHeaderEachParentView}>
                {filteredColors.map((color: any) => (
                  <View key={color} style={styles.filterHeaderEachChildView}>
                    <Text style={styles.filterHeaderEachChildText}>
                      {color.slice(0, 1).toUpperCase() +
                        color.slice(1, color.length)}
                    </Text>
                    <TouchableOpacity
                      style={styles.filterHeaderEachChildImageContainer}>
                      <Image
                        source={Images.ONBOARDING.CANCEL_WHITE}
                        style={styles.filterHeaderEachChildImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {filterSize.length > 0 && (
              <View style={styles.filterHeaderEachParentView}>
                {filterSize.map((sizeOption: any) => (
                  <View
                    key={sizeOption}
                    style={styles.filterHeaderEachChildView}>
                    <Text style={styles.filterHeaderEachChildText}>
                      {sizeOption}
                    </Text>
                    <TouchableOpacity
                      style={styles.filterHeaderEachChildImageContainer}>
                      <Image
                        source={Images.ONBOARDING.CANCEL_WHITE}
                        style={styles.filterHeaderEachChildImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {filterPrice.length > 0 && (
              <View style={styles.filterHeaderEachParentView}>
                {filterPrice.map((item: any) => (
                  <View key={item.id} style={styles.filterHeaderEachChildView}>
                    <Text style={styles.filterHeaderEachChildText}>
                      {item.priceShown}
                    </Text>
                    <TouchableOpacity
                      style={styles.filterHeaderEachChildImageContainer}>
                      <Image
                        source={Images.ONBOARDING.CANCEL_WHITE}
                        style={styles.filterHeaderEachChildImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {filterMaterial.length > 0 && (
              <View style={styles.filterHeaderEachParentView}>
                {filterMaterial.map((materialOption: any) => (
                  <View
                    key={materialOption}
                    style={styles.filterHeaderEachChildView}>
                    <Text style={styles.filterHeaderEachChildText}>
                      {materialOption}
                    </Text>
                    <TouchableOpacity
                      style={styles.filterHeaderEachChildImageContainer}>
                      <Image
                        source={Images.ONBOARDING.CANCEL_WHITE}
                        style={styles.filterHeaderEachChildImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleSorting}>
          <Text style={styles.buttonText}>Sorting</Text>
          <Icon name="filter-outline" size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFilterPress}>
          <Text style={styles.buttonText}>Filter</Text>
          <Icon name="funnel-outline" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {isSortingVisible && (
        <View style={styles.sortingDropdown}>
          {sortingOptions.map((option, index) => (
            <View key={index} style={styles.sortingOption}>
              <Text style={styles.sortOptionText}>{option}</Text>
              <Checkbox
                checked={selectedSortOptions[index]}
                onPress={() => handleCheckBoxChange(index)}
              />
            </View>
          ))}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainerr}>
              <PrimaryButton
                title="Apply"
                gradientColors={[COLORS.lightBrown, COLORS.textButton]}
                onPress={applySorting}
                size="medium"
                style={styles.filterApply}
              />
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={displayData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={handleEmpty}
      />

      <Modal isVisible={isModalVisible} style={{padding: 0, margin: 0}}>
        <View style={styles.filtercontainer}>
          <View style={styles.filterHeader}>
            <TouchableOpacity onPress={() => handleBackOfFilterScreen()}>
              <Image source={Images.ONBOARDING.LeftArrow} />
            </TouchableOpacity>
            <Text>Filters</Text>
            <TouchableOpacity onPress={() => handleResetAll()}>
              <Text>Reset all</Text>
            </TouchableOpacity>
          </View>

          {(selectedSubcategoriesId.length > 0 ||
            (selectedSubcategoriesId.length > 0 &&
              selectedProductId.length > 0) ||
            selectedColors.length > 0 ||
            size.length > 0 ||
            price.length > 0 ||
            material.length > 0) && (
            <View style={styles.filterHeaderContainer}>
              <ScrollView
                style={styles.filterHeaderContainerScrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {selectedSubcategoriesId.length > 0 && (
                  <View style={styles.filterHeaderEachParentView}>
                    {selectedSubcategoriesId.map((item: any) => (
                      <View
                        key={item.subcategoriesId}
                        style={styles.filterHeaderEachChildView}>
                        <Text style={styles.filterHeaderEachChildText}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          style={styles.filterHeaderEachChildImageContainer}
                          onPress={() =>
                            handleClothingType(item.name, item.subcategoriesId)
                          }>
                          <Image
                            source={Images.ONBOARDING.CANCEL_WHITE}
                            style={styles.filterHeaderEachChildImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {selectedSubcategoriesId.length > 0 &&
                  selectedProductId.length > 0 && (
                    <View style={styles.filterHeaderEachParentView}>
                      {selectedProductId.map((item: any) => (
                        <View
                          key={item.id}
                          style={styles.filterHeaderEachChildView}>
                          <Text style={styles.filterHeaderEachChildText}>
                            {item.name}
                          </Text>
                          <TouchableOpacity
                            style={styles.filterHeaderEachChildImageContainer}
                            onPress={() => handleDressType(item.name, item.id)}>
                            <Image
                              source={Images.ONBOARDING.CANCEL_WHITE}
                              style={styles.filterHeaderEachChildImage}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}

                {selectedColors.length > 0 && (
                  <View style={styles.filterHeaderEachParentView}>
                    {selectedColors.map((color: any) => (
                      <View
                        key={color}
                        style={styles.filterHeaderEachChildView}>
                        <Text style={styles.filterHeaderEachChildText}>
                          {color.slice(0, 1).toUpperCase() +
                            color.slice(1, color.length)}
                        </Text>
                        <TouchableOpacity
                          style={styles.filterHeaderEachChildImageContainer}
                          onPress={() => toggleColor(color)}>
                          <Image
                            source={Images.ONBOARDING.CANCEL_WHITE}
                            style={styles.filterHeaderEachChildImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {size.length > 0 && (
                  <View style={styles.filterHeaderEachParentView}>
                    {size.map((sizeOption: any) => (
                      <View
                        key={sizeOption}
                        style={styles.filterHeaderEachChildView}>
                        <Text style={styles.filterHeaderEachChildText}>
                          {sizeOption}
                        </Text>
                        <TouchableOpacity
                          style={styles.filterHeaderEachChildImageContainer}
                          onPress={() => toggleSize(sizeOption)}>
                          <Image
                            source={Images.ONBOARDING.CANCEL_WHITE}
                            style={styles.filterHeaderEachChildImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {selectedPrice.length > 0 && (
                  <View style={styles.filterHeaderEachParentView}>
                    {selectedPrice.map((item: any) => (
                      <View
                        key={item.id}
                        style={styles.filterHeaderEachChildView}>
                        <Text style={styles.filterHeaderEachChildText}>
                          {item.priceShown}
                        </Text>
                        <TouchableOpacity
                          style={styles.filterHeaderEachChildImageContainer}
                          onPress={() =>
                            togglePrice(
                              item.priceSend,
                              item.priceShown,
                              item.id,
                            )
                          }>
                          <Image
                            source={Images.ONBOARDING.CANCEL_WHITE}
                            style={styles.filterHeaderEachChildImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {material.length > 0 && (
                  <View style={styles.filterHeaderEachParentView}>
                    {material.map((materialOption: any) => (
                      <View
                        key={materialOption}
                        style={styles.filterHeaderEachChildView}>
                        <Text style={styles.filterHeaderEachChildText}>
                          {materialOption}
                        </Text>
                        <TouchableOpacity
                          style={styles.filterHeaderEachChildImageContainer}
                          onPress={() => toggleMaterial(materialOption)}>
                          <Image
                            source={Images.ONBOARDING.CANCEL_WHITE}
                            style={styles.filterHeaderEachChildImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>
            </View>
          )}

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* User Type Section 
            <TouchableOpacity
              onPress={() => setIsUserTypeCollapsed(!isUserTypeCollapsed)}
              style={styles.filterSection}>
              <View style={styles.filterSectionView}>
                <Text style={styles.filterLabel}>User Type</Text>
                {isUserTypeCollapsed && (
                  <Image
                    source={Images.ONBOARDING.DOWN_ARROW}
                    style={styles.filterLabelArrow}
                  />
                )}
              </View>
            </TouchableOpacity>

            {!isUserTypeCollapsed && (
              <View style={styles.filterOptions}>
                {userTypeArray.length > 0 &&
                  userTypeArray.map((item: any) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.optionButton,
                        userType === item.name && styles.selectedOption,
                      ]}
                      onPress={() => handleUserType(item.name, item.id)}>
                      <Text
                        style={
                          userType === item.name
                            ? styles.selectedText
                            : styles.optionText
                        }>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}

            {/* Clothing Type Section 
            {clothingTypeArray.length > 0 && (
              <>
                <TouchableOpacity
                  onPress={() =>
                    setIsClothingTypeCollapsed(!isClothingTypeCollapsed)
                  }
                  style={styles.filterSection}>
                  <View style={styles.filterSectionView}>
                    <Text style={styles.filterLabel}>Clothing Type</Text>
                    {isClothingTypeCollapsed && (
                      <Image
                        source={Images.ONBOARDING.DOWN_ARROW}
                        style={styles.filterLabelArrow}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {!isClothingTypeCollapsed && (
                  <View style={styles.filterOptions}>
                    {clothingTypeArray.map((item: any) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.optionButton,
                          clothingType.includes(item.name) &&
                            styles.selectedOption,
                        ]}
                        onPress={() => handleClothingType(item.name, item.id)}>
                        <Text
                          style={
                            clothingType.includes(item.name)
                              ? styles.selectedText
                              : styles.optionText
                          }>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}

            {/* Dress Type 
            {dressTypeArray.length > 0 && (
              <>
                <TouchableOpacity
                  onPress={() => setIsDressTypeCollapsed(!isDressTypeCollapsed)}
                  style={styles.filterSection}>
                  <View style={styles.filterSectionView}>
                    <Text style={styles.filterLabel}>
                      {clothingType.length > 1 ? 'Choose Type' : clothingType}
                    </Text>
                    {isDressTypeCollapsed && (
                      <Image
                        source={Images.ONBOARDING.DOWN_ARROW}
                        style={styles.filterLabelArrow}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {!isDressTypeCollapsed && (
                  <View style={styles.filterOptions}>
                    {dressTypeArray.map((item: any) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.optionButton,
                          dressType.includes(item.name) &&
                            styles.selectedOption,
                        ]}
                        onPress={() => handleDressType(item.name, item.id)}>
                        <Text
                          style={
                            dressType.includes(item.name)
                              ? styles.selectedText
                              : styles.optionText
                          }>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}

            {/* Color Section 
            {colorArray.length > 0 && (
              <>
                <TouchableOpacity
                  onPress={() => setIsColorCollapsed(!isColorCollapsed)}
                  style={styles.filterSection}>
                  <View style={styles.filterSectionView}>
                    <Text style={styles.filterLabel}>Color</Text>
                    {isColorCollapsed && (
                      <Image
                        source={Images.ONBOARDING.DOWN_ARROW}
                        style={styles.filterLabelArrow}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {!isColorCollapsed && (
                  <View style={styles.colorOptions}>
                    {colorArray.map((color: string) => (
                      <TouchableOpacity
                        key={color}
                        style={[
                          styles.colorCircle,
                          {backgroundColor: (color as string).toLowerCase()},
                          selectedColors.includes(color) &&
                            styles.selectedColor,
                        ]}
                        onPress={() => toggleColor(color)}
                      />
                    ))}
                  </View>
                )}
              </>
            )}

            {/* Size Section 
            {sizeArray.length > 0 && (
              <>
                <TouchableOpacity
                  onPress={() => setIsSizeCollapsed(!isSizeCollapsed)}
                  style={styles.filterSection}>
                  <View style={styles.filterSectionView}>
                    <Text style={styles.filterLabel}>Size</Text>
                    {isSizeCollapsed && (
                      <Image
                        source={Images.ONBOARDING.DOWN_ARROW}
                        style={styles.filterLabelArrow}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {!isSizeCollapsed && (
                  <View style={styles.filterOptions}>
                    {sizeArray.map(sizeOption => (
                      <TouchableOpacity
                        key={sizeOption}
                        style={[
                          styles.optionButton,
                          size.includes(sizeOption) && styles.selectedOption,
                        ]}
                        onPress={() => toggleSize(sizeOption)}>
                        <Text
                          style={
                            size.includes(sizeOption)
                              ? styles.selectedText
                              : styles.optionText
                          }>
                          {sizeOption}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}

            {/* Price Section 
            <TouchableOpacity
              onPress={() => setIsPriceCollapsed(!isPriceCollapsed)}
              style={styles.filterSection}>
              <View style={styles.filterSectionView}>
                <Text style={styles.filterLabel}>Price</Text>
                {isPriceCollapsed && (
                  <Image
                    source={Images.ONBOARDING.DOWN_ARROW}
                    style={styles.filterLabelArrow}
                  />
                )}
              </View>
            </TouchableOpacity>
            {!isPriceCollapsed && (
              <View style={styles.filterOptions}>
                {priceRanges.map(priceRange => (
                  <TouchableOpacity
                    key={priceRange.id}
                    style={[
                      styles.optionButton,
                      price.includes(priceRange.priceSend) &&
                        styles.selectedOption,
                    ]}
                    onPress={() =>
                      togglePrice(
                        priceRange.priceSend,
                        priceRange.priceShown,
                        priceRange.id,
                      )
                    }>
                    <Text
                      style={
                        price.includes(priceRange.priceSend)
                          ? styles.selectedText
                          : styles.optionText
                      }>
                      {priceRange.priceShown}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Brands Section 
            {/* <TouchableOpacity
              onPress={() => setIsBrandCollapsed(!isBrandCollapsed)}
              style={styles.filterSection}>
              <Text style={styles.filterLabel}>Brands</Text>
            </TouchableOpacity>
            {!isBrandCollapsed && (
              <View style={styles.filterOptions}>
                {brands.map(brandOption => (
                  <TouchableOpacity
                    key={brandOption}
                    style={[
                      styles.optionButton,
                      brand === brandOption && styles.selectedOption,
                    ]}
                    onPress={() => setBrand(brandOption)}>
                    <Text
                      style={
                        brand === brandOption
                          ? styles.selectedText
                          : styles.optionText
                      }>
                      {brandOption}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )} 

            {/* Material Section materialArray 
            {materialArray.length > 0 && (
              <>
                <TouchableOpacity
                  onPress={() => setIsMaterialCollapsed(!isMaterialCollapsed)}
                  style={styles.filterSection}>
                  <View style={styles.filterSectionView}>
                    <Text style={styles.filterLabel}>Material</Text>
                    {isMaterialCollapsed && (
                      <Image
                        source={Images.ONBOARDING.DOWN_ARROW}
                        style={styles.filterLabelArrow}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                {!isMaterialCollapsed && (
                  <View style={styles.filterOptions}>
                    {materialArray.map(materialOption => (
                      <TouchableOpacity
                        key={materialOption}
                        style={[
                          styles.optionButton,
                          material.includes(materialOption) &&
                            styles.selectedOption,
                        ]}
                        onPress={() => toggleMaterial(materialOption)}>
                        <Text
                          style={
                            material.includes(materialOption)
                              ? styles.selectedText
                              : styles.optionText
                          }>
                          {materialOption}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}

            {/* Apply Button 
            <View style={styles.filterButtonContainer}>
              <CustomButton
                text="Apply"
                colors={['#BFA59A', '#3F271E']}
                onPress={handleApplyFilters}
              />
            </View>

            {/* Toast Component 
            <Toast />
          </ScrollView>
        </View>
      </Modal>

      <Toast position="bottom" />
    </View>
  );
};

export default WesternWearScreen;


 */
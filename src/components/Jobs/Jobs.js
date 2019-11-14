import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Image,
  ScrollView,
} from 'react-native';
import {Text, Button, Icon, Input, Spinner} from 'react-native-ui-kitten';
import axios from 'axios';
import {
  Container,
  Card,
  CardItem,
  Body,
  Header,
  Content,
  CardImage,
  Badge,
} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/id';
import rupiah from 'rupiah-format';
import FAB from 'react-native-fab';
import Modal from 'react-native-modal';
import {WaveIndicator} from 'react-native-indicators';
import {NavigationEvents} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {Facebook as Loader} from 'react-content-loader/native';
import {Footer, FooterTab} from 'native-base';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      jobSearch: [],
      dataCategory: [],
      dataCompany: [],
      next: '',
      prev: '',
      totalPage: '',
      infoPage: {},
      isLoading: true,
      jobIdSelected: null,

      //   for query
      search: '',
      location: '',
      limit: 5,
      page: 1,
      sortby: 'j.updated_at',
      orderby: 'desc',

      //for add
      selectedId: [],
      name: '',
      description: '',
      salary: '',
      location: '',
      logo: '',

      category_id: 1,
      company_id: 1,
      formStatus: 'Add',
      buttonDisabled: false,
      category: '',
      company: '',
      status: '',
      readMore: false,
      isError: true,
      message: '',
      isVisible: false,
      locationArray: ['Jakarta', 'Bandung', 'Solo'],
      isLoadingDelete: false,
      deleteJobId: '',
      showModalDelete: false,
      // getToken: false
    };
  }
  componentDidMount() {
    this.getJob();
  }

  // async checkAuth() {
  //   const token = await AsyncStorage.getItem('token');
  //   if (!token) {
  //     this.props.navigation.replace('Login');
  //   }
  //   console.log(token);
  // }

  async getJob(search, location, limit, page, sortby, orderby) {
    this.setState({
      isLoading: true,
    });

    await axios
      .get(
        `http://localhost:5200/api/v1/jobs?name=&location&limit=20&page=1&sortby=updated_at&orderby=desc`,
      )
      .then(res => {
        this.setState({
          data: res.data.data.result,
          isLoading: false,
          status: '',
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  async searchJob(event) {
    this.setState({
      isLoading: true,
    });
    await axios
      .get(
        `http://localhost:5200/api/v1/jobs?name=${event.nativeEvent.text}&location=${this.state.location}&limit=100&page=1&sortby=updated_at&orderby=desc`,
      )
      .then(res => {
        console.log(res.data.data.result);
        this.setState({
          data: res.data.data.result,
          isLoading: false,
          status: '',
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          status: '404',
        });
        console.log(err.message);
      });
  }

  async searchLocation(event) {
    this.setState({
      isLoading: true,
    });
    await axios
      .get(
        `http://localhost:5200/api/v1/jobs?name=${this.state.search}&location=${event.nativeEvent.text}&limit=100&page=1&sortby=updated_at&orderby=desc`,
      )
      .then(res => {
        // console.log(res.data.data.result);
        this.setState({
          data: res.data.data.result,
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          status: '404',
        });
        console.log(err);
      });
  }

  async deleteJob() {
    this.setState({
      isLoadingDelete: true,
    });
    await axios
      .delete(`http://localhost:5200/api/v1/jobs/${this.state.deleteJobId}`)
      .then(res => {
        // console.log(res);

        if (res.data.status == 200) {
          const jobIndex = this.state.data
            .map(val => {
              return val.id;
            })
            .indexOf(this.state.deleteJobId);

          let data = this.state.data;
          data.splice(jobIndex, 1);

          this.setState({
            data,
          });
          ToastAndroid.show('Pekerjaan telah di hapus', ToastAndroid.LONG);
        }

        if (res.data.status != 200) {
          ToastAndroid.show('Ada yang salah', ToastAndroid.LONG);
        }

        this.setState({
          isLoadingDelete: false,
        });

        this.toggleModalDelete();
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          isLoadingDelete: false,
        });
        this.toggleModalDelete();
      });
  }

  toggleModalDelete(id) {
    const showModalDelete = !this.state.showModalDelete;
    this.setState({
      showModalDelete,
      deleteJobId: id,
    });
  }

  resetSearch() {
    this.setState({
      search: '',
    });
    this.getJob();
  }
  resetLocation() {
    this.setState({
      location: '',
    });
    this.getJob();
  }

  _renderIconSearch = style => {
    return <Icon {...style} name="close-outline" />;
  };

  _renderListJob = () => {
    if (this.state.isLoading) {
      const array = [1, 2, 3, 4];

      return (
        <Loader
          height={140}
          style={{
            padding: 20,
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            marginVertical: 20,
            marginHorizontal: 10,
            // elevation: 10,
            backgroundColor: '#fff',
          }}
        />
      );
    } else if (this.state.status === '404') {
      return (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text>Pekerjaan Tidak ditemukan</Text>
        </View>
      );
    } else {
      return (
        <>
          <Modal
            isVisible={this.state.showModalDelete}
            animationIn="zoomIn"
            animationOut="fadeOut"
            animationInTiming={400}
            animationOutTiming={200}>
            <View style={styles.modal}>
              <Text category="h6" style={{color: '#fff', marginBottom: 20}}>
                mau menghapus pekerjaan ?
              </Text>
              <View>
                {this.state.isLoadingDelete ? (
                  <WaveIndicator color="#409BF6" />
                ) : (
                  <Button
                    style={styles.modalActionYes}
                    status="danger"
                    style={{width: 150, marginBottom: 30}}
                    onPress={() => this.deleteJob()}>
                    Iya
                  </Button>
                )}
                <Button
                  style={styles.modalActionNo}
                  status="basic"
                  appearance="outline"
                  style={{width: 150}}
                  onPress={() => this.toggleModalDelete()}>
                  Batal
                </Button>
              </View>
            </View>
          </Modal>

          <SwipeListView
            data={this.state.data}
            renderHiddenItem={(data, index) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EditJobScreen', data.item)
                  }>
                  <View style={{alignItems: 'center'}}>
                    <Icon
                      name="edit-2-outline"
                      fill="#6000FF"
                      width={32}
                      height={32}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.toggleModalDelete(data.item.id)}>
                  <View style={{alignItems: 'center'}}>
                    <Icon
                      name="trash-2-outline"
                      fill="#f5365c"
                      width={32}
                      height={32}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-80}
            renderItem={({item, index}) => (
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('DetailJobScreen', item)
                  }
                  activeOpacity={1}>
                  {/* <View style={styles.card}>
                    <View style={[styles.displayRow, {padding: 12}]}>
                      <Image
                        source={{uri: item.logo}}
                        style={styles.imageProduct}
                      />
                      <View>
                        <Text category="h6" style={styles.textTitle}>
                          {item.job}
                        </Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <View style={styles.priceTag}>
                            <Text category="s1" style={styles.textWhite}>
                              {item.salary}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View> */}
                  <View>
                    <Card style={{borderRadius: 10, marginBottom: 10}}>
                      <CardItem
                        bordered
                        style={{
                          borderRadius: 10,
                        }}>
                        <Body style={{flexDirection: 'row'}}>
                          <View>
                            <Image
                              source={{
                                uri: `http://localhost:5200/public/logo/${item.logo}`,
                              }}
                              style={{
                                height: 80,
                                width: 80,
                              }}
                            />
                          </View>
                          <View style={{marginLeft: 16, width: 100, flex: 1}}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 17,
                                fontFamily: 'Poppins-Medium',
                              }}>
                              {item.job}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Poppins-Regular',
                                fontSize: 12,
                              }}>
                              {item.company}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginLeft: 20,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    flexWrap: 'wrap',
                                    width: 150,
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Light',
                                  }}>
                                  {item.location}
                                </Text>
                              </View>
                              <View style={{marginRight: 10}}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    fontSize: 12,
                                    fontFamily: 'Poppins-Light',
                                  }}>
                                  {moment(item.updated_at).fromNow(true)} yang
                                  lalu
                                </Text>
                              </View>
                            </View>
                            <Text
                              style={{
                                fontSize: 13,
                                fontFamily: 'Poppins-Regular',
                                color: '#0DC200',
                              }}>
                              {rupiah.convert(item.salary)}
                            </Text>
                            <View>
                              <Badge style={{backgroundColor: '#409BF6'}}>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontFamily: 'Poppins-Medium',
                                    fontSize: 11,
                                  }}>
                                  {item.category}
                                </Text>
                              </Badge>
                              {/* {this._renderBadge()} */}
                            </View>
                          </View>
                        </Body>
                      </CardItem>
                    </Card>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this.getJob()}
              />
            }
          />
        </>
      );
    }
  };

  _autoRender() {
    const {navigation} = this.props;
    if (navigation.getParam('edited')) {
      const jobIndex = this.state.data
        .map(val => {
          return val.id;
        })
        .indexOf(navigation.getParam('data').id);
      // console.log(jobIndex);
      let data = this.state.data;

      data[jobIndex].name = navigation.getParam('data').name;
      data[jobIndex].description = navigation.getParam('data').description;
      data[jobIndex].salary = navigation.getParam('data').salary;
      data[jobIndex].location = navigation.getParam('data').location;
      data[jobIndex].category_id = navigation.getParam('data').category_id;
      data[jobIndex].company_id = navigation.getParam('data').company_id;

      this.setState({
        data: data,
      });
    } else {
      this.setState({
        data: [...this.state.data, navigation.getParam('data')],
      });
    }
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 3,
            }}>
            <Input
              style={{flex: 1, marginRight: 2}}
              size="small"
              placeholder="Cari.."
              value={this.state.search}
              icon={this._renderIconSearch}
              onIconPress={() => this.resetSearch()}
              onChangeText={val => this.setState({search: val})}
              onSubmitEditing={event => this.searchJob(event)}
            />
            <Input
              style={{flex: 1, marginLeft: 2}}
              size="small"
              placeholder="Lokasi.."
              value={this.state.location}
              icon={this._renderIconSearch}
              onIconPress={() => this.resetSearch()}
              onChangeText={val => this.setState({location: val})}
              onSubmitEditing={event => this.searchLocation(event)}
            />
          </View>

          <View style={{marginTop: 12}}>{this._renderListJob()}</View>
        </View>

        <FAB
          buttonColor="#409BF6"
          iconTextColor="#FFFFFF"
          onClickAction={() => this.props.navigation.navigate('AddJobScreen')}
          visible={true}
          iconTextComponent={
            <Icon name="plus-outline" width={30} height={30} fill="#fff" />
          }
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    // marginBottom: 40,
    paddingBottom: 150,
  },
  textTitle: {
    fontFamily: 'Poppins',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    position: 'absolute',
    right: 0,
  },
  card: {
    backgroundColor: '#fff',
    elevation: 6,
    marginVertical: 12,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  modal: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default Jobs;

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

  async getJob(search, location, limit, page, sortby, orderby) {
    this.setState({
      isLoading: true,
    });

    await axios
      .get(
        `http://10.0.2.2:5200/api/v1/jobs?name=&location&limit=5&page=1&sortby=updated_at&orderby=desc`,
      )
      .then(res => {
        this.setState({
          data: res.data.data.result,
          isLoading: false,
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
        `http://10.0.2.2:5200/api/v1/jobs?name=${event.nativeEvent.text}&location&limit=100&page=1&sortby=updated_at&orderby=desc`,
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
        });
        console.log(err);
      });
  }

  async deleteJob() {
    this.setState({
      isLoadingDelete: true,
    });
    await axios
      .delete(`http://10.0.2.2:5200/api/v1/jobs/${this.state.deleteJobId}`)
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

          ToastAndroid.show('Product has been deleted', ToastAndroid.LONG);
        }

        if (res.data.status != 200) {
          ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
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

  _renderIconSearch = style => {
    return <Icon {...style} name="close-outline" />;
  };

  _renderListJob = () => {
    if (this.state.isLoading) {
      return (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Spinner status="alternative" />
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
              <Text category="h6" style={styles.modalTitle}>
                Are you sure want to delete ?
              </Text>
              <View style={styles.modalFooter}>
                {this.state.isLoadingDelete ? (
                  <WaveIndicator color="#409BF6" />
                ) : (
                  <Button
                    style={styles.modalActionYes}
                    status="danger"
                    onPress={() => this.deleteJob()}>
                    Yes, sure!
                  </Button>
                )}
                <Button
                  style={styles.modalActionNo}
                  status="basic"
                  appearance="outline"
                  onPress={() => this.toggleModalDelete()}>
                  Cancel
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
                    <Card style={{borderRadius: 18, marginBottom: 10}}>
                      <CardItem
                        bordered
                        style={{
                          borderRadius: 18,
                        }}>
                        <Body style={{flexDirection: 'row'}}>
                          <View>
                            <Image
                              source={{
                                uri: `http://10.0.2.2:5200/public/logo/${item.logo}`,
                              }}
                              style={{
                                height: 100,
                                width: 100,
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
                                marginLeft: 4,
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

  // _autoRender() {
  //   const {navigation} = this.props;
  //   let data = this.state.data;
  //   // console.log(this.state.data);
  //   this.setState({
  //     data: [...this.state.data, navigation.getParam('data')],
  //   });
  // }

  render() {
    return (
      <>
        <View style={styles.container}>
          {/* <NavigationEvents onDidFocus={() => this._autoRender()} /> */}
          <Input
            style={{marginTop: 12}}
            size="small"
            placeholder="Search.."
            value={this.state.search}
            icon={this._renderIconSearch}
            onIconPress={() => this.resetSearch()}
            onChangeText={val => this.setState({search: val})}
            onSubmitEditing={event => this.searchJob(event)}
          />
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
    marginBottom: 40,
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
});

export default Jobs;

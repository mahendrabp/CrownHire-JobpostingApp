import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import {Text, Button, Icon, Input, Spinner} from 'react-native-ui-kitten';
import axios from 'axios';
import {Container, Card, CardItem, Body, Header, Content} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';

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
        `http://10.0.2.2:5200/api/v1/jobs?name=&location&limit=100&page=1&sortby=name`,
      )
      .then(res => {
        console.log(res.data.data.result);
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
        `http://10.0.2.2:5200/api/v1/jobs?name=${event.nativeEvent.text}&location&limit=100&page=1&sortby=name`,
      )
      .then(res => {
        console.log(res.data.data.result);
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
          <SwipeListView
            data={this.state.data}
            renderHiddenItem={(data, index) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EditScreen', data.item)
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
                  onPress={() => alert(item.id)}
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
                  <Card>
                    <CardItem>
                      <Body>
                        <Text>{item.job}</Text>
                      </Body>
                    </CardItem>
                  </Card>
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

  render() {
    return (
      <>
        <View style={styles.container}>
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
    fontFamily: 'Montserrat-Bold',
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

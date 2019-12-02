import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  ToastAndroid,
} from 'react-native';
import {Text, Input, Select, Button} from 'react-native-ui-kitten';
import {WaveIndicator} from 'react-native-indicators';
import axios from 'axios';
import rupiah from 'rupiah-format';

class EditJobScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      salary: '',
      location: '',
      category_id: '',
      company_id: '',

      categories: [],
      category: '',
      companies: [],
      current_category: {},
      isLoading: false,
    };
  }

  // static navigationOptions = ({navigation}) => {
  //   return {
  //     headerTitle: (
  //       <Text category="h6" style={{fontFamily: 'Montserrat-Bold'}}>
  //         {navigation.getParam('name', 'No name')}
  //       </Text>
  //     ),
  //   };
  // };

  async componentDidMount() {
    const {navigation} = this.props;
    this.dataCategory();
    this.dataCompany();
    this.currCategory();
    // const current_category = this.state.categories.map(v => v);

    // const current_category = this.state.categories.find(
    //   category => category.id == navigation.getParam('category_id'),
    // );

    // console.log(navigation.getParam('category_id'));
    // await this.getCategory();

    const current_category = this.state.categories.find(
      category => category.id === navigation.getParam('category_id'),
    );

    this.setState({
      id: navigation.getParam('id'),
      name: navigation.getParam('job'),
      description: navigation.getParam('description'),
      salary: navigation.getParam('salary'),
      location: navigation.getParam('location'),
      category_id: navigation.getParam('category_id'),
      company_id: navigation.getParam('company_id'),
      category: navigation.getParam('category'),
    });
  }

  // async getCategory() {
  //   await Http.get('/category')
  //     .then(res => {
  //       let categories = [];
  //       res.data.data.forEach((val, key) => {
  //         categories.push({text: val.name, id: val.id});
  //       });
  //       this.setState({
  //         categories,
  //       });
  //       console.log(categories);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // }

  async updateJob() {
    const {
      name,
      description,
      salary,
      location,
      category_id,
      company_id,
    } = this.state;

    const formData = new FormData();

    this.setState({
      isLoading: true,
    });

    formData.append('name', name);
    formData.append('description', description);
    formData.append('salary', salary);
    formData.append('location', location);
    formData.append('category_id', category_id);
    formData.append('company_id', company_id);

    // console.log(name, description, category_id);

    await axios
      .patch(`http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/jobs/${this.state.id}`, formData)

      .then(res => {
        // console.log(res.data.status);
        if (res.data.status !== 200) {
          this.setState({
            // errors: res.data.errors,
            // isLoadingBtn: false,
          });
        }

        if (res.data.status === 200) {
          this.props.navigation.navigate('Jobs', {
            data: res.data.data,
            edited: true,
          });
          ToastAndroid.show('berhasil mengedit', ToastAndroid.LONG);
          // this.setState({
          //   isLoadingBtn: false,
          // });
        }
      })
      .catch(err => {
        this.setState({
          isLoadingBtn: false,
        });
        console.log(err);
      });
  }

  async dataCategory() {
    const url = 'http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/categories';
    await axios
      .get(url)
      .then(result => {
        const dataCategory = result.data.data;
        // console.log(result.data.data);
        this.setState({
          categories: dataCategory,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async currCategory() {
    const current_category = this.state.categories.map(
      category => category.id == navigation.getParam('category_id'),
    );

    await this.setState({
      current_category: current_category,
    });

    console.log(current_category);
  }

  async handleSelectCategory(data) {
    await this.setState({
      category_id: data.id,
      category: data.category,
      current_category: data,
    });
  }

  async dataCompany() {
    const url = 'http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/companies';
    await axios
      .get(url)
      .then(result => {
        const dataCompany = result.data.data;
        console.log(result.data.data);
        this.setState({
          companies: dataCompany,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async handleSelectCompany(data) {
    await this.setState({});
  }

  onChangeText(value) {
    console.log(value);
  }

  render() {
    const {navigation} = this.props;

    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            {/* <Image
              source={{uri: navigation.getParam('image')}}
              style={styles.imageProduct}
            /> */}
            <View style={styles.card}>
              <Text category="h6" style={styles.cardTitle}>
                Edit Jobs
              </Text>
              <Input
                style={styles.input}
                size="small"
                placeholder="Job"
                label="Edit Job"
                onChangeText={val => this.setState({name: val})}
                value={this.state.name}
              />
              <Input
                style={styles.input}
                size="small"
                placeholder="Location"
                label="Location"
                onChangeText={val => this.setState({location: val})}
                value={this.state.location}
              />
              {/* <Select
                label="Category"
                style={styles.input}
                data={this.state.categories}
                placeholder="Active"
                selectedOption={{halo: 'test'}}
                onSelect={data => this.handleSelectCategory(data)}></Select> */}
              <Text>Pilih Kategori</Text>
              <Picker
                selectedValue={this.state.category_id}
                label="select category"
                style={{height: 50, width: 300}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({category_id: itemValue})
                }>
                {this.state.categories.map(v => (
                  <Picker.Item
                    label={v.category}
                    value={v.id.toString()}
                    key={v.id.toString()}
                  />
                ))}
              </Picker>

              <Text>Pilih Perusahaan</Text>
              <Picker
                selectedValue={this.state.company_id}
                label="select company"
                style={{height: 50, width: 300}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({company_id: itemValue})
                }>
                {this.state.companies.map(v => (
                  <Picker.Item
                    label={v.name}
                    value={v.id.toString()}
                    key={v.id.toString()}
                  />
                ))}
              </Picker>
              <Input
                keyboardType="numeric"
                style={styles.input}
                size="small"
                placeholder="Salary"
                label="Salary"
                onChangeText={val => this.setState({salary: val})}
                // value={rupiah.convert(this.state.salary)}
                value={`${this.state.salary}`}
              />
              {/* <Input
                keyboardType="numeric"
                style={styles.input}
                size="small"
                placeholder="Quantity"
                label="Quantity"
                onChangeText={val => this.setState({quantity: val})}
                value={`${this.state.quantity}`}
              /> */}
              <Input
                style={styles.input}
                size="small"
                placeholder="Description"
                label="Description"
                onChangeText={val => this.setState({description: val})}
                value={this.state.description}
                multiline
                numberOfLines={3}
              />
              {this.state.isLoading ? (
                <WaveIndicator color="#3C82FF" />
              ) : (
                <Button
                  status="primary"
                  style={{marginTop: 12}}
                  onPress={() => this.updateJob()}>
                  Save changes
                </Button>
              )}
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
  },
  imageProduct: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.36,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  cardTitle: {
    fontFamily: 'Poppins-Regular',
    marginBottom: 18,
  },
  input: {
    width: '100%',
  },
});

export default EditJobScreen;

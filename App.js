import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

export default class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      loading: false, 
      pokemon: [],
      url: 'https://pokeapi.co/api/v2/pokemon/'
    }
  }

  componentDidMount(){
    this.getPokemon();
  }

  getPokemon = () => {

    this.setState({ loading:true })
    
    fetch(this.state.url)
    .then(res => res.json())
    .then(res => {

       this.setState({
         pokemon: res.results, 
         url: res.next,
         loading: false
       })
    });

  };

  render() {
    if(this.state.loading){
    return (
      <View style={style.container}>
        <Text> Descargando Pokemon!</Text>
      </View>
    );
  }

  return (
    <View style = {{flex: 1, paddingTop:50, paddingLeft:5}}>
      
      <FlatList
       data={this.state.pokemon}
       renderItem={
         ({item}) => <Text>{ item.name }</Text>
       }
       keyExtractor = {(item, index) => index.toString()}
      />

    </View>
  );
 
 } 
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
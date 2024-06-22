// NATIVE 
import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';


// INSTALLED 
import  PropTypes  from 'prop-types';
import RBSheet from "react-native-raw-bottom-sheet";
import { Button, Checkbox, Chip, Searchbar, Text } from 'react-native-paper';


// CUSTOM 


interface Props  {
    placeHolderSearchText: string,
    emptyComponentTitle: string,
    showSearchBox: boolean,
    showTitleHeader: boolean,
    titleHeader: string,
    autoOpen: boolean,
    isSelectSingle: boolean,
    heightComponent: number,
    closedWhenPressMask: boolean,
    data: any
}


interface IState {
    filterItems: Array<Idata>
    data_list: Array<Idata>
    keyword: string,
    selectedItem: Array<Idata>
}

interface Idata {
    id: string,
    checked: boolean, 
    name: string
}

export const MultipleSelectPaperRn = ({  autoOpen = false,
                                         isSelectSingle = false,
                                         showSearchBox = true,
                                         showTitleHeader = true,
                                         titleHeader = 'Chose a option',
                                         emptyComponentTitle = 'No data found :(',
                                         placeHolderSearchText = 'Search', 
                                         heightComponent = 550,
                                         closedWhenPressMask = false,
                                         data = [] }:Props)  => {


    const [searchQuery, setSearchQuery] = useState<string>('');

    const [state, setState] = useState<IState>({
            filterItems: data,
            data_list: data,
            keyword: '',
            selectedItem: []
    });


    const refRBSheet = useRef<any>(false);

    
    useEffect(() => {
        autoOpen ? refRBSheet.current.open() : refRBSheet.current.close();
    }, [autoOpen]);


    useEffect(() => {

      const dataSelected = data_list.filter(function(el) { return el.checked == true; }); 

      setState({
        ...state,
        selectedItem: dataSelected
      });

    }, []);
    

    
    const { data_list, filterItems, selectedItem } = state;

    const openRbSheet = () => {
        refRBSheet.current.open()
    }
    
    

    const renderEmpty = () => {

        return (
            <Text variant="titleMedium" style={styles.emptyTitle }>
                {emptyComponentTitle}
            </Text>
        );
    }


    const onItemSelected = (item:any, isSelectSingle: boolean) => {

        let selectedItem:any = [];

        item.checked = !item.checked;
        for (let index in data_list) {
            if (data_list[index].id === item.id) {
                data_list[index] = item;
            } else if (isSelectSingle) {
                data_list[index].checked = false;
            }
        }
        data_list.map(item => {
            if (item.checked) selectedItem.push(item);
        })

        setState({
            ...state,
            data_list: data,
            selectedItem: selectedItem
        });
    }

    const keyExtractor = (item:any, idx:any) => idx.toString();

    const renderItem = ({ item, idx }:any) => {

        
        return (
            

            <TouchableOpacity
                key={idx}
                onPress={() => onItemSelected(item, isSelectSingle)}
                activeOpacity={0.5}>
                <Checkbox.Item label={item.name} status={ item.checked ? 'checked' : 'unchecked' } />
            
            </TouchableOpacity>

        );
    }


    const closeRbsheet = () => {
        refRBSheet.current.close();
    }
  

    const onChangeSearch = (query:string) => {
       
    
      setSearchQuery(query);

      if (query) {

        const filtered = data_list.filter( (item:any) => item.name.toLowerCase().includes( query.toLowerCase() ));

        filterItems
 
        setState({
          ...state,
          filterItems: filtered
        });
        
      }else{

        setState({
          ...state,
          filterItems: data_list
        });
      }
    
    };

    const unSearch = () => {
        setState({
          ...state,
          filterItems: data_list
        });
        console.log('button clear presed!')
    }


   const deleteItem = (item:Idata):void => {
     
       const statusItems = selectedItem.filter(function(el) { return el.id != item.id; }); 

      //  ESTA FUNCION SE REPITE ARRIBA, MUEVE EL CHECK EN LA REFERENCIA DE MEMORIA, 
      //  SE PUEDE PONER EN UNA FUNCION Y MANDAR EL ITEM, Y SE REUTILIZA CON LA DE ARRIBA,
      //  PERO EN ESTE CASO SON DOS FUNCIONES QUE USTEDES PUEDEN MAJAR CON SU PROPIA 
      //  LOGICA LA IDEA ES QUE REVISEN Y LA ACOPLEN A COMO LA NECESITEN DEJO EL CODIGO 
      //  LIBRE PARA QUE LO USEN SEGUN LO REQUIERAN 
       item.checked = !item.checked;
        for (let index in data_list) {
            if (data_list[index].id === item.id) {
                data_list[index] = item;
            } else if (isSelectSingle) {
                data_list[index].checked = false;
            }
        }

      setState({
        ...state,
        selectedItem: statusItems
      });
   }
    

    return (
      <>
          
          <View style={{ top: 50, marginHorizontal: 20}}>
            <Button onPress={openRbSheet} style={{backgroundColor: '#DADCDF'}}>
                Open List
            </Button>
            <View style={{ top: 50}}>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                selectedItem.map((item:Idata) => {
                  return (
                    <Chip key={item.id} onClose={ () => deleteItem(item) }  mode={'outlined'} elevated={true} icon="bell-check" onPress={() => console.log('Presed') }>{item.name}</Chip>
                  )
                })
              }
              
              
            </View>
            </View>
          </View>
          

            <RBSheet
              ref={refRBSheet}
              closeOnPressMask={closedWhenPressMask}
              customStyles={{
                  container: {
                      paddingHorizontal: 13
                  }
                }}
              height={heightComponent}>
                  <View>
                    <TouchableOpacity style={ styles.closeRbsClose }  onPress={closeRbsheet}>
                      <Text style={ styles.closeRbs }>X</Text>
                    </TouchableOpacity>
                  </View>
                
                  {
                      showSearchBox  &&   <Searchbar
                                              placeholder={placeHolderSearchText}
                                              onChangeText={onChangeSearch}
                                              onClearIconPress={unSearch}
                                              value={searchQuery}
                                              style={{ marginBottom: 15 }}
                                          />
                  }
                  {
                    showTitleHeader && <Text style={ styles.closeRbsTitle }> {titleHeader} </Text>
                  }
                  
                  <FlatList 
                      data={filterItems}
                      removeClippedSubviews={true}
                      updateCellsBatchingPeriod={100}
                      renderItem={renderItem}
                      ListEmptyComponent={renderEmpty}
                      keyExtractor={keyExtractor}
                      initialNumToRender={10}
                      maxToRenderPerBatch={10}
                      windowSize={10}
                      
                  />
          </RBSheet>
          
      </>
    )
}

MultipleSelectPaperRn.propTypes = {
    placeHolderSearchText: PropTypes.string,
    emptyComponentTitle: PropTypes.string,
    showSearchBox: PropTypes.bool,
    showTitleHeader: PropTypes.bool,
    titleHeader: PropTypes.string,
    autoOpen: PropTypes.bool,
    closedWhenPressMask: PropTypes.bool,
    isSelectSingle: PropTypes.bool,
}


// SE DEJA COMENTADO PORQUE SALE UN ERROR QUE DICE QUE EN FUTURAS VERSIONES VA A SER DEPRECADO 
// Y QUE LE DE LOS VALOR POR DEFECTO A LOS PARAMETROS COMO SE PONEN ARRIBA

// MultipleSelectPaperRn.defaultProps = {
//     placeHolderSearchText: "Search",
//     emptyComponentTitle: 'No data found',
//     showSearchBox: true,
//     autoOpen: false,
//     isSelectSingle: false
// }




const styles = StyleSheet.create({
    scrollView: {
      paddingHorizontal: 40,
      bottom: 40
    },
    containerRbs: {
      marginHorizontal: 20,
    },
    closeRbsTitle:{
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      textAlign: 'center',
      width: '97%',
      flexWrap: 'wrap'
    },
    closeRbsClose: {
      backgroundColor: '#F0F3F4',
      padding: 10,
      right: 2,
      alignSelf: 'flex-end',
      borderRadius: 50,
      margin: 10,
      width: 45,
    },
    closeRbs: {
      fontSize: 20,
      alignSelf: 'center',
      
    },
    textUncheckAllRbs: {
      marginHorizontal: 20,
      width: '50%',
    },
    containerButtons: {
      marginTop: 15
    },
    containerScrollView: {
      paddingHorizontal: 40,
      width: '100%',
    },
    containerSnack: {
      width: '95%',
      alignSelf: 'center'
    },
    titleCompany: {
      textTransform: 'capitalize',
      fontWeight: '700',
      padding: 10
    },
    shortDescriptionCompany: {
      textTransform: 'capitalize',
      padding: 5
    },
    card: {
      padding: 7,
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    textList: {
      textAlign: 'center',
      fontWeight: 'bold',
      alignSelf: 'center',
      marginHorizontal: 10
    },
    titleModal: {
      textAlign: 'center'
    },
    textBodyModal: {
      textAlign: 'center',
      marginTop: 10
    },
    tagWrapper: {
      flexDirection: 'row', 
      flexWrap: 'wrap',
    },
    tagItem: {
       margin: 4
    },
    emptyTitle: {
       display: 'flex',
       alignSelf: 'center',
       marginTop: '7%',
    }
  });
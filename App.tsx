// NATIVE 
import React from 'react';

// INSTALLED 
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// CUSTOM 
import { MultipleSelectPaperRn } from './src/MultipleSelectPaperRn';





function App(): React.JSX.Element {
  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const data:object[] = [
    {
      "checked": true,
      "code_postal": "760013",
      "id": "22943e1e-f6be-11ed-8207-9828a60f7a9e",
      "name": "20 de Julio",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760042",
      "id": "229444b3-f6be-11ed-8207-9828a60f7a9e",
      "name": "3 de Julio",
      "show": true
    },
    {
      "checked": true,
      "code_postal": "760044",
      "id": "22944630-f6be-11ed-8207-9828a60f7a9e",
      "name": "Acueducto San Antonio",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760013",
      "id": "2294470c-f6be-11ed-8207-9828a60f7a9e",
      "name": "Aguablanca",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760045",
      "id": "229447d9-f6be-11ed-8207-9828a60f7a9e",
      "name": "Aguacatal",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760042",
      "id": "229448a6-f6be-11ed-8207-9828a60f7a9e",
      "name": "Alameda",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760035",
      "id": "22944965-f6be-11ed-8207-9828a60f7a9e",
      "name": "Alferes Real",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760012",
      "id": "22944a93-f6be-11ed-8207-9828a60f7a9e",
      "name": "Alfonso López I",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760012",
      "id": "22944cb6-f6be-11ed-8207-9828a60f7a9e",
      "name": "Alfonso López II",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760012",
      "id": "22944d88-f6be-11ed-8207-9828a60f7a9e",
      "name": "Alfonso López III",
      "show": true
    },
    {
      "checked": false,
      "code_postal": "760014",
      "id": "22944e51-f6be-11ed-8207-9828a60f7a9e",
      "name": "Alfonzo Barberena A",
      "show": true
    }
  ];


  return (
    <SafeAreaView style={backgroundStyle}>
         <MultipleSelectPaperRn 
                autoOpen={true} 
                isSelectSingle={false} 
                showSearchBox={true} 
                data={data}
                showTitleHeader={true}
                titleHeader={'Select a option'}
                emptyComponentTitle={'No se encontraron datos'}
                placeHolderSearchText={'Buscar'}
                closedWhenPressMask={false} // clesed when press out of component
                heightComponent={550} // reload app when change value
                />
    </SafeAreaView>
  );
}



export default App;

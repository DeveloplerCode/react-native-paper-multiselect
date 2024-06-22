

# multiselect component for react native paper

![RnComponent](RnComponent.gif)

>**Note**: this is a component for react native paper, work with files .tsx is 100% modifiable, why this way and not a package? I think they have more control, in this way and for this case.


## Install dependencies
1. [react-native-raw-bottom-sheet](https://github.com/nysamnang/react-native-raw-bottom-sheet)

2. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)  👉 read guia install


```bash
# using npm
npm i react-native-raw-bottom-sheet --save;
```
or
```bash
# using yarn
yarn add react-native-raw-bottom-sheet;
```



## structure
in this example the component called **MultipleSelectPaperRn** is called in App.tsx from ``src/MultipleSelectPaperRn.tsx`` 

you only need copy de functional component from ``src/MultipleSelectPaperRn.tsx`` and paste wherever you want, and call like the example in ``App.tsx``

## recommendations
>**!!! Important**: I have not tested yet but i think, if you are using redux, you pass the the reference so if you use this component two time is posible change check one from other for this case a posible solution is use. [DeepCopy](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)

```tsx
const [data, setData] = useState([]);

const dataExample:object[] = [
   {
      "checked": true,
      "code_postal": "760013",
   },
   {
      "checked": false,
      "code_postal": "760017",
   }
];
const deepCopiedData = JSON.parse(dataExample);

setData(deepCopiedData);

<MultipleSelectPaperRn 
            autoOpen={true} 
            isSelectSingle={false} 
            showSearchBox={true} 
            data={data}
            showTitleHeader={true}
            titleHeader={'Select a option'}
            emptyComponentTitle={'Nodata found.'}
            placeHolderSearchText={'Search'}
            closedWhenPressMask={false} 
            heightComponent={550} 
         />
```

![RnComponent](RnComponent.gif)

## norma use
```tsx
const dataExample:object[] = [
   {
      "checked": true,
      "code_postal": "760013",
   },
   {
      "checked": false,
      "code_postal": "760017",
   }
];

<MultipleSelectPaperRn 
            autoOpen={true} 
            isSelectSingle={false} 
            showSearchBox={true} 
            data={data}
            showTitleHeader={true}
            titleHeader={'Select a option'}
            emptyComponentTitle={'Nodata found.'}
            placeHolderSearchText={'Search'}
            closedWhenPressMask={false} 
            heightComponent={550} 
         />
```

![RnComponent](RnComponent.gif)

## Props
>**Note** falta

| Props                | Type   | Description                                          | Default
|--------              | ------ | ---------------------------------------------------- | -------
|autoOpen              | boolean | defines if the component is open by default or not  | false |
|isSelectSingle        | boolean | defines if can chose one or multipe checks          | false |
|showSearchBox         | boolean | defines if show or not the search field in header   | true  |
|showTitleHeader       | boolean | defines if show or not the title in header          | true  |
|titleHeader           | string  | defines the text to is showing                      | Chose a option   |
|emptyComponentTitle   | string  | defines the text to show when data is empty         | No data found :( |
|placeHolderSearchText | string  | defines the text to as placeholder input search     | Search |
|heightComponent       | number  | defines the height of component                     | 550 |
|closedWhenPressMask   | boolean | defines if the componen close when touch the screen | false |


## License
**[MIT License](LICENSE)**

## Congratulations! :tada:

You've successfully run and modified your Component. :partying_face:

 


Made  with 🧠 and ❤️ by Andres meza amezadeveloper@gmail.com or 
developlercode@gmail.com






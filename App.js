/* John Hu; this is my comments section:

  This is my calculator app with a cool blue green theme. It allows users to do basic operations and it includes square root and percentage. 

  Calculator capabilities:
  :All four operations work: add, subtract, multiply, divide as well as clear button
  :Decimal works. By using hasDecimal boolean variable, app only allows one decimal per a number
  :Includes two additional operations ====> Unlike before, I added lastOperationIndex and buttonCount variables which allow me to use negative sign, square root, and percetage on the correct number. For example, take 35*45. Before, these buttons would only do the calculation on 35, the first number, like -35*45 even though the current number is 45. Now, it will appear like 35*-45. So, square roots, percetage, and negative sign all work
  :Able to do several operations before hitting "="
  :Explored another component not discussed in class ==> touchableOpacity and OnPress
  :App cannot crash; when hitting random buttons, the answer/display text will output "ERROR" but cannot crash. This error message is easily removed by using the clear button

  Calculator limitations:
  :Biggest limitation ==> cannot do PEMDAS since my getSolution method evaluates the given expression from left to right, but Mr.Horner said that PEMDAS is not necessary. 
  :User must input a number then add negative; won't work if you first click negative sign without a number because it essentially multiplies the number by -1
  :Small limitation ==> When you try to enter random buttons that dont make sense in the displayEquation text (not the result text), the app will output "NaN" in that text. I am unable to change it to "Error" unlike in the result text

*/
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AssetExample from './components/AssetExample';
import {Picker} from '@react-native-picker/picker';

import { Card } from 'react-native-paper';

var hasDecimal = false;
let lastOperationIndex = 0, buttonCount = 0; //use these variables to find the last index of a operation. This will allow negative, percent, root to work only on the current number. Use of for loops takes too much time

export default function App() {

  const [displayEquation, changeEquationDisplay] = useState(" "); //equation line
  const [result, changeResult] = useState("0"); //answer line

  const decimalChange = () => {hasDecimal = !hasDecimal;}

  const buttonClick = (input) => {
    
    if (input === "C") {
      changeEquationDisplay(" ");
      changeResult("0");
      hasDecimal = false;
      buttonCount = 0;
      lastOperationIndex = 0;
    } else if (input === "root") {
      if (result !== " " && result !== "0" && result !== "") {
        changeResult(Math.sqrt(parseFloat(result.toString().substring(lastOperationIndex+1))));
      } else {
        if (displayEquation.toString().length < 3) {
          changeEquationDisplay(Math.sqrt(parseFloat(displayEquation)));
        } else {
          changeEquationDisplay(displayEquation.toString().substring(0,lastOperationIndex+2) + Math.sqrt(parseFloat(displayEquation.toString().substring(lastOperationIndex+2))));
        }

      }
    } else if (input === "neg") {
      if (displayEquation.toString().length < 3) {
        changeEquationDisplay(parseFloat(displayEquation)*-1);
      } else {
        console.log(displayEquation.toString().length);
        changeEquationDisplay(displayEquation.toString().substring(0,lastOperationIndex+2) + parseFloat(displayEquation.toString().substring(lastOperationIndex+2))*-1);
      }
    } else if (input === ".") {
      if (!hasDecimal) {
        changeEquationDisplay(displayEquation + input);
        decimalChange();
      } 
    } else if (input === "%") {
      if (result !== " " && result !== "0" && result !== "") {
        changeResult(result.toString().substring(0,lastOperationIndex+2) + parseFloat(result.toString().substring(lastOperationIndex+2))*0.01);
      } else {
        if (displayEquation.toString().length < 3) {
          changeEquationDisplay(parseFloat(displayEquation)*0.01);
        } else {
          changeEquationDisplay(displayEquation.toString().substring(0,lastOperationIndex+2) + parseFloat(displayEquation.toString().substring(lastOperationIndex+2))*0.01);
        }
        
      }
      
    } else if (input === "+" || input === "×" || input === "−" || input === "÷") {
      changeEquationDisplay(displayEquation + input);
      operation = input;
      lastOperationIndex = buttonCount;
      buttonCount++;
      decimalChange();
    } else if (input === "=") {
      getSolution();
    } else {
      changeEquationDisplay(displayEquation + input);
      buttonCount++;
    }
  }

  const getSolution = () => {
    let string = displayEquation.toString();

    const operations = [], numbers = [], finalNums = [];
    let opIndex = 0, addIndex = 0;
    let currentNumberDealer = "";
    
    for (let i = 0; i < string.length; i++) {
      if ((string.substring(i,i+1) !== "+" && string.substring(i,i+1) !== "×" && string.substring(i,i+1) !==  "−" && string.substring(i,i+1) !== "÷")) {
        currentNumberDealer += string.substring(i,i+1);
      } else {    //if index lands on operation
        numbers[addIndex] = currentNumberDealer;
        currentNumberDealer = "";
        addIndex++;
        operations[opIndex] = string.substring(i,i+1);
        opIndex++;
      }
    }
    numbers[addIndex] = currentNumberDealer;

    //convert string numbers to numbers in array
    for (let j = 0; j < numbers.length; j++) {
      finalNums[j] = parseFloat(numbers[j]);
    }

    //make calculations
    let result = 0;
    result += finalNums[0];

      for (let i = 1; i < finalNums.length; i++) {
        if (operations[i-1] === "+") {
          result += finalNums[i];
        } else if (operations[i-1] === "−") {
          result -= finalNums[i];
        } else if (operations[i-1] === "×") {
          result *= finalNums[i];
        } else if (operations[i-1] === "÷") {
          result /= finalNums[i];
        }
      }
      if (isNaN(result)) {
        changeResult("Error");
      } else {
        changeResult(result);
      }
      
  
  }

  return (
    <View style={styles.buffer, {backgroundColor: 'black'}}>
    <View style={styles.buffer}>
    
    </View>
    <Text style={styles.equationText}>{displayEquation}</Text>
    <Text style = {styles.input}>{result}</Text>
        
    <View style={styles.container}>
      <View style = {styles.left, {backgroundColor: 'black'}}> 
        <TouchableOpacity onPress={()=>{buttonClick("C")}} style={styles.buttonStyleOther}>
          <Text style={styles.buttonTextOther}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{buttonClick(7)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{buttonClick(4)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{buttonClick(1)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{buttonClick(".")}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>.</Text>
        </TouchableOpacity>
      </View>

    <View style = {styles.left, {backgroundColor: 'black'}}>
      <TouchableOpacity onPress={()=>{buttonClick("root")}} style={styles.buttonStyleOther}>
          <Text style={styles.buttonTextOther}>√x</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{buttonClick(8)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>8</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{buttonClick(5)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>5</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{buttonClick(2)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{buttonClick(0)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>0</Text>
        </TouchableOpacity>
    </View>
    <View style = {styles.left, {backgroundColor: 'black'}}> 
    <TouchableOpacity onPress={()=>{buttonClick("%")}} style={styles.buttonStyleOther}>
          <Text style={styles.buttonTextOther}>%</Text>
      </TouchableOpacity>    
      <TouchableOpacity onPress={()=>{buttonClick(9)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>9</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{buttonClick(6)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>6</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{buttonClick(3)}} style={styles.buttonStyleNumbers}>
          <Text style={styles.buttonTextNumbers}>3</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{buttonClick("neg")}} style={styles.buttonStyleOther}>
          <Text style={styles.buttonTextOther}>±</Text>
        </TouchableOpacity>
    </View>

    <View style = {styles.left, {backgroundColor: 'black'}}>
    <TouchableOpacity onPress={()=>{buttonClick("÷")}} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
    <TouchableOpacity onPress={()=>{buttonClick("×")}} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{buttonClick("−")}} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>
    <TouchableOpacity onPress={()=>{buttonClick("+")}} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    <TouchableOpacity onPress={()=>{buttonClick("=")}} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
    </View>
    
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000000',
  },
  buffer: {
    height: '0%'
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
  },
  buttonTextNumbers: {
    fontSize: 25,
    color: '#adadc9',
  },
  buttonTextOther: {
    fontSize: 25,
    color: '#c5c6d0',
  },
  buttonText: {
    fontSize: 25,
    color: '#59778e',
  },
  buttonStyleNumbers: {
    height: 75, 
    width: 75,
    marginTop: 15,
    backgroundColor: '#59515e',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  equationText: {
    fontFamily: "Cochin",
    fontStyle: 'italic',
    height: 50, 
    width: '100%',
    color: '#8abaae',
    fontSize: 35,
    marginTop: 20,
    marginHorizontal: 30,
    marginVertical: 10,
    textAlign: 'left',
  },
  buttonStyleOther: {
    height: 75, 
    width: 75,
    marginTop: 15,
    backgroundColor: '#9897a9',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  buttonStyle: {
    height: 75, 
    width: 75,
    marginTop: 15,
    backgroundColor: '#8DA399',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  input: {
    color: '#36454F',
    fontFamily: "Cochin",
    height: "15%",
    width: "100%",
    textAlign: 'right',
    borderColor: "skyblue",
    fontSize: 95,
    paddingRight: 20,
  },
});
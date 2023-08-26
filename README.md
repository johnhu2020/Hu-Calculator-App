# Calculator App

**Created using React Native expo**

This is my calculator app with a cool blue green theme. It allows users to do basic operations and it includes square root and percentage. 

  Calculator capabilities:
  
  :All four operations work: add, subtract, multiply, divide as well as clear button
  
  :Decimal works. By using hasDecimal boolean variable, app only allows one decimal per a number
  
  :Includes two additional operations ====> Unlike before, I added lastOperationIndex and buttonCount variables which allow me to use negative sign, square root, and percetage on the correct number. For example, take 35*45. Before, these buttons would only do the calculation on 35, the first number, like -35*45 even though the current number is 45. Now, it will appear like 35*-45. So, square roots, percetage, and negative sign all work
  
  :Able to do several operations before hitting "="
  
  :Explored another component not discussed in class ==> touchableOpacity and OnPress
  
  :App cannot crash; when hitting random buttons, the answer/display text will output "ERROR" but cannot crash. This error message is easily removed by using the clear button

  Calculator limitations:
  
  :User must input a number then add negative; won't work if you first click negative sign without a number because it essentially multiplies the number by -1
  
  :Small limitation ==> When you try to enter random buttons that dont make sense in the displayEquation text (not the result text), the app will output "NaN" in that text. I am unable to change it to "Error" unlike in the result text


Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by scanning the **QR code** or use the iOS or Android emulators. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Download** your project and use it with [expo-cli](https://docs.expo.io/get-started/installation).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the `<>` button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.io/c/snack).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack).

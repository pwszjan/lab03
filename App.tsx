import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';

import Button from './components/Button';
import {btn} from './types/btn';
import buttons from './data/buttons';

var mexp = require('math-expression-evaluator');

const App = () => {
  const [enteredValue, setEnteredValue] = useState(0);
  // const [orientation, setOrientation] = useState('portrait');

  const [isActive, setIsActive] = useState('');
  const [expression, setExpression] = useState<{
    operator: string;
    value: number;
  }>({operator: '', value: 0});

  // const isPortrait = () => {
  //   const dim = Dimensions.get('screen');
  //   return dim.height >= dim.width;
  // };

  // Dimensions.addEventListener('change', () => {
  //   setOrientation(isPortrait() ? 'portrait' : 'landscape');
  // });

  const handleClick = (props: btn) => {
    if (Number(props.children) || props.children === '0') {
      let tmp = enteredValue.toString();
      tmp += props.children;
      setEnteredValue(Number(tmp));
    }

    if (props.type === 'arithmetic') {
      setEnteredValue(0);
      setIsActive(props.children);

      if (props.children !== '=') {
        setExpression({operator: props.children, value: enteredValue});
        return;
      } else {
        const str = expression.value + expression.operator + enteredValue;
        setEnteredValue(mexp.eval(str));
      }
    }

    switch (props.children) {
      case 'AC':
        setEnteredValue(0);
        setIsActive('');
        break;
      case '%':
        setEnteredValue(enteredValue / 100);
        setIsActive('');
        break;
      case '+/-':
        setEnteredValue(enteredValue * -1);
        setIsActive('');
        break;
      case 'x!':
        setEnteredValue(mexp.eval(enteredValue + '!'));
        setIsActive('');
        break;
      case 'ex':
        setEnteredValue(mexp.eval('e^' + enteredValue));
        setIsActive('');
        break;
      case '10^x':
        setEnteredValue(mexp.eval('10^' + enteredValue));
        setIsActive('');
        break;
      case 'ln':
        setEnteredValue(mexp.eval('ln(' + enteredValue + ')'));
        setIsActive('');
        break;
      case 'log':
        setEnteredValue(mexp.eval('log(' + enteredValue + ')'));
        setIsActive('');
        break;
      case 'e':
        const exp = String(mexp.eval('e')).substr(0, 8);
        setEnteredValue(Number(exp));
        setIsActive('');
        break;
      case 'x2':
        setEnteredValue(mexp.eval(enteredValue + '^2'));
        setIsActive('');
        break;
      case 'x3':
        setEnteredValue(mexp.eval(enteredValue + '^3'));
        setIsActive('');
        break;
      case 'pi':
        const exp2 = String(mexp.eval('pi')).substr(0, 8);
        setEnteredValue(Number(exp2));
        setIsActive('');
        break;
    }
  };

  DeviceEventEmitter.addListener('emmitClick', handleClick);

  const appPortrait = (
    <View style={styles.app}>
      <View style={styles.screen}>
        <Text style={styles.output}>{enteredValue}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map(button => {
          return (
            <Button
              type={button.type}
              key={button.id}
              id={button.id}
              isActive={isActive === button.children}>
              {button.children}
            </Button>
          );
        })}
      </View>
    </View>
  );

  //   const appLandscape = (
  //     <View style={(styles.app, styles.landscape)}>
  //       <View style={(styles.screen, styles.screenLandscape)}>
  //         <Text style={[styles.output, styles.outputLandscape]}>
  //           {enteredValue}
  //         </Text>
  //       </View>
  //       <View style={[styles.buttons, styles.buttonsLandscape]}>
  //         <Button type="functional">sq</Button>
  //         <Button type="functional">x!</Button>
  //         <Button type="functional">AC</Button>
  //         <Button type="functional">+/-</Button>
  //         <Button type="functional">%</Button>
  //         <Button type="arithmetic" isActive={isActive === '/'}>
  //           /
  //         </Button>
  //         <Button type="functional">ex</Button>
  //         <Button type="functional">10^x</Button>
  //         <Button type="basic">7</Button>
  //         <Button type="basic">8</Button>
  //         <Button type="basic">9</Button>
  //         <Button type="arithmetic" isActive={isActive === '*'}>
  //           *
  //         </Button>
  //         <Button type="functional">ln</Button>
  //         <Button type="functional">log</Button>

  //         <Button type="basic">4</Button>
  //         <Button type="basic">5</Button>
  //         <Button type="basic">6</Button>
  //         <Button type="arithmetic" isActive={isActive === '-'}>
  //           -
  //         </Button>
  //         <Button type="functional">e</Button>
  //         <Button type="functional">x2</Button>
  //         <Button type="basic">1</Button>
  //         <Button type="basic">2</Button>
  //         <Button type="basic">3</Button>
  //         <Button type="arithmetic" isActive={isActive === '+'}>
  //           +
  //         </Button>
  //         <Button type="functional">pi</Button>
  //         <Button type="functional">x3</Button>
  //         <Button type="basic">0</Button>
  //         <Button type="basic">.</Button>
  //         <Button type="arithmetic">=</Button>
  //       </View>
  //     </View>
  //   );

  return <View>{appPortrait}</View>;
};

const styles = StyleSheet.create({
  app: {
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
  },
  landscape: {
    height: Dimensions.get('window').height,
    paddingLeft: 450,
    paddingRight: 40,
  },
  screen: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  screenLandscape: {
    // flex: 1,
  },
  output: {
    color: 'white',
    fontSize: 100,
  },
  outputLandscape: {
    fontSize: 40,
    textAlign: 'right',
  },
  buttons: {
    flex: 2,
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  buttonsLandscape: {
    flex: 5,
  },
});

export default App;

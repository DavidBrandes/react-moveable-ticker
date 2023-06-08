# React Moveable Ticker

A lightweight and efficient Ticker-Component for React which procedurally renders any component as the Ticker elements on the screen. Since the Tickers speed is adjustable at any time, the Tickers movement direction and speed can be freely altered.

Check out this [link](https://davidbrandes.github.io/react-moveable-ticker/) for a demonstration of it! Safari seems to be overburdened by the demo, however other browsers such as Chrome and Firefox are working fine.

This Ticker was heavily inspired by the similar [React-Ticker](https://github.com/AndreasFaust/react-ticker).

## Features

* The Tickers speed is completely reactive, therefore allowing to modify it, change the Tickers direction and stopping it at any time
* As a consequence the Ticker can easily be made scrollable. Check out the example code for a demonstration of it
* The Ticker allows to procedurally render any other React component as its elements with arbitrary widths
* Three different modes of repetition
* Highly performant rendering of the elements
* Allows to infinitely loop its elements

## Getting Started

1. Install the package through npm or yarn

​		`npm install react-moveable-ticker` or `yarn add react-moveable-ticker`

2. Use it as

   ```react
   import react from 'react'
   import Ticker from 'react-moveable-ticker'
   
   function MyComponent() {
     return <Ticker 
              speed={100} 
              height={"4.8rem"} 
              mode={"loop"}>
       {(index) => <div>Some Content </div>}
     </Ticker>;
   }
   ```

   ## Props

   | Name        | Type                | Default       | Description                                                  |
   | ----------- | ------------------- | ------------- | ------------------------------------------------------------ |
   | speed       | number              |               | The speed of the Ticker specified as px per second. A positive speed will move the Tickers elements from left to right, a negative one from right to left and a speed of zero wont move the elements at all. Changing this props value will rerender the ticker component, allowing to alter its speed on the fly. |
   | height      | string              |               | The height of the ticker component, this can be any css property such as "32px" or "4.8rem" |
   | mode        | string              |               | Needs to be one of "chain", "loop", or "single". The first option will position the Ticker elements right after another, the second one will spawn the next element the moment the current one starts to dissapear and the last one once it is disappeared. |
   | loopGap     | number              | 0             | Since in the "loop" mode elements wider than the screen will start disappearing again even before they have become fully visible yet, the following elemnts will be positioned right after it just as in the "chain" mode. In that case the loopGap prop will specify the offset in px  with wich the next element will be placed after the previous one. |
   | position    | number or undefined | undefined     | The offset position of the first Ticker element given in px from the left side of the screen in the case of a negative speed, and from the right side for a positive one. If undefined the initial position will be automatically deduced. |
   | onNext      | function            | (index) => {} | A function that will be called right after the next Ticker element is getting spawn. |
   | onDissapear | function            | (index) => {} | A function that will be called right after a Ticker disappeared from the screen. |

## Info

In order to avoid line breaks use the CSS property `white-space: nowrap;`.

## Dependencies

This component has no dependencies except for React 18+.

## Browser Support

This component has been tested on Chrome and Firefox. On Safari there appear to be some issues with rendering heavy Ticker elements.

## Contribution

In case you would like to contribute to this project feel free to do so. For Bugs please create an Issue on the projects Github [page](https://github.com/DavidBrandes/react-moveable-ticker).

## License

MIT &copy; [https://github.com/DavidBrandes](https://github.com/DavidBrandes)
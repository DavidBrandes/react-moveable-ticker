import classes from "./styles/Styles.module.css";
import Context from "./Context";
import TickerElement from "./TickerElement";
import React, { useRef, useEffect, useState, useMemo } from "react";

function Ticker(props) {
  //position, speed, height, mode, onNext, onDissapear

  const ref = useRef();
  // eslint-disable-next-line
  const [counter, setCounter] = useState(-1);
  const elementIndices = useRef([]);
  const elements = useRef([]);

  const spawnElement = useMemo(() => {
    if (props.speed <= 0) {
      return (position) => {
        setCounter((counter) => {
          counter++;

          const element = (
            <TickerElement key={counter} index={counter} position={position}>
              {props.children(counter)}
            </TickerElement>
          );

          elementIndices.current.push(counter);
          elements.current.push(element);

          return counter;
        });
        if (props.onNext)
          props.onNext(
            elementIndices.current[elementIndices.current.length - 1]
          );
      };
    } else {
      return (position) => {
        setCounter((counter) => {
          counter++;

          const element = (
            <TickerElement key={counter} index={counter} position={position}>
              {props.children(counter)}
            </TickerElement>
          );

          elementIndices.current.unshift(counter);
          elements.current.unshift(element);

          return counter;
        });
        if (props.onNext) props.onNext(elementIndices.current[0]);
      };
    }
    // eslint-disable-next-line
  }, [props.speed]);

  const callback = useMemo(() => {
    const buffer = Math.abs(props.speed) / 10;
    const loopGap = props.loopGap === undefined ? 0 : props.loopGap;

    if (props.mode === "loop") {
      if (props.speed <= 0) {
        return async (index, position) => {
          if (
            index ===
              elementIndices.current[elementIndices.current.length - 1] &&
            position.left < buffer
          ) {
            const loopLeft = ref.current.offsetWidth + position.left;
            const chainLeft =
              ref.current.offsetWidth - position.right + loopGap;

            if (loopLeft >= chainLeft) {
              spawnElement({
                left: loopLeft,
                right: position.right - ref.current.offsetWidth,
              });
            } else {
              spawnElement({
                left: chainLeft,
                right:
                  2 * position.right -
                  ref.current.offsetWidth +
                  position.left -
                  loopGap,
              });
            }
          }

          if (
            index === elementIndices.current[0] &&
            position.right > ref.current.offsetWidth + buffer
          ) {
            const removedIndex = elementIndices.current.shift();
            elements.current.shift();
            if (props.onDissapear) props.onDissapear(removedIndex);
          }
        };
      } else {
        return async (index, position) => {
          if (index === elementIndices.current[0] && position.right < buffer) {
            const loopRight = position.right + ref.current.offsetWidth;
            const chainRight =
              ref.current.offsetWidth - position.left + loopGap;

            if (loopRight >= chainRight) {
              spawnElement({
                left: position.left - ref.current.offsetWidth,
                right: loopRight,
              });
            } else {
              spawnElement({
                left:
                  2 * position.left -
                  ref.current.offsetWidth +
                  position.right -
                  loopGap,
                right: chainRight,
              });
            }
          }

          if (
            index ===
              elementIndices.current[elementIndices.current.length - 1] &&
            position.left > ref.current.offsetWidth + buffer
          ) {
            const removedIndex = elementIndices.current.pop();
            elements.current.pop();
            if (props.onDissapear) props.onDissapear(removedIndex);
          }
        };
      }
    } else if (props.mode === "chain") {
      if (props.speed <= 0) {
        return async (index, position) => {
          if (
            index ===
              elementIndices.current[elementIndices.current.length - 1] &&
            position.left < ref.current.offsetWidth + buffer
          ) {
            spawnElement({
              left: ref.current.offsetWidth - position.right,
              right:
                2 * position.right - ref.current.offsetWidth + position.left,
            });
          }

          if (
            index === elementIndices.current[0] &&
            position.right > ref.current.offsetWidth + buffer
          ) {
            const removedIndex = elementIndices.current.shift();
            elements.current.shift();
            if (props.onDissapear) props.onDissapear(removedIndex);
          }
        };
      } else {
        return async (index, position) => {
          if (
            index === elementIndices.current[0] &&
            position.right < ref.current.offsetWidth + buffer
          ) {
            spawnElement({
              left:
                2 * position.left - ref.current.offsetWidth + position.right,
              right: ref.current.offsetWidth - position.left,
            });
          }

          if (
            index ===
              elementIndices.current[elementIndices.current.length - 1] &&
            position.left > ref.current.offsetWidth + buffer
          ) {
            const removedIndex = elementIndices.current.pop();
            elements.current.pop();
            if (props.onDissapear) props.onDissapear(removedIndex);
          }
        };
      }
    } else if (props.mode === "single") {
      if (props.speed <= 0) {
        return async (index, position) => {
          if (
            index ===
              elementIndices.current[elementIndices.current.length - 1] &&
            position.left < buffer
          ) {
            spawnElement({
              left: 2 * ref.current.offsetWidth - position.right,
              right:
                2 * position.right +
                position.left -
                2 * ref.current.offsetWidth,
            });
          }

          if (
            index === elementIndices.current[0] &&
            position.right > ref.current.offsetWidth + buffer
          ) {
            const removedIndex = elementIndices.current.shift();
            elements.current.shift();
            if (props.onDissapear) props.onDissapear(removedIndex);
          }
        };
      } else {
        return async (index, position) => {
          if (index === elementIndices.current[0] && position.right < buffer) {
            spawnElement({
              left:
                2 * position.left +
                position.right -
                2 * ref.current.offsetWidth,
              right: 2 * ref.current.offsetWidth - position.left,
            });
          }

          if (
            index ===
              elementIndices.current[elementIndices.current.length - 1] &&
            position.left > ref.current.offsetWidth + buffer
          ) {
            const removedIndex = elementIndices.current.pop();
            elements.current.pop();
            if (props.onDissapear) props.onDissapear(removedIndex);
          }
        };
      }
    } else {
      return async (index, position) => {};
    }
    // eslint-disable-next-line
  }, [props.speed]);

  useEffect(() => {
    if (props.position === undefined) {
      if (props.mode === "chain") {
        if (props.speed <= 0) {
          spawnElement({ left: 0, right: ref.current.offsetWidth });
        } else {
          spawnElement({
            left: ref.current.offsetWidth,
            right: 0,
          });
        }
      } else {
        if (props.speed <= 0) {
          spawnElement({
            left: ref.current.offsetWidth,
            right: 0,
          });
        } else {
          spawnElement({
            left: 0,
            right: ref.current.offsetWidth,
          });
        }
      }
    } else {
      spawnElement({ left: props.position, right: props.position });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Context.Provider
      value={{
        speed: props.speed,
        callback,
      }}
    >
      <div
        className={classes.ticker}
        style={{
          "--height": props.height,
        }}
        ref={ref}
      >
        {elements.current}
      </div>
    </Context.Provider>
  );
}

export default Ticker;

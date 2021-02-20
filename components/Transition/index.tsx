import styled from "@emotion/styled";
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

const TIMEOUT = 150;

const getTransitionStyles = {
  entering: {
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
  },
};

const Transition = ({ children, location }) => {
  return (
    <TransitionGroup>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <TransitionStyled
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </TransitionStyled>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

const TransitionStyled = styled.main``;

export default Transition;

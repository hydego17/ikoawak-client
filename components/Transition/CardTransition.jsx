import { Transition } from "react-transition-group";

const duration = 150;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Fade = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <section
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        {children}
      </section>
    )}
  </Transition>
);

export default Fade;

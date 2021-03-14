import { Global, css } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        html,
        body {
          line-height: 1.75;
          color: var(--color);
          background: var(--background);
        }

        body {
          min-height: 80vh;
          transition: background 0.3s ease;
          min-height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        body::-webkit-scrollbar {
          height: 13px;
          width: 13px;
          border-radius: 20px;
        }

        body::-webkit-scrollbar-track {
          border-radius: 20px;
          background: padding-box rgb(204, 204, 204);
          border-width: 2px;
          border-style: solid;
          border-color: rgb(239, 241, 244);
          border-image: initial;
        }

        body::-webkit-scrollbar-thumb {
          background: rgb(239, 241, 244);
        }

        h1 {
          font-size: clamp(1.7rem, 2.5vw, 2rem);
          line-height: 2.25rem;
          letter-spacing: -0.01em;
          font-family: 'Noto Serif', sans-serif;
        }

        h2,
        h3,
        h4,
        h5 {
          font-family: 'Noto Serif', sans-serif;
        }

        blockquote {
          font-family: 'Noto Serif', sans-serif;
          font-style: italic;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
          color: var(--hoverClr);
        }

        ul {
          list-style: none;
        }

        img {
          object-fit: cover;
        }

        blockquote {
          margin: 1rem 0.5rem;
          padding: 1rem;
          border-left: 5px solid var(--borderColor);
          position: relative;
        }

        blockquote::before {
          font-family: Arial;
          content: '\\201C';
          color: var(--borderColor);
          font-size: 2.25em;
          position: absolute;
          left: 10px;
          top: -15px;
        }

        hr {
          padding: 0.5rem;
          border: 0;
          height: 0;
          border-top: 1px solid var(--divider);
        }

        .container {
          padding: 0 2rem;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .page-views {
          animation: fadeIn ease 0.3s;
          -webkit-animation: fadeIn ease 0.3s;
        }

        .detail-image {
          border: 1px solid var(--divider);
        }
        .preview-alert {
          background-color: var(--divider);
        }

        .detail-body .description a {
          color: var(--hoverClr);
        }

        .paginate-btn {
          color: var(--color);
          background: var(--paginateBg);
          padding: 0.3rem 0.4rem;
          border-radius: 2px;
          border: 0;
          outline: 0;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;

          &:disabled {
            color: #858585;
          }

          &:hover {
            background: var(--borderColor);
          }
        }

        .alice-carousel__stage-item * {
          line-height: 1.75 !important;
        }

        .react-toggle {
          touch-action: pan-x;

          display: inline-block;
          position: relative;
          cursor: pointer;
          background-color: transparent;
          border: 0;
          padding: 0;

          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;

          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-tap-highlight-color: transparent;
        }

        .react-toggle-screenreader-only {
          border: 0;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }

        .react-toggle--disabled {
          cursor: not-allowed;
          opacity: 0.5;
          -webkit-transition: opacity 0.25s;
          transition: opacity 0.25s;
        }

        .react-toggle-track {
          width: 50px;
          height: 24px;
          padding: 0;
          border-radius: 30px;
          background-color: #4d4d4d;
          -webkit-transition: all 0.2s ease;
          -moz-transition: all 0.2s ease;
          transition: all 0.2s ease;
        }

        .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
          background-color: #000000;
        }

        .react-toggle--checked:hover:not(.react-toggle--disabled)
          .react-toggle-track {
          background-color: #909497;
        }

        .react-toggle-track-check {
          position: absolute;
          width: 14px;
          height: 10px;
          top: 0px;
          bottom: 0px;
          margin-top: auto;
          margin-bottom: auto;
          line-height: 0;
          left: 8px;
          opacity: 0;
          -webkit-transition: opacity 0.25s ease;
          -moz-transition: opacity 0.25s ease;
          transition: opacity 0.25s ease;
        }

        .react-toggle--checked .react-toggle-track-check {
          opacity: 1;
          -webkit-transition: opacity 0.25s ease;
          -moz-transition: opacity 0.25s ease;
          transition: opacity 0.25s ease;
        }

        .react-toggle-track-x {
          position: absolute;
          width: 10px;
          height: 10px;
          top: 0px;
          bottom: 0px;
          margin-top: auto;
          margin-bottom: auto;
          line-height: 0;
          right: 10px;
          opacity: 1;
          -webkit-transition: opacity 0.25s ease;
          -moz-transition: opacity 0.25s ease;
          transition: opacity 0.25s ease;
        }

        .react-toggle--checked .react-toggle-track-x {
          opacity: 0;
        }

        .react-toggle-thumb {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
          position: absolute;
          top: 1px;
          left: 1px;
          width: 22px;
          height: 22px;
          border: 1px solid #4d4d4d;
          border-radius: 50%;
          background-color: #fafafa;

          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;

          -webkit-transition: all 0.25s ease;
          -moz-transition: all 0.25s ease;
          transition: all 0.25s ease;
        }

        .react-toggle--checked .react-toggle-thumb {
          left: 27px;
          background-color: #bbbbbb;
          border-color: #bdc3c7;
        }

        .react-toggle--focus .react-toggle-thumb {
        }

        .react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
          -webkit-box-shadow: 0px 0px 5px 5px #0099e0;
          -moz-box-shadow: 0px 0px 5px 5px #0099e0;
          box-shadow: 0px 0px 5px 5px #0099e0;
        }
      `}
    />
  );
};

export default GlobalStyles;

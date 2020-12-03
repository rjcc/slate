import * as React from "react";
import * as Prism from "prismjs";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_CODE_BLOCK = css`
  box-sizing: border-box;
  font-family: ${Constants.font.code};
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  border-color: ${Constants.system.yellow};
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 24px;

  * {
    white-space: pre-wrap;
    overflow-wrap: break-word;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 0;
      height: 0;
    }
  }

  :not(pre) > code,
  pre {
    background: none;
  }

  /* Inline code */
  :not(pre) > code {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #ff00ff;
  }

  .token.punctuation {
    color: #ffd33d;
  }

  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.number,
  .token.unit,
  .token.hexcode,
  .token.deleted {
    color: ${Constants.system.moonstone};
  }

  .token.property,
  .token.selector {
    color: #ffdf5d;
  }

  .token.function-name {
    color: #ffd33d;
  }

  .token.boolean,
  .token.selector .token.id,
  .token.class-name,
  .token.function,
  .token.constant,
  .token.symbol {
    color: ${Constants.system.gray};
  }

  .token.important,
  .token.atrule,
  .token.keyword,
  .token.selector .token.class,
  .token.builtin {
    color: #ffffff;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: #fff;
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: ${Constants.system.moonstone};
  }

  .token.important,
  .token.bold {
    font-weight: 400;
    font-family: ${Constants.font.codeBold};
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.inserted {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LINE = css`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const STYLES_NUMBER = css`
  box-sizing: border-box;
  color: #666;
  font-family: ${Constants.font.code};
  flex-shrink: 0;
  min-width: 32px;
  user-select: none;
`;

const STYLES_PRE = css`
  box-sizing: border-box;
  background-color: ${Constants.system.pitchBlack};
  font-family: ${Constants.font.code};
  color: ${Constants.system.gray};
  width: 100%;
  padding-left: 16px;
`;

const STYLES_CODE = css`
  color: #fff5b1;
  font-family: ${Constants.font.code};
  font-size: 12px;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 2;
  hyphens: none;
`;

export class CodeBlock extends React.Component {
  wrapperEl = React.createRef();

  componentDidMount() {
    this.highlight();
  }

  highlight = () => {
    if (this.wrapperEl.current) {
      Prism.highlightElement(this.wrapperEl.current);
    }
  };

  render() {
    const codeBlockContent = this.props.children + "";
    const codeBlockToken = codeBlockContent.split("\n");
    const textMap = codeBlockToken;

    return (
      <div css={STYLES_CODE_BLOCK} className="language-javascript" style={this.props.style}>
        {textMap.map((element, index) => (
          <div css={STYLES_LINE} key={`${element}-${index}`}>
            <div css={STYLES_NUMBER}>{index}</div>
            <pre css={STYLES_PRE}>
              <code ref={this.wrapperEl} css={STYLES_CODE}>
                {element}
              </code>
            </pre>
          </div>
        ))}
      </div>
    );
  }
}

export default CodeBlock;

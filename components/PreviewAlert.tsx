import styled from "@emotion/styled";
import Link from "next/link";
import { FaWindowClose } from "react-icons/fa";

export default function PreviewAlert() {
  return (
    <PreviewStyled>
      <div className="preview-alert">
        <h4>(Preview Mode)</h4>

        <Link href="/api/exit-preview">
          <a>
            <FaWindowClose />
          </a>
        </Link>
      </div>
    </PreviewStyled>
  );
}

const PreviewStyled = styled.div`
  .preview-alert {
    position: relative;
    margin-bottom: 2rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      display: flex;
      left: 0;
      padding-left: 1rem;
      position: absolute;
      &:hover {
        transform: scale(1.06);
      }
    }
  }
`;

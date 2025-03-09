import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  total: number;
  step: number;
  children: string;
};

export default function ProgressButton({
  total,
  step,
  children,
  ...props
}: Props) {
  const ratio = (100 / total) * step;

  return (
    <Button {...props}>
      <ButtonText>{children}</ButtonText>
      <ButtonOverlay $ratio={ratio} />
    </Button>
  );
}

const Button = styled.button`
  position: relative;
  display: block;
  width: 100%;
  height: 48px;
  background: ${(props) => props.theme.colors.black};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
`;

const ButtonText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  filter: contrast(0.5);
`;

const ButtonOverlay = styled.div<{ $ratio: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.$ratio}%`};
  height: 100%;
  background: ${(props) => props.theme.colors.primary};
`;

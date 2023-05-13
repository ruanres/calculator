import { ReactNode } from 'react';

type DisplayProps = {
  children: ReactNode;
};

function Display({ children }: DisplayProps) {
  return (
    <div className="output">
      {children}
    </div>
  );
}

export default Display;

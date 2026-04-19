import React from 'react';
import { GENIE_IMAGE_SRC } from '@/lib/genieAsset';

type GenieMarkProps = {
  width: number;
  className?: string;
};

export const GenieMark: React.FC<GenieMarkProps> = ({ width, className }) => (
  <img
    src={GENIE_IMAGE_SRC}
    alt=""
    width={width}
    height={width}
    className={className}
    draggable={false}
  />
);

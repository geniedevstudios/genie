import Image from 'next/image';
import styles from './StudioCharacter.module.css';

type Props = {
  character: 'curiosity' | 'together' | 'care';
  align?: 'center' | 'start';
};

export function StudioCharacter({ character, align = 'center' }: Props) {
  return <div className={`${styles.character} ${align === 'start' ? styles.start : ''}`} aria-hidden="true">
    <Image src={`/about/${character}.png`} alt="" width={260} height={260} sizes="(max-width: 640px) 190px, 260px" />
  </div>;
}

import { Link } from 'react-router-dom';

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

function NavigationLink({ to, text, bg, textColor, onClick }: Props) {
  return (
    <Link
      className='nav-link'
      to={to}
      style={{ backgroundColor: bg, color: textColor }}>
      {text}
    </Link>
  );
}

export default NavigationLink;

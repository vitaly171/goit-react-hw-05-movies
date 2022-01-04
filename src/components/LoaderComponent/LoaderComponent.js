import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './LoaderComponent.module.css';

export default function LoaderComponent() {
  return (
    <div className={s.overlay}>
      <Loader
        type="ThreeDots"
        color="#fa7584"
        height={100}
        width={100}
        timeout={0}
      />
    </div>
  );
}

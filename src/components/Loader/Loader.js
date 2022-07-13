import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="Loader">
    <TailSpin
      type="TailSpin"
      color="#c8d2d9"
      height={250}
      width={250}
    />
</div>

  )
};

export default Loader;
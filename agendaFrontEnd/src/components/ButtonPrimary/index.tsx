type Props = {
    value: string;
  }
  
  export default function ButtonPrimary({value}:Props) {
    return (<div className="dsc-btn dsc-btn-blue">
      {value}
      </div>);
  }
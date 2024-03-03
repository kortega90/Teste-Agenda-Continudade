/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


export default function FormInput(props: any) {

    const { validation,  ...inputProps } = props; // eslint-disable-line

    return (
    <input  {...inputProps}/> 
    )
  }

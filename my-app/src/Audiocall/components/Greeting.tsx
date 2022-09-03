import style from '../AudioCall.module.css';
const Greeting = (props: {cb: (value: boolean) => void}) => {
  const levels = [1,2,3,4,5]; 
  return (
    <div className={style.greeting}>
      <h1 className={style.greeting__title}>Выберите уровень</h1>
      <div className={style.greeting__container}>
        { 
         levels.map((e) => 
         <button className={style.greeting__btn} onClick={()=>{props.cb(true)}} >{e}</button> )
        }
       
      </div>
    </div>
  );
};
export default Greeting;
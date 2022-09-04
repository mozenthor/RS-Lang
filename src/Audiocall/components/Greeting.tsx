import style from '../AudioCall.module.css';
const Greeting = (props: {cb: (value: boolean) => void}) => {
  const levels = ['A1','A2','B1','B2','C1','C2'];
  return (
    <div className={style.greeting}>
      <h1 className={style.greeting__title}>Выберите уровень</h1>
      <div className={style.greeting__container}>
        { 
         levels.map((e) => 
         <button key={e} className={style.greeting__btn} onClick={()=>{props.cb(true)}} >{e}</button> )
        }
       
      </div>
    </div>
  );
};
export default Greeting;
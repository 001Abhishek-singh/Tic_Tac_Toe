import style from "../Components/Square.module.css"
function Square({value, onchooseSquare }){
    return (
        <>
        <div className={style["square"]} onClick={onchooseSquare}>
            {value}
        </div>
        </>
    )
};
export default Square
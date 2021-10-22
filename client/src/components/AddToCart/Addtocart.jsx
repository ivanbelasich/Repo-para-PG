import './addtocart.css';
import { useDispatch } from "react-redux"
import { addCart, removeCart, removeItem } from '../../redux/actions';
import { Link } from "react-router-dom";

export default function({ id, qty }) {

  const dispatch = useDispatch()

  const handleAddCart = (e) => {
    e.preventDefault()
   // ES POR ID, NAME SOLO POR PRUEBA
    console.log('NAMEEEEEEE', id)
    dispatch(addCart(id)) 
  }

  const handleRemoveCart = (e) => {
    e.preventDefault()
    if(qty === 1){
      dispatch(removeItem(id))
    } else if(qty > 0 ) {
      dispatch(removeCart(id)) 
    }
  }

  return(
    <div className='cartBtns'>
      <Link to={qty !== 0 && `/cart`}><span className='lbl'>Buy now!</span></Link>
      <div className='btns'>
        <span className='remove' onClick={(e) => {handleRemoveCart(e)}}>-</span>
        <span className='quantity'>{qty}</span>
        <span className='add'onClick={(e) => {handleAddCart(e)}}>+</span>
      </div>
    </div>
  );
}

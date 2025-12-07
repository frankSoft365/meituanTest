import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { addFood, removeFood, removeTotalFood } from '../../store/modules/cart'
import { useEffect, useState } from 'react'

const Cart = () => {
  const [isCartExpand, setIsCartExpand] = useState(false);
  const { cart } = useSelector(state => state.cart);
  const cartLength = cart.length;
  console.log('购物车内商品的数量是：' + cartLength);
  const dispatch = useDispatch();
  const total = calcultaeTotal(cart);
  useEffect(() => {
    if (cartLength === 0) {
      setIsCartExpand(false);
      console.log('购物车商品数为0，强制关闭购物车界面');
    }
  }, [cartLength]);
  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        className={classNames('cartOverlay', { visible: isCartExpand && cartLength })}
        onClick={(e) => {
          e.stopPropagation();
          setIsCartExpand(false);
        }}
      />
      <div className="cart" onClick={(e) => {
        e.stopPropagation();
        cartLength && setIsCartExpand(!isCartExpand);
      }}>
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div className={classNames('icon', { fill: cartLength })}>
          {cartLength !== 0 && <div className="cartCornerMark">{cartLength}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {total}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {total >= 20 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', { visible: isCartExpand && cartLength })}>
        <div className='cancel' onClick={(e) => {
          e.stopPropagation();
          setIsCartExpand(false);
        }}>✖️</div>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={() => dispatch(removeTotalFood())}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cart.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    onPlus={() => {
                      dispatch(addFood(item))
                    }}
                    onMinus={() => {
                      dispatch(removeFood(item))
                    }}
                    count={item.count}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const calcultaeTotal = (cart) => {
  let total = 0;
  cart.forEach(item => {
    const amount = item.price * 100;
    const res = amount * item.count;
    total += res;
  });
  return total / 100;
}
export default Cart

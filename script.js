// to retrive all the cart items
document.addEventListener('DOMContentLoaded',()=>{
    let addtocartBtn=document.querySelectorAll('.add-to-cart-btn')
    console.log(addtocartBtn)
    addtocartBtn.forEach((e)=>{
        console.log(e)
        console.log(e.target)
        e.addEventListener('click',()=>{
        let productInfo=e.parentNode.parentNode
        console.log(productInfo)
        let productName=productInfo.querySelector('.product-title').innerText
        let productPrice=productInfo.querySelector('.product-price').innerText
        let productImg=productInfo.querySelector('.product-img').src
        console.log(productImg)
        console.log(productPrice)
        console.log(productName)
        let SelectedItems={
            name:productName,
            price:productPrice,
            imgUrl:productImg
        }
        // passing the selected item as a parameter to add to cart function to push into an empty array
        AddToCart(SelectedItems)
    })

    })
}) 

// empty array to store the selected cart items
const CartItems=[]
console.log(CartItems)

// function to add items to cart
function AddToCart(products){
    // console.log(products)
    let existingItems=CartItems.find((items)=>items.name === products.name)
    if(existingItems){
        existingItems.quantity++
    }else{
        CartItems.push({...products,quantity:1}) 
    }
    // to update the cart page
    UpdateCartUI()
    localStorage.setItem('CartItem',JSON.stringify(CartItems))

}
// function to update the cart UI
function UpdateCartUI(){
    let CartItem=document.querySelector('.cart_items')
    CartItem.innerHTML=''
    // console.log(CartItem)
    // printing added array elements in the cart
    CartItems.forEach((item)=>{
        // console.log(item)//object data
        // step-1
        let Cartprod=document.createElement('li')
        // this section is used to print the all product details in the cart along with increase/decrease and remove functionality
        Cartprod.innerHTML=`
        <div class="product">
        <img src=${item.imgUrl} class="product-img" />
        <div class="product-info">
          <h4 class="product-title">${item.name}</h4>
          <p class="product-price">${item.price}</p>
        <span>Quantity:${item.quantity}</span>
        <div class="quantitycon">
          <button class="IncreaseQuan">+</button>
          <span class='quantity-val'>${item.quantity}</span>
          <button class="DecreaseQua">-</button>
        </div>
        </div>
        <button class="remove-Quantity">remove</button>
      </div>`
    // step-2
    // accessing the increase and decrease and remove buttons along with quantity value
    const QuantityConEle=Cartprod.querySelector('.quantitycon')
    const IncreaseQuaEle=QuantityConEle.querySelector('.IncreaseQuan')
    const DecreaseQuaEle=QuantityConEle.querySelector('.DecreaseQua')
    const RemoveQuantityEle=Cartprod.querySelector('.remove-Quantity')
    const QuantityValEle=Cartprod.querySelector('.quantity-val')

    // step-3
    // adding functionality for increase/decrease/remove buttons through addeventlisteners
    // adding addeventlistener to increase quantity
    IncreaseQuaEle.addEventListener('click',()=>{
        HandleIncQuantity(item,QuantityValEle)
    })
    

    // adding addeventlistener to decrease quantity
    DecreaseQuaEle.addEventListener('click',()=>{
        HandleDecQuantity(item,QuantityValEle) 
    })


    // adding addeventlistener to remove quantity
    RemoveQuantityEle.addEventListener('click',()=>{
        RemoveItem(item)
    })


    // append the li child to ul list
    CartItem.appendChild(Cartprod)

})    
    
}
// function to increase the quantity
function HandleIncQuantity(item,QuantityValEle){
       item.quantity++
        QuantityValEle.textContent=item.quantity
        // calling the updatedCartUI() to update the qunatities in the UI
        UpdateCartUI()
        UpdateCartTotal()
        UpdateCartIcon()
    }

// function to decrease the quantity
function HandleDecQuantity(item,QuantityValEle){
    if(item.quantity>1){
        item.quantity--
        QuantityValEle.textContent=item.quantity
    }
    UpdateCartUI()
    UpdateCartTotal()
    UpdateCartIcon()
}


// functiom to remove single item
function RemoveItem(item){
  const index=CartItems.findIndex((product)=>product.name===item.name)
  if(index!==-1){
    if(CartItems[index].quantity>1){
        CartItems[index] .quantity--
    }else{
CartItems.splice(index,1)
        }
    
  }
  UpdateCartUI()
  UpdateCartTotal()
  UpdateCartIcon()
}
// function to update the cart total
function UpdateCartTotal(){
   const CartTotalContEle=document.querySelector('#cart-total')
   const CartTotal=CartItems.reduce((total,item)=>total+item.price*item.quantity,0)
   CartTotalContEle.textContent=CartTotal
}
// function to increase cart icon value
function UpdateCartIcon(){
    const CartIconTotal=document.querySelector('#cart-icon')
    const cartIconVal=CartItems.reduce((total,item)=>total+item.quantity,0)
    CartIconTotal.textContent=cartIconVal

}
// function to remove all items in the cart
function Removeall(){
    CartItems.splice(0)
    localStorage.clear()
    UpdateCartUI()
}

// function to load all the cart items into the UI
function LoadCartUI(){
   const storedItems=localStorage.getItem('CartItems')
   if(storedItems){
   CartItems.push(...JSON.parse(storedItems))
   UpdateCartIcon()
   UpdateCartTotal()
   UpdateCartUI()
//    Removeall()
}
}
LoadCartUI()
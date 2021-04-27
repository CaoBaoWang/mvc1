import $ from "jquery";
import "./app4.css";


const $circle = $('#app4 .circle')

$circle.on('mouseenter', ()=>{
  $circle.addClass('active')
}).on('mouseleave', ()=>{
  $circle.removeClass('active')
})

//通过一个购物例子描述 MCV,用户改变购买数量 n ，总价会变， 收到推送单价（price）涨了 总价会变

// 使用伪代码描述 不保证可运行

const m = {
  data:{
    //购买数量
    n :1,
    price: 50 ,
    //总价
    total: function (){
      return m.data.n * m.data.price
    }
  },
  dataChangeListener:null,
  update(n){
    // TODO 处理业务逻辑 购买数量不能超过库存量
    m.data.n = n
    // 5. Model ---> View Model 处理完业务逻辑，数据修改完成后。通知 View 需要展示最新数据
    m.notifyDatasetChange()
  },
  // 价格变动 或者 库存不足
  receiverPush(newPrice,newN){
    m.data.price =  newPrice
    m.data.n = newN
    // 4. Model ---> View
    m.notifyDatasetChange()
  },
  notifyDatasetChange(){
    m.dataChangeListener(m.data)
  },
  setOnDataChangeListener(fn){
    m.dataChangeListener = fn
  }

}

const v = {
  input: document.querySelector('#input1'),
  price:document.querySelector('#span1'),
  button:document.querySelector('#button1'),

  init(){
    // 1 View  ——>  Model 监听 Model 数据改变，以便更新数据
    m.setOnDataChangeListener(m.render)
  },
  render(data) {
    //  render view with data
    v.input.nodeValue  = data.n    // TODO show  缺货提示
    v.price.textContent  = data.total
  },
  // mock dom event
  oncUserChangeInputValue(fn){
    const newValue = 666 //user input
    // 3 View ---> Controller 事件改变通知
    fn(newValue)
  }
}
const c = {
  init(){
    // bind event   2. Controller ——> View  调用 View 提供的接口，监听 View 的事件
    v.oncUserChangeInputValue(c.onUserTypeContent)
  },
  // handle user type
  onUserTypeContent(val){
    // update data   4. Controller ——> Model  收到 View 的通知后，去调用 Model 的借口修改数据（处理业务）
    m.update(val)
  }
}
v.init()
c.init()


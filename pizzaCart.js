module.exports = () => {

    var cartList = [];
    pizza = "";
    var ordersList = []

    function order() {
        if (!cartList.includes(pizza)) {
            cartList.push(pizza);
        }
    }

    function buttonStatus(statusDecide, orderId) {
        var orderFromList = ordersList.filter(order => order.orderId == orderId)
        orderFromList = orderFromList[0]
        if(statusDecide == "Pay"){
            orderFromList.statusDecide = "Collect"
            orderFromList.status = "Paid"
        } else if(statusDecide == "Collect"){
            orderFromList.statusDecide = "Collected"
            orderFromList.status = "Collected"
        }
    }

    function Orders() {
		var amount = Total()
		if(amount != 0.00){
			ordersList.push({
				orderId : ordersList.length + 1,
				status : "Payment due",
				amount : amount,
				statusDecide: "Pay"
			})
			cartList = []
		}
		return ordersList
	}

    function OrderSmall(price) {
        var samllPizza = cartList.filter(pizza => (pizza.sizeType === "small"));
        if (samllPizza.length == 0) {
            cartList.push({
                sizeType: "small",
                qty: 1,
                price: price,
                origPrice: price
            });
        } else {
            samllPizza[0].qty++;
            samllPizza[0].price += price;
        }
    }

    function AddQty(sizeType) {
        var pizaSize = cartList.filter(pizza => (pizza.sizeType === sizeType));
        pizaSize[0].qty++
        pizaSize[0].price++
    }

    function SubQty(sizeType) {
        var pizaSize = cartList.filter(pizza => (pizza.sizeType === sizeType));
        var pizaSizeRemovedArray = pizaSize[0]
        if (pizaSizeRemovedArray.qty < 2) {
            cartList = cartList.filter(pizza => (pizza.sizeType !== sizeType))
        } else {
            pizaSizeRemovedArray.qty--
            pizaSizeRemovedArray.price -= pizaSizeRemovedArray.origPrice
        }
    }

    function OrderMedium(price) {
        var mediumPizza = cartList.filter(pizza => (pizza.sizeType === "medium"));
        if (mediumPizza.length == 0) {
            cartList.push({
                sizeType: "medium",
                qty: 1,
                price: price,
                origPrice: price
            });
        } else {
            mediumPizza[0].qty++;
            mediumPizza[0].price += price;
        }
    }

    function OrderLarge(price) {
        var largePizza = cartList.filter(pizza => (pizza.sizeType === 'large'));
        if (largePizza.length == 0) {
            cartList.push({
                sizeType: 'large',
                qty: 1,
                price: price,
                origPrice: price
            })
        } else {
            largePizza[0].qty++;
            largePizza[0].price += price;
        }
    }

    function GetcartList() {
        return cartList;
    }

    function countPizza() {
        return pizza.length;
    }

    function Total() {
		var total = 0
		cartList.filter(pizza => total += pizza.price)
		return total.toFixed(2)
	}

    function getTotal() {
        total = pizza.length;
    }

    return {
        buttonStatus,
        Total,
        Orders,
        OrderSmall,
        GetcartList,
        OrderMedium,
        order,
        countPizza,
        getTotal,
        OrderLarge,
        AddQty,
        SubQty
    };
}

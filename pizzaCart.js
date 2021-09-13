module.exports = () => {

    cartList = [];
    pizza = "";

    function order() {
        if (!cartList.includes(pizza)) {
            cartList.push(pizza);
        }
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

    function getTotal() {
        total = pizza.length;
    }

    return {
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

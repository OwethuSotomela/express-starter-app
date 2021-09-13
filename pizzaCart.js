module.exports = function pizzas(pizza) {
    console.log(pizza);

    // amount = "";
    orderList = []
    pizza = "";

    function order() {
        if (!orderList.includes(pizza)) {
            orderList.push(pizza);
        }
    }

    function countPizza(){
        return pizza.length;
    }

    function getTotal(){
        total = pizza.length
    }

    return {
        order,
        countPizza,
        getTotal
    }
}

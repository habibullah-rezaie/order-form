// DEBUG, TEST
let assert = console.assert;
let report = console.log;

(function () {

    // function init used to initialize the app when browser loads
    let init = function () {

        let orderForm, saveBtn, saveBtnClicked,
            qtyFields, totalFields, orderTotalField;

        orderForm = document.forms['order-form'];
        saveBtn = document.getElementById('btn__save-order');
        qtyFields = orderForm.quantity;
        totalFields = orderForm.getElementsByClassName('item-total');
        orderTotalField = document.getElementById('order-total');

        // when the 'Save Order' button clicked check
        // if the user's browser supports formaction attribute
        let saveForm = function () {
            // if the browser doesn't support formaction set the action
            // attribute
            if (!('formAction' in document.createElement('input'))) {
                let formAction = saveBtn.getAttribute('formAction');
                orderForm.setAttribute('action', formAction);
            }

            // set a flag 
            saveBtnClicked = true;
        }


        // Adds comma for thousands e.g. 1000 -> 1,000
        let formatMoney = function (money) {
            return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        let calcTotals = function () {
            let ln, itemQty, itemPrice, itemTotal, itemTotalMoney, orderTotal, orderTotalMoney;

            ln = qtyFields.length;
            itemQty = 0;
            itemPrice = 0.00;
            itemTotal = 0.00;
            itemTotalMoney = '$0.00';
            orderTotal = 0.00;
            orderTotalMoney = '$0.00';

            for (let i = 0; i < ln; i++) {
                if (!!qtyFields[i].valueAsNumber) {
                    itemQty = qtyFields[i].valueAsNumber;
                } else if (parseInt(qtyFields[i].value)) {
                    itemQty = parseInt(qtyFields[i].value);
                }

                if (!!qtyFields[i].dataset) {
                    itemPrice = parseFloat(qtyFields[i].dataset.price);
                } else {
                    itemPrice = parseFloat(qtyFields[i].getAttribute('data-price'));
                }

                itemTotal = itemQty * itemPrice;
                itemTotalMoney = '$' + formatMoney(itemTotal.toFixed(2));
                orderTotal += itemTotal;
                orderTotalMoney = '$' + formatMoney(orderTotal.toFixed(2));

                if (!!qtyFields[i].value) {
                    totalFields[i].value = itemTotalMoney;
                    orderTotalField.value = orderTotalMoney;
                } else {
                    totalFields[i].innerHTML = itemTotalMoney;
                    orderTotalField.innerHTML = orderTotalMoney;
                }
            }
        };

        let qtyListeners = function () {
            let ln = qtyFields.length;

            for (let i = 0; i < ln; i++) {
                qtyFields[i].addEventListener('input', calcTotals, false);
                qtyFields[i].addEventListener('keyup', calcTotals, false);
            }

        }

        saveBtn.addEventListener('click', saveForm, false);

        calcTotals(); // perform an initial calculation, 
        qtyListeners(); // Add event listeners to fields

    }

    window.addEventListener('load', init, false);
})();
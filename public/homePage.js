"use strict";

const logoutBtn = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutBtn.action = () => {
    ApiConnector.logout(response => {
        if (response.success) location.reload();
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }

});

function getCurrencyRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getCurrencyRates();
setInterval(getCurrencyRates, 60000);

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Счет пополнен: зачислено  ' + data.amount + '  ' + data.currency);
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертация выполнена успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод выполнен');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен в адресную книгу');
        }
        else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удален из адресной книги');
        }
        else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}

"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (answer) => {
        if (answer.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(answer.error);
        }
    });
}
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (answer) => {
        if (answer.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(answer.error);
        }
    });
}


